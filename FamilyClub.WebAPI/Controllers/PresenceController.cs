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
        public IActionResult Heartbeat([FromBody] HeartbeatRequest request)
        {
            _presence.Ping(request.SessionId);
            return Ok();
        }

        [HttpGet("active-count")]
        public IActionResult GetActiveCount()
        {
            return Ok(new { count = _presence.GetActiveCount() });
        }
    }
}
public class HeartbeatRequest
{
    public string SessionId { get; set; } = string.Empty;
}