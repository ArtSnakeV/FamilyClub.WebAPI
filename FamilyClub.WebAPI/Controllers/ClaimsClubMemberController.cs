using FamilyClub.BLL.DTOs.Claims;
using FamilyClub.BLL.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FamilyClub.WebAPI.Controllers;

[Authorize(Roles = "Admin")]
[Route("api/[controller]")]
[ApiController]
public class ClaimsClubMemberController : ControllerBase
{
    private readonly IClaimsClubMemberService _claimsService;

    public ClaimsClubMemberController(IClaimsClubMemberService claimsService)
    {
        _claimsService = claimsService;
    }

    // GET: api/ClaimsClubMember
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ClaimWithMemberDto>>> GetAllClaims(CancellationToken cancellationToken)
    {
        var claims = await _claimsService.GetAllClaimsAsync(cancellationToken);
        return Ok(claims);
    }

    // GET: api/ClaimsClubMember/{memberId}
    [HttpGet("{memberId}")]
    public async Task<ActionResult<IEnumerable<ClaimsClubMemberDto>>> GetClaims(string memberId, CancellationToken cancellationToken)
    {
        var claims = await _claimsService.GetClaimsAsync(memberId, cancellationToken);
        return Ok(claims);
    }

    // POST: api/ClaimsClubMember/{memberId}/add
    [HttpPost("{memberId}/add")]
    public async Task<IActionResult> AddClaim(
        [FromRoute] string memberId,
        [FromBody] ClaimsClubMemberDto dto,
        CancellationToken cancellationToken)
    {
        var addDto = new AddClaimClubMemberDto
        {
            MemberId = memberId,
            ClaimType = dto.ClaimType,
            ClaimValue = dto.ClaimValue
        };

        var result = await _claimsService.AddClaimAsync(addDto, cancellationToken);

        if (!result)
            return BadRequest("Claim could not be added. It may already exist or user not found.");

        return Ok("Claim added successfully.");
    }

    // DELETE: api/ClaimsClubMember/{memberId}/remove
    [HttpDelete("{memberId}/remove")]
    public async Task<IActionResult> RemoveClaim(
        [FromRoute] string memberId,
        [FromBody] ClaimsClubMemberDto dto,
        CancellationToken cancellationToken)
    {
        var removeDto = new AddClaimClubMemberDto
        {
            MemberId = memberId,
            ClaimType = dto.ClaimType,
            ClaimValue = dto.ClaimValue
        };

        var result = await _claimsService.RemoveClaimAsync(removeDto, cancellationToken);

        if (!result)
            return BadRequest("Claim could not be removed. It may not exist or user not found.");

        return Ok("Claim removed successfully.");
    }

    // PUT: api/ClaimsClubMember/{memberId}/update
    [HttpPut("{memberId}/update")]
    public async Task<IActionResult> UpdateClaim(
        [FromRoute] string memberId,
        [FromBody] UpdateClaimClubMemberDto dto,
        CancellationToken cancellationToken)
    {
        dto.MemberId = memberId;

        var result = await _claimsService.UpdateClaimAsync(dto, cancellationToken);

        if (!result)
            return BadRequest("Claim could not be updated.");

        return Ok("Claim updated successfully.");
    }
}
