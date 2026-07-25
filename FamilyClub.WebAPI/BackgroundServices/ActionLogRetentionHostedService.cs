using FamilyClub.BLL.DTOs.ActionLog;
using FamilyClub.BLL.Interfaces;

namespace FamilyClub.WebAPI.BackgroundServices;

/// <summary>
/// Щодня архівує записи журналу старші за 90 днів.
/// Новий архів замінює попередній.
/// </summary>
public class ActionLogRetentionHostedService : BackgroundService
{
    private readonly IServiceScopeFactory _scopeFactory;
    private readonly ILogger<ActionLogRetentionHostedService> _logger;
    private static readonly TimeSpan Interval = TimeSpan.FromHours(24);

    public ActionLogRetentionHostedService(
        IServiceScopeFactory scopeFactory,
        ILogger<ActionLogRetentionHostedService> logger)
    {
        _scopeFactory = scopeFactory;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        // Невелика затримка після старту API
        try
        {
            await Task.Delay(TimeSpan.FromMinutes(1), stoppingToken);
        }
        catch (OperationCanceledException)
        {
            return;
        }

        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                using var scope = _scopeFactory.CreateScope();
                var service = scope.ServiceProvider.GetRequiredService<IActionLogService>();
                var result = await service.ArchiveOldLogsAsync(
                    ActionLogCodes.RetentionDays,
                    stoppingToken);

                _logger.LogInformation(
                    "Action log retention: {Message} (moved={Count})",
                    result.Message,
                    result.MovedCount);
            }
            catch (Exception ex) when (ex is not OperationCanceledException)
            {
                _logger.LogError(ex, "Action log retention job failed");
            }

            try
            {
                await Task.Delay(Interval, stoppingToken);
            }
            catch (OperationCanceledException)
            {
                break;
            }
        }
    }
}
