using FamilyClub.BLL.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FamilyClub.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PresenceController : ControllerBase
    {
        private readonly IPresenceService _presence;

        public PresenceController(IPresenceService presence)
        {
            _presence = presence;
        }

        [HttpPost("heartbeat")]
        public IActionResult Heartbeat([FromBody] HeartbeatRequest? request)
        {
            if (request == null || string.IsNullOrWhiteSpace(request.SessionId))
            {
                return BadRequest(new { error = "SessionId is required." });
            }

            var ip = GetClientIp();
            var userAgent = Request.Headers["User-Agent"].ToString();
            
            var userName = User.Identity?.IsAuthenticated == true
                ? (User.Identity.Name
                   ?? User.FindFirst(System.Security.Claims.ClaimTypes.Email)?.Value
                   ?? User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value
                   ?? User.FindFirst("email")?.Value)
                : null;

            _presence.Ping(request.SessionId, ip, userAgent, userName);
            return Ok();
        }

        [HttpGet("active-count")]
        public IActionResult GetActiveCount()
        {
            return Ok(new { count = _presence.GetActiveCount() });
        }

        [HttpGet("active-users")]
        public IActionResult GetActiveUsers()
        {
            var sessions = _presence.GetActiveSessions();
            return Ok(sessions);
        }

        private string GetClientIp()
        {
            if (Request.Headers.TryGetValue("X-Forwarded-For", out var forwardedFor) && !string.IsNullOrWhiteSpace(forwardedFor))
            {
                var ip = forwardedFor.ToString().Split(',')[0].Trim();
                if (!string.IsNullOrEmpty(ip)) return ip;
            }
            return HttpContext.Connection.RemoteIpAddress?.ToString() ?? "127.0.0.1";
        }
    }
}

public class HeartbeatRequest
{
    public string SessionId { get; set; } = string.Empty;
}