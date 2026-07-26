using FamilyClub.BLL.DTOs.Claims;
using FamilyClub.BLL.Interfaces;
using FamilyClubLibrary;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace FamilyClub.BLL.Services;

public class ClaimsClubMemberService : IClaimsClubMemberService
{
    public readonly UserManager<ClubMember> _userManager;

    public ClaimsClubMemberService(UserManager<ClubMember> userManager)
    {
        _userManager = userManager;
    }

    public async Task<IEnumerable<ClaimWithMemberDto>> GetAllClaimsAsync(CancellationToken cancellationToken = default)
    {
        var users = await _userManager.Users
            .AsNoTracking()
            .ToListAsync(cancellationToken);

        var result = new List<ClaimWithMemberDto>();

        foreach (var user in users)
        {
            var claims = await _userManager.GetClaimsAsync(user);
            foreach (var claim in claims)
            {
                result.Add(new ClaimWithMemberDto
                {
                    MemberId = user.Id,
                    Email = user.Email,
                    UserName = user.UserName,
                    PhoneNumber = user.PhoneNumber,
                    ClaimType = claim.Type,
                    ClaimValue = claim.Value,
                });
            }
        }

        return result;
    }

    public async Task<bool> AddClaimAsync(AddClaimClubMemberDto dto, CancellationToken cancellationToken = default)
    {
        var user = await _userManager.FindByIdAsync(dto.MemberId);
        if (user == null) return false;

        var newClaim = new Claim(dto.ClaimType, dto.ClaimValue);
        var result = await _userManager.AddClaimAsync(user, newClaim);

        return result.Succeeded;
    }

    public async Task<IEnumerable<ClaimsClubMemberDto>> GetClaimsAsync(string memberId, CancellationToken cancellationToken = default)
    {
        var user = await _userManager.FindByIdAsync(memberId);
        if (user == null) return Enumerable.Empty<ClaimsClubMemberDto>();

        var claims = await _userManager.GetClaimsAsync(user);
        return claims.Select(MapToReadDto);
    }

    public async Task<bool> RemoveClaimAsync(AddClaimClubMemberDto dto, CancellationToken cancellationToken = default)
    {
        var user = await _userManager.FindByIdAsync(dto.MemberId);
        if (user == null) return false;

        var claims = await _userManager.GetClaimsAsync(user);
        var claimToRemove = claims.FirstOrDefault(c =>
            c.Type == dto.ClaimType &&
            c.Value == dto.ClaimValue);

        if (claimToRemove == null) return false;

        var result = await _userManager.RemoveClaimAsync(user, claimToRemove);
        return result.Succeeded;
    }

    public async Task<bool> UpdateClaimAsync(UpdateClaimClubMemberDto dto, CancellationToken cancellationToken = default)
    {
        var user = await _userManager.FindByIdAsync(dto.MemberId);
        if (user == null)
            return false;

        var claims = await _userManager.GetClaimsAsync(user);

        var oldClaim = claims.FirstOrDefault(c =>
            c.Type == dto.OldClaimType &&
            c.Value == dto.OldClaimValue);

        if (oldClaim == null)
            return false;

        var removeResult = await _userManager.RemoveClaimAsync(user, oldClaim);
        if (!removeResult.Succeeded)
            return false;

        var newClaim = new Claim(dto.NewClaimType, dto.NewClaimValue);
        var addResult = await _userManager.AddClaimAsync(user, newClaim);

        return addResult.Succeeded;
    }

    private static ClaimsClubMemberDto MapToReadDto(System.Security.Claims.Claim claim)
    {
        return new ClaimsClubMemberDto
        {
            ClaimType = claim.Type,
            ClaimValue = claim.Value
        };
    }
}
