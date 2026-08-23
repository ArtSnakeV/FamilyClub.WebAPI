using FamilyClub.BLL.DTOs.ClubMember;
using FamilyClub.BLL.Interfaces;
using FamilyClub.BLL.Mapping;
using FamilyClubLibrary;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace FamilyClub.BLL.Services;

public class AuthClubMemberService : IAuthClubMemberService
{
    private const string ResetCacheKeyPrefix = "pwd-reset:";
    private static readonly TimeSpan ResetCodeTtl = TimeSpan.FromMinutes(15);

    private readonly UserManager<ClubMember> _userManager;
    private readonly IConfiguration _configuration;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly IEmailSender _emailSender;
    private readonly ICacheService _cache;
    private readonly ILogger<AuthClubMemberService> _logger;

    public AuthClubMemberService(
        UserManager<ClubMember> userManager,
        IConfiguration configuration,
        RoleManager<IdentityRole> roleManager,
        IEmailSender emailSender,
        ICacheService cache,
        ILogger<AuthClubMemberService> logger)
    {
        _userManager = userManager;
        _roleManager = roleManager;
        _configuration = configuration;
        _emailSender = emailSender;
        _cache = cache;
        _logger = logger;
    }

    public async Task<ClubMemberReadDto> RegisterAsync(RegisterClubMemberDto dto, CancellationToken cancellationToken = default)
    {
        var clubMember = new ClubMember { UserName = dto.Email, Email = dto.Email, PhoneNumber = dto.PhoneNumber, Name = dto.Name, Surname = dto.Surname, DateOfBirth = dto.DateOfBirth };
        var result = await _userManager.CreateAsync(clubMember, dto.Password);
        if (!await _roleManager.RoleExistsAsync("User"))
        {
            await _roleManager.CreateAsync(new IdentityRole("User"));
        }
        await _userManager.AddToRoleAsync(clubMember, "User");

        if (!result.Succeeded)
        {
            var errors = string.Join(", ", result.Errors.Select(e => e.Description));
            throw new Exception($"User registration failed: {errors}");
        }

        return ClubMemberMapper.MapToReadDto(clubMember);
    }

    public async Task<AuthResponseClubMemberDTO> LoginAsync(LoginClubMemberDto dto, CancellationToken cancellationToken = default)
    {
        var clubMember = await _userManager.FindByEmailAsync(dto.Username);

        if (clubMember == null || !await _userManager.CheckPasswordAsync(clubMember, dto.Password))
        {
            throw new UnauthorizedAccessException("Wrong email or password!");
        }

        var response = await GenerateJwtTokenAsync(clubMember, dto.RememberMe);
        response.ReturnUrl = dto.ReturnUrl;

        return response;
    }

    private async Task<AuthResponseClubMemberDTO> GenerateJwtTokenAsync(
        ClubMember clubMember,
        bool rememberMe)
    {
        var authClaims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, clubMember.UserName ?? "Unknown"),
            new Claim(ClaimTypes.NameIdentifier, clubMember.Id),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        };

        var roles = await _userManager.GetRolesAsync(clubMember);
        foreach (var role in roles)
        {
            authClaims.Add(new Claim(ClaimTypes.Role, role));
        }

        var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"] ?? throw new InvalidOperationException("JWT Secret Key is not configured.")));
        var expiration = rememberMe
            ? DateTime.UtcNow.AddDays(30)
            : DateTime.UtcNow.AddHours(3);

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            expires: expiration,
            claims: authClaims,
            signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
        );

        return new AuthResponseClubMemberDTO
        {
            ClubMember = ClubMemberMapper.MapToReadDto(clubMember as ClubMember),
            Token = new JwtSecurityTokenHandler().WriteToken(token),
            Expiration = expiration
        };
    }

    public Task LogoutAsync(CancellationToken cancellationToken = default)
    {
        return Task.CompletedTask;
    }

    public async Task<ClubMemberReadDto> GetCurrentUserAsync(string userId, CancellationToken cancellationToken = default)
    {
        var user = await _userManager.FindByIdAsync(userId);

        if (user == null)
            throw new Exception("User not found");

        var roles = await _userManager.GetRolesAsync(user);

        return new ClubMemberReadDto
        {
            Id = user.Id,
            Email = user.Email,
            Name = user.Name,
            Surname = user.Surname,
            PhoneNumber = user.PhoneNumber,
            AvatarData = user.AvatarData,
            DateOfBirth = user.DateOfBirth,
            Roles = roles.ToList()
        };
    }

    public async Task ForgotPasswordAsync(ForgotPasswordDto dto, CancellationToken cancellationToken = default)
    {
        var email = dto.Email.Trim();
        var user = await _userManager.FindByEmailAsync(email);

        // Always succeed outwardly — do not reveal whether the account exists.
        if (user == null)
        {
            _logger.LogInformation("Password reset requested for unknown email.");
            return;
        }

        var identityToken = await _userManager.GeneratePasswordResetTokenAsync(user);
        var code = RandomNumberGenerator.GetInt32(10000, 100000).ToString(); // 5 digits

        var cacheKey = ResetCacheKeyPrefix + email.ToLowerInvariant();
        await _cache.SetAsync(
            cacheKey,
            new PasswordResetCacheEntry
            {
                UserId = user.Id,
                Code = code,
                IdentityToken = identityToken,
            },
            ResetCodeTtl,
            cancellationToken);

        var html = $"""
            <p>Вітаємо!</p>
            <p>Код для відновлення пароля на Ink &amp; Echo:</p>
            <p style="font-size:24px;font-weight:bold;letter-spacing:4px;">{code}</p>
            <p>Код дійсний 15 хвилин. Якщо ви не запитували відновлення — ігноруйте цей лист.</p>
            """;

        try
        {
            await _emailSender.SendAsync(
                email,
                "Код відновлення пароля — Ink & Echo",
                html,
                cancellationToken);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to send password reset email to {Email}", email);
            throw new InvalidOperationException("Не вдалося надіслати лист. Спробуйте пізніше або зверніться до підтримки.");
        }
    }

    public async Task ResetPasswordAsync(ResetPasswordDto dto, CancellationToken cancellationToken = default)
    {
        var email = dto.Email.Trim();
        var cacheKey = ResetCacheKeyPrefix + email.ToLowerInvariant();
        var entry = await _cache.GetAsync<PasswordResetCacheEntry>(cacheKey, cancellationToken);

        if (entry is null ||
            !string.Equals(entry.Code, dto.Code.Trim(), StringComparison.Ordinal))
        {
            throw new InvalidOperationException("Невірний або прострочений код.");
        }

        var user = await _userManager.FindByIdAsync(entry.UserId)
            ?? await _userManager.FindByEmailAsync(email);

        if (user == null)
        {
            throw new InvalidOperationException("Невірний або прострочений код.");
        }

        var result = await _userManager.ResetPasswordAsync(user, entry.IdentityToken, dto.NewPassword);
        if (!result.Succeeded)
        {
            var errors = string.Join(" ", result.Errors.Select(e => e.Description));
            throw new InvalidOperationException(errors);
        }

        await _cache.RemoveAsync(cacheKey, cancellationToken);
    }

    private sealed class PasswordResetCacheEntry
    {
        public string UserId { get; set; } = string.Empty;
        public string Code { get; set; } = string.Empty;
        public string IdentityToken { get; set; } = string.Empty;
    }
}
