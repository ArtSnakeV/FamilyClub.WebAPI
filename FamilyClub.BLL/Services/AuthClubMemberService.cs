using FamilyClub.BLL.DTOs.ClubMember;
using FamilyClub.BLL.Interfaces;
using FamilyClub.DAL.Interfaces;
using FamilyClubLibrary;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using FamilyClub.BLL.Mapping;


using Microsoft.AspNetCore.Authentication;
using System.Net.Http.Json;

namespace FamilyClub.BLL.Services;

public class AuthClubMemberService : IAuthClubMemberService
{
    private readonly UserManager<ClubMember> _userManager;
    private readonly SignInManager<ClubMember> _signInManager;
    private readonly IConfiguration _configuration;
    private readonly RoleManager<IdentityRole> _roleManager;

    public AuthClubMemberService(
        UserManager<ClubMember> userManager,
        SignInManager<ClubMember> signInManager,
        IConfiguration configuration,
        RoleManager<IdentityRole> roleManager)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _roleManager = roleManager;
        _configuration = configuration;
    }

    public async Task<ClubMemberReadDto> RegisterAsync(RegisterClubMemberDto dto, CancellationToken cancellationToken = default)
    {
        var clubMember = new ClubMember { UserName = dto.Email, Email = dto.Email, PhoneNumber = dto.PhoneNumber, Name = dto.Name, Surname = dto.Surname, DateOfBirth = dto.DateOfBirth };
        var result = await _userManager.CreateAsync(clubMember, dto.Password);
        // Checking, if role `User` exists if not, creating and adding this role to newly added `User` by default
        if (!await _roleManager.RoleExistsAsync("User"))
        {
            await _roleManager.CreateAsync(new IdentityRole("User"));
        }
        await _userManager.AddToRoleAsync(clubMember, "User"); // Automatic adding role `User` for our self-registered User

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

        // Let's generate our token here and return it along with the user info
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

        // Roles must be in the JWT for [Authorize(Roles = "...")] endpoints
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


        return new AuthResponseClubMemberDTO{
            ClubMember = ClubMemberMapper.MapToReadDto(clubMember as ClubMember),
            Token = new JwtSecurityTokenHandler().WriteToken(token),
            Expiration = expiration 
        };
    }

    public Task LogoutAsync(CancellationToken cancellationToken = default)
    {
        // While using JWT, logout is typically handled on the client side by simply deleting the token.
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

    public AuthenticationProperties GetExternalLoginProperties(string provider, string redirectUrl)
    {
        return _signInManager.ConfigureExternalAuthenticationProperties(provider, redirectUrl);
    }

    public async Task<AuthResponseClubMemberDTO> ExternalLoginCallbackAsync(CancellationToken cancellationToken = default)
    {
        var info = await _signInManager.GetExternalLoginInfoAsync();
        if (info == null)
        {
            throw new InvalidOperationException("Error loading external login information from provider.");
        }

        var email = info.Principal.FindFirstValue(ClaimTypes.Email);
        if (string.IsNullOrEmpty(email))
        {
            throw new InvalidOperationException("Email claim not received from external login provider.");
        }

        var givenName = info.Principal.FindFirstValue(ClaimTypes.GivenName) ?? info.Principal.FindFirstValue(ClaimTypes.Name) ?? "User";
        var surname = info.Principal.FindFirstValue(ClaimTypes.Surname) ?? "";

        var clubMember = await _userManager.FindByLoginAsync(info.LoginProvider, info.ProviderKey);

        if (clubMember == null)
        {
            clubMember = await _userManager.FindByEmailAsync(email);

            if (clubMember == null)
            {
                clubMember = new ClubMember
                {
                    UserName = email,
                    Email = email,
                    Name = givenName,
                    Surname = surname,
                    EmailConfirmed = true
                };

                var createResult = await _userManager.CreateAsync(clubMember);
                if (!createResult.Succeeded)
                {
                    var errors = string.Join(", ", createResult.Errors.Select(e => e.Description));
                    throw new Exception($"User creation via external login failed: {errors}");
                }

                if (!await _roleManager.RoleExistsAsync("User"))
                {
                    await _roleManager.CreateAsync(new IdentityRole("User"));
                }
                await _userManager.AddToRoleAsync(clubMember, "User");
            }

            var addLoginResult = await _userManager.AddLoginAsync(clubMember, info);
            if (!addLoginResult.Succeeded)
            {
                var errors = string.Join(", ", addLoginResult.Errors.Select(e => e.Description));
                throw new Exception($"Failed to link external login: {errors}");
            }
        }

        return await GenerateJwtTokenAsync(clubMember, rememberMe: true);
    }

    public async Task<AuthResponseClubMemberDTO> ExternalTokenLoginAsync(ExternalLoginRequestDto dto, CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(dto.Provider))
        {
            throw new ArgumentException("Provider is required.");
        }

        string email = string.Empty;
        string providerKey = string.Empty;
        string name = string.Empty;
        string surname = string.Empty;

        if (dto.Provider.Equals("Google", StringComparison.OrdinalIgnoreCase))
        {
            if (string.IsNullOrWhiteSpace(dto.IdToken))
                throw new ArgumentException("IdToken is required for Google login.");

            try
            {
                var payload = await Google.Apis.Auth.GoogleJsonWebSignature.ValidateAsync(dto.IdToken);
                email = payload.Email;
                providerKey = payload.Subject;
                name = payload.GivenName ?? payload.Name ?? "Google User";
                surname = payload.FamilyName ?? "";
            }
            catch (Exception ex)
            {
                throw new UnauthorizedAccessException($"Invalid Google token: {ex.Message}");
            }
        }
        else if (dto.Provider.Equals("Facebook", StringComparison.OrdinalIgnoreCase))
        {
            if (string.IsNullOrWhiteSpace(dto.AccessToken))
                throw new ArgumentException("AccessToken is required for Facebook login.");

            try
            {
                using var httpClient = new HttpClient();
                var fbResponse = await httpClient.GetFromJsonAsync<FacebookUserData>(
                    $"https://graph.facebook.com/me?fields=id,name,first_name,last_name,email&access_token={dto.AccessToken}", cancellationToken);

                if (fbResponse == null || string.IsNullOrWhiteSpace(fbResponse.Id))
                    throw new UnauthorizedAccessException("Failed to validate Facebook token.");

                email = fbResponse.Email ?? $"{fbResponse.Id}@facebook.com";
                providerKey = fbResponse.Id;
                name = fbResponse.First_Name ?? fbResponse.Name ?? "Facebook User";
                surname = fbResponse.Last_Name ?? "";
            }
            catch (Exception ex)
            {
                throw new UnauthorizedAccessException($"Invalid Facebook token: {ex.Message}");
            }
        }
        else
        {
            throw new ArgumentException($"Unsupported provider '{dto.Provider}'.");
        }

        var clubMember = await _userManager.FindByLoginAsync(dto.Provider, providerKey);

        if (clubMember == null)
        {
            clubMember = await _userManager.FindByEmailAsync(email);

            if (clubMember == null)
            {
                clubMember = new ClubMember
                {
                    UserName = email,
                    Email = email,
                    Name = name,
                    Surname = surname,
                    EmailConfirmed = true
                };

                var createResult = await _userManager.CreateAsync(clubMember);
                if (!createResult.Succeeded)
                {
                    var errors = string.Join(", ", createResult.Errors.Select(e => e.Description));
                    throw new Exception($"User creation failed: {errors}");
                }

                if (!await _roleManager.RoleExistsAsync("User"))
                {
                    await _roleManager.CreateAsync(new IdentityRole("User"));
                }
                await _userManager.AddToRoleAsync(clubMember, "User");
            }

            var userLoginInfo = new UserLoginInfo(dto.Provider, providerKey, dto.Provider);
            await _userManager.AddLoginAsync(clubMember, userLoginInfo);
        }

        return await GenerateJwtTokenAsync(clubMember, rememberMe: true);
    }

    private class FacebookUserData
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string? First_Name { get; set; }
        public string? Last_Name { get; set; }
        public string? Email { get; set; }
    }
}
