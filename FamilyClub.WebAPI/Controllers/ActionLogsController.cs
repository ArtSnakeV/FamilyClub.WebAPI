using FamilyClub.BLL.DTOs.ActionLog;
using FamilyClub.BLL.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace FamilyClub.WebAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize(Roles = "Admin")]
public class ActionLogsController : ControllerBase
{
    private readonly IActionLogService _service;

    public ActionLogsController(IActionLogService service)
    {
        _service = service;
    }

    /// <summary>Список записів журналу з фільтрами та пагінацією (останні 90 днів).</summary>
    [HttpGet]
    public async Task<ActionResult<ActionLogPagedDto>> GetPaged(
        [FromQuery] ActionLogFilterDto filter,
        CancellationToken cancellationToken)
    {
        var result = await _service.GetPagedAsync(filter, cancellationToken);
        return Ok(result);
    }

    /// <summary>KPI для карток журналу дій.</summary>
    [HttpGet("stats")]
    public async Task<ActionResult<ActionLogStatsDto>> GetStats(
        [FromQuery] DateTime? fromUtc,
        [FromQuery] DateTime? toUtc,
        CancellationToken cancellationToken)
    {
        var stats = await _service.GetStatsAsync(fromUtc, toUtc, cancellationToken);
        return Ok(stats);
    }

    /// <summary>Інформація про поточний (єдиний) архів.</summary>
    [HttpGet("archive")]
    public async Task<ActionResult<ActionLogArchiveInfoDto>> GetArchive(
        CancellationToken cancellationToken)
    {
        var info = await _service.GetCurrentArchiveInfoAsync(cancellationToken);
        if (info is null) return NotFound("Архів ще не створено.");
        return Ok(info);
    }

    /// <summary>Завантажити JSON поточного архіву.</summary>
    [HttpGet("archive/download")]
    public async Task<IActionResult> DownloadArchive(CancellationToken cancellationToken)
    {
        var payload = await _service.GetCurrentArchivePayloadAsync(cancellationToken);
        if (string.IsNullOrEmpty(payload)) return NotFound("Архів ще не створено.");

        var bytes = Encoding.UTF8.GetBytes(payload);
        var fileName = $"action-log-archive-{DateTime.UtcNow:yyyyMMdd}.json";
        return File(bytes, "application/json", fileName);
    }

    /// <summary>
    /// Архівувати записи старші за 90 днів.
    /// Попередній архів видаляється і замінюється новим.
    /// </summary>
    [HttpPost("archive")]
    public async Task<ActionResult<ActionLogArchiveResultDto>> RunArchive(
        CancellationToken cancellationToken)
    {
        var result = await _service.ArchiveOldLogsAsync(
            ActionLogCodes.RetentionDays,
            cancellationToken);
        return Ok(result);
    }
}
