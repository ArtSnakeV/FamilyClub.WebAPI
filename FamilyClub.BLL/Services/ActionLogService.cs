using FamilyClub.BLL.DTOs.ActionLog;
using FamilyClub.BLL.Interfaces;
using FamilyClub.DAL.Interfaces;
using FamilyClubLibrary;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;
using System.Text.Json;

namespace FamilyClub.BLL.Services;

public class ActionLogService : IActionLogService
{
    private readonly IActionLogRepository _repository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IHttpContextAccessor? _httpContextAccessor;

    private static readonly JsonSerializerOptions ArchiveJsonOptions = new()
    {
        WriteIndented = false,
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
    };

    public ActionLogService(
        IActionLogRepository repository,
        IUnitOfWork unitOfWork,
        IHttpContextAccessor? httpContextAccessor = null)
    {
        _repository = repository;
        _unitOfWork = unitOfWork;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task LogAsync(
        string action,
        string module,
        string? details = null,
        string level = ActionLogCodes.Levels.Info,
        string? clubMemberId = null,
        string? ipAddress = null,
        CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(action))
            throw new ArgumentException("Action is required.", nameof(action));
        if (string.IsNullOrWhiteSpace(module))
            throw new ArgumentException("Module is required.", nameof(module));

        clubMemberId ??= TryGetCurrentUserId();
        ipAddress ??= TryGetClientIp();

        var entity = new ActionLog
        {
            CreatedAt = DateTime.UtcNow,
            ClubMemberId = string.IsNullOrWhiteSpace(clubMemberId) ? null : clubMemberId.Trim(),
            Action = action.Trim(),
            Module = module.Trim(),
            Details = Truncate(details?.Trim(), 2000),
            IpAddress = Truncate(ipAddress?.Trim(), 45),
            Level = NormalizeLevel(level),
        };

        await _repository.AddAsync(entity, cancellationToken);
        await _unitOfWork.SaveChangesAsync(cancellationToken);
    }

    public async Task<ActionLogPagedDto> GetPagedAsync(
        ActionLogFilterDto filter,
        CancellationToken cancellationToken = default)
    {
        filter ??= new ActionLogFilterDto();
        var page = filter.Page < 1 ? 1 : filter.Page;
        var pageSize = filter.PageSize < 1 ? 10 : Math.Min(filter.PageSize, 100);

        // Живий журнал — лише останні RetentionDays
        var retentionFloor = DateTime.UtcNow.AddDays(-ActionLogCodes.RetentionDays);
        var fromUtc = filter.FromUtc.HasValue && filter.FromUtc > retentionFloor
            ? filter.FromUtc
            : retentionFloor;

        var (items, total) = await _repository.GetPagedAsync(
            filter.Search,
            filter.Action,
            filter.Module,
            filter.ClubMemberId,
            filter.Level,
            fromUtc,
            filter.ToUtc,
            page,
            pageSize,
            cancellationToken);

        return new ActionLogPagedDto
        {
            Items = items.Select(Map).ToList(),
            TotalCount = total,
            Page = page,
            PageSize = pageSize,
        };
    }

    public async Task<ActionLogStatsDto> GetStatsAsync(
        DateTime? fromUtc = null,
        DateTime? toUtc = null,
        CancellationToken cancellationToken = default)
    {
        var retentionFloor = DateTime.UtcNow.AddDays(-ActionLogCodes.RetentionDays);
        var effectiveFrom = fromUtc.HasValue && fromUtc > retentionFloor
            ? fromUtc
            : retentionFloor;

        var row = await _repository.GetStatsAsync(effectiveFrom, toUtc, cancellationToken);
        return new ActionLogStatsDto
        {
            Total = row.Total,
            Success = row.Success,
            Warning = row.Warning,
            Error = row.Error,
            Info = row.Info,
            UniqueUsers = row.UniqueUsers,
        };
    }

