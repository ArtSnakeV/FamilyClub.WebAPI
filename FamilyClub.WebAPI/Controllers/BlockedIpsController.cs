using FamilyClub.BLL.Interfaces;
using FamilyClubLibrary;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace FamilyClub.WebAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BlockedIpsController : ControllerBase
{
    private readonly IBlockedIpService _blockedIpService;

    public BlockedIpsController(IBlockedIpService blockedIpService)
    {
        _blockedIpService = blockedIpService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<BlockedIp>>> GetAll(CancellationToken cancellationToken)
    {
        var list = await _blockedIpService.GetAllBlockedIpsAsync(cancellationToken);
        return Ok(list);
    }

    [HttpPost]
    public async Task<IActionResult> BlockIp([FromBody] AddBlockedIpRequest request, CancellationToken cancellationToken)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        await _blockedIpService.AddBlockedIpAsync(request.IpAddress.Trim(), request.Reason?.Trim(), cancellationToken);
        return Ok(new { message = $"IP address {request.IpAddress} successfully blocked." });
    }

    [HttpDelete("{ipAddress}")]
    public async Task<IActionResult> UnblockIp(string ipAddress, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(ipAddress)) return BadRequest("IP address is required.");

        var decodedIp = System.Uri.UnescapeDataString(ipAddress).Trim();
        await _blockedIpService.RemoveBlockedIpAsync(decodedIp, cancellationToken);
        return Ok(new { message = $"IP address {decodedIp} successfully unblocked." });
    }

    [HttpDelete]
    public async Task<IActionResult> UnblockIpQuery([FromQuery] string ipAddress, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(ipAddress)) return BadRequest("IP address is required.");

        await _blockedIpService.RemoveBlockedIpAsync(ipAddress.Trim(), cancellationToken);
        return Ok(new { message = $"IP address {ipAddress} successfully unblocked." });
    }
}

public class AddBlockedIpRequest
{
    [Required]
    public string IpAddress { get; set; } = string.Empty;

    public string? Reason { get; set; }
}
