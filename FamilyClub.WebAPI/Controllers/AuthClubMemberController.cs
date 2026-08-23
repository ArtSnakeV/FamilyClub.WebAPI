using FamilyClub.BLL.DTOs.ClubMember;
using FamilyClub.BLL.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace FamilyClub.WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthClubMemberController : ControllerBase
{
    private readonly IAuthClubMemberService _authService;

    public AuthClubMemberController(IAuthClubMemberService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<ActionResult<ClubMemberReadDto>> Register([FromBody] RegisterClubMemberDto dto, CancellationToken cancellationToken)
    {
        try
        {
            var registeredUser = await _authService.RegisterAsync(dto, cancellationToken);            
            return Ok(registeredUser);
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponseClubMemberDTO>> Login([FromBody] LoginClubMemberDto dto, CancellationToken cancellationToken)
    {
        try
        {
            var authResponse = await _authService.LoginAsync(dto, cancellationToken);
            return Ok(authResponse);
        }
        catch (UnauthorizedAccessException ex)
        {
            return Unauthorized(new { error = ex.Message });
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    // POST: api/AuthclubMember/logout
    [HttpPost("logout")]
    public async Task<IActionResult> Logout(CancellationToken cancellationToken)
    {
        await _authService.LogoutAsync(cancellationToken);
        return Ok(new { Message = "Logged out successfully." });
    }
	[HttpGet("me")]
	[Authorize]
	public async Task<ActionResult<ClubMemberReadDto>> Me(CancellationToken cancellationToken)
	{
		var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

		if (string.IsNullOrEmpty(userId))
			return Unauthorized();

		var result = await _authService.GetCurrentUserAsync(userId, cancellationToken);

		return Ok(result);
	}

    [HttpPost("forgot-password")]
    [AllowAnonymous]
    public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDto dto, CancellationToken cancellationToken)
    {
        try
        {
            await _authService.ForgotPasswordAsync(dto, cancellationToken);
            return Ok(new
            {
                message = "Якщо акаунт із цією поштою існує, ми надіслали код відновлення."
            });
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { error = ex.Message });
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpPost("reset-password")]
    [AllowAnonymous]
    public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto dto, CancellationToken cancellationToken)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            await _authService.ResetPasswordAsync(dto, cancellationToken);
            return Ok(new { message = "Пароль успішно змінено. Увійдіть з новим паролем." });
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { error = ex.Message });
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }
}