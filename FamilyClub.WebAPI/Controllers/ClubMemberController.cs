using FamilyClub.BLL.DTOs.ClubMember;
using FamilyClub.BLL.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FamilyClub.WebAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ClubMemberController : ControllerBase
{
    private readonly IClubMemberService _clubMemberService;

    public ClubMemberController(IClubMemberService clubMemberService)
    {
        _clubMemberService = clubMemberService;
    }

    [HttpGet]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<IEnumerable<ClubMemberReadDto>>> GetAll(CancellationToken cancellationToken)
    {
        var clubMembers = await _clubMemberService.GetAllAsync(cancellationToken);
        return Ok(clubMembers);
    }

    [HttpGet("{id}")]
    [Authorize]
    public async Task<ActionResult<ClubMemberReadDto>> GetById(string id, CancellationToken cancellationToken)
    {
        var clubMember = await _clubMemberService.GetByIdAsync(id, cancellationToken);
        if (clubMember is null)
        {
            return NotFound();
        }

        return Ok(clubMember);
    }

    [HttpGet("by-email/{email}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<ClubMemberReadDto>> GetByEmailAsync(string email, CancellationToken cancellationToken)
    {
        var clubMember = await _clubMemberService.GetByEmailAsync(email, cancellationToken);
        if (clubMember is null)
        {
            return NotFound();
        }
        return Ok(clubMember);
    }

    [HttpPost("form")]
    [Consumes("multipart/form-data")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Create([FromForm] RegisterClubMemberDto dto, IFormFile? avatar, CancellationToken cancellationToken)
    {
        var createdClubMember = await _clubMemberService.CreateAsync(dto, cancellationToken, avatar);
        return CreatedAtAction(nameof(GetById), new { id = createdClubMember.Id }, createdClubMember);
    }

    [HttpPut("{id}/json")]
    [Consumes("application/json")]
    [Authorize]
    public async Task<IActionResult> Update(string id, [FromBody] UpdateClubMemberDto dto, CancellationToken cancellationToken)
    {
        var updated = await _clubMemberService.UpdateAsync(id, dto, cancellationToken);
        if (!updated)
        {
            return NotFound();
        }

        return NoContent();
    }

    [HttpPut("{id}/form")]
    [Consumes("multipart/form-data")]
    [Authorize]
    public async Task<IActionResult> Update(string id, [FromForm] UpdateClubMemberDto dto, IFormFile? avatar, CancellationToken cancellationToken)
    {
        var updated = await _clubMemberService.UpdateAsync(id, dto, cancellationToken, avatar);
        if (!updated)
        {
            return NotFound();
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(string id, CancellationToken cancellationToken)
    {
        var deleted = await _clubMemberService.DeleteAsync(id, cancellationToken);
        if (!deleted)
        {
            return NotFound();
        }

        return NoContent();
    }

    [HttpPut("{id}/favorite-categories")]
    [Authorize]
    public async Task<IActionResult> UpdateFavoriteCategories(
     string id,
     [FromBody] List<int> categoryIds,
     CancellationToken cancellationToken)
    {
        var updated = await _clubMemberService.UpdateFavoriteCategoriesAsync(id, categoryIds, cancellationToken);
        if (!updated) return NotFound();
        return NoContent();
    }

    [HttpPut("{id}/change-password")]
    [Authorize]
    public async Task<IActionResult> ChangePassword(string id, [FromBody] ChangePasswordClubMemberDto dto, CancellationToken cancellationToken)
    {
        var result = await _clubMemberService.ChangePasswordAsync(id, dto, cancellationToken);
        if (!result) return BadRequest("Невірний поточний пароль або помилка зміни");
        return NoContent();
    }

    [HttpPut("{id}/lock")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> LockUser(string id, LockUserDto dto, CancellationToken cancellationToken)
    {
        var adminId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;

        var success = await _clubMemberService.LockUserAsync(id, dto, adminId, cancellationToken);
        return success ? NoContent() : NotFound();
    }

    [HttpPut("{id}/unlock")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UnlockUser(string id, CancellationToken cancellationToken)
    {
        var result = await _clubMemberService.UnlockUserAsync(id, cancellationToken);

        if (!result)
            return NotFound();

        return NoContent();
    }
}
