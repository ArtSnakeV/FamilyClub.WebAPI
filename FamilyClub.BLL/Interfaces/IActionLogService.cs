using FamilyClub.BLL.DTOs.ActionLog;

namespace FamilyClub.BLL.Interfaces;

public interface IActionLogService
{
    /// <summary>Записати подію в журнал (викликати з інших сервісів після успішної операції).</summary>
    Task LogAsync(
        string action,
        string module,
        string? details = null,
        string level = ActionLogCodes.Levels.Info,
        string? clubMemberId = null,
        string? ipAddress = null,
        CancellationToken cancellationToken = default);

    Task<ActionLogPagedDto> GetPagedAsync(
        ActionLogFilterDto filter,
        CancellationToken cancellationToken = default);

    Task<ActionLogStatsDto> GetStatsAsync(
        DateTime? fromUtc = null,
        DateTime? toUtc = null,
        CancellationToken cancellationToken = default);

    /// <summary>
    /// Переносить записи старші за retentionDays у єдиний архів
    /// (попередній архів видаляється) і очищає живий журнал.
    /// </summary>
    Task<ActionLogArchiveResultDto> ArchiveOldLogsAsync(
        int retentionDays = ActionLogCodes.RetentionDays,
        CancellationToken cancellationToken = default);

    Task<ActionLogArchiveInfoDto?> GetCurrentArchiveInfoAsync(
        CancellationToken cancellationToken = default);

    Task<string?> GetCurrentArchivePayloadAsync(
        CancellationToken cancellationToken = default);
}
