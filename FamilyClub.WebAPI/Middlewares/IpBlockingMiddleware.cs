using FamilyClub.BLL.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System.Net;

namespace FamilyClub.WebAPI.Middlewares;

public class IpBlockingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<IpBlockingMiddleware> _logger;

    public IpBlockingMiddleware(RequestDelegate next, ILogger<IpBlockingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task Invoke(HttpContext context, IServiceProvider serviceProvider)
    {
        var remoteIp = context.Connection.RemoteIpAddress;
        if (remoteIp != null)
        {
            var ipAddress = remoteIp.ToString();
            
            var blockedIpService = serviceProvider.GetRequiredService<IBlockedIpService>();
            
            var isBlocked = await blockedIpService.IsIpBlockedAsync(ipAddress);
            if (isBlocked)
            {
                _logger.LogWarning("Blocked request from blacklisted IP: {IpAddress}", ipAddress);
                context.Response.StatusCode = (int)HttpStatusCode.Forbidden;
                return;
            }
        }

        await _next(context);
    }
}