    public async Task<ActionLogArchiveResultDto> ArchiveOldLogsAsync(
        int retentionDays = ActionLogCodes.RetentionDays,
        CancellationToken cancellationToken = default)
    {
        if (retentionDays < 1) retentionDays = ActionLogCodes.RetentionDays;

        var cutoff = DateTime.UtcNow.AddDays(-retentionDays);
        var oldLogs = await _repository.GetOlderThanAsync(cutoff, cancellationToken);

        if (oldLogs.Count == 0)
        {
            var existing = await _repository.GetCurrentArchiveAsync(cancellationToken);
            return new ActionLogArchiveResultDto
            {
                Archived = false,
                MovedCount = 0,
                RetentionDays = retentionDays,
                Archive = existing is null ? null : MapArchive(existing),
                Message = "Немає записів старших за період зберігання.",
            };
        }

        var payload = oldLogs.Select(x => new
        {
            x.Id,
            x.CreatedAt,
            x.ClubMemberId,
            x.Action,
            x.Module,
            x.Details,
            x.IpAddress,
            x.Level,
        }).ToList();

        var archive = new ActionLogArchive
        {
            CreatedAt = DateTime.UtcNow,
            PeriodFromUtc = oldLogs.Min(x => x.CreatedAt),
            PeriodToUtc = oldLogs.Max(x => x.CreatedAt),
            RecordCount = oldLogs.Count,
            PayloadJson = JsonSerializer.Serialize(payload, ArchiveJsonOptions),
        };

        // Попередній архів видаляється всередині ReplaceArchiveAsync
        await _repository.ReplaceArchiveAsync(archive, cancellationToken);
        await _repository.DeleteRangeByIdsAsync(oldLogs.Select(x => x.Id), cancellationToken);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        var saved = await _repository.GetCurrentArchiveAsync(cancellationToken);
        return new ActionLogArchiveResultDto
        {
            Archived = true,
            MovedCount = oldLogs.Count,
            RetentionDays = retentionDays,
            Archive = saved is null ? MapArchive(archive) : MapArchive(saved),
            Message = $"Архівовано {oldLogs.Count} записів. Попередній архів замінено.",
        };
    }

    public async Task<ActionLogArchiveInfoDto?> GetCurrentArchiveInfoAsync(
        CancellationToken cancellationToken = default)
    {
        var archive = await _repository.GetCurrentArchiveAsync(cancellationToken);
        return archive is null ? null : MapArchive(archive);
    }

    public async Task<string?> GetCurrentArchivePayloadAsync(
        CancellationToken cancellationToken = default)
    {
        var archive = await _repository.GetCurrentArchiveAsync(cancellationToken);
        return archive?.PayloadJson;
    }

    private string? TryGetCurrentUserId()
    {
        return _httpContextAccessor?.HttpContext?.User?
            .FindFirstValue(ClaimTypes.NameIdentifier);
    }

    private string? TryGetClientIp()
    {
        var http = _httpContextAccessor?.HttpContext;
        if (http is null) return null;
        return http.Connection.RemoteIpAddress?.ToString();
    }

    private static ActionLogArchiveInfoDto MapArchive(ActionLogArchive a) => new()
    {
        Id = a.Id,
        CreatedAt = a.CreatedAt,
        PeriodFromUtc = a.PeriodFromUtc,
        PeriodToUtc = a.PeriodToUtc,
        RecordCount = a.RecordCount,
    };

    private static ActionLogDto Map(ActionLog e)
    {
        var member = e.ClubMember;
        string? displayName = null;
        if (member != null)
        {
            var full = $"{member.Name} {member.Surname}".Trim();
            displayName = string.IsNullOrWhiteSpace(full)
                ? member.Email ?? member.UserName
                : full;
        }

        return new ActionLogDto
        {
            Id = e.Id,
            CreatedAt = e.CreatedAt,
            ClubMemberId = e.ClubMemberId,
            UserName = displayName,
            UserRoleHint = null,
            Action = e.Action,
            Module = e.Module,
            Details = e.Details,
            IpAddress = e.IpAddress,
            Level = e.Level,
        };
    }

    private static string NormalizeLevel(string? level)
    {
        var value = (level ?? ActionLogCodes.Levels.Info).Trim().ToLowerInvariant();
        return value switch
        {
            ActionLogCodes.Levels.Success => ActionLogCodes.Levels.Success,
            ActionLogCodes.Levels.Warning => ActionLogCodes.Levels.Warning,
            ActionLogCodes.Levels.Error => ActionLogCodes.Levels.Error,
            _ => ActionLogCodes.Levels.Info,
        };
    }

    private static string? Truncate(string? value, int max)
    {
        if (string.IsNullOrEmpty(value)) return value;
        return value.Length <= max ? value : value[..max];
    }
}
