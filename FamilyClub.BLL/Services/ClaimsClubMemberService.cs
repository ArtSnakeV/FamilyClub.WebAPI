using FamilyClub.BLL.DTOs.Claims;
using FamilyClub.BLL.Interfaces;
using FamilyClubLibrary;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;

namespace FamilyClub.BLL.Services;

public class ClaimsClubMemberService : IClaimsClubMemberService
{
    public readonly UserManager<ClubMember> _userManager;

    public ClaimsClubMemberService(UserManager<ClubMember> userManager)
    {
        _userManager = userManager;
    }
    public async Task<bool> AddClaimAsync(AddClaimClubMemberDto dto, CancellationToken cancellationToken = default)
    {
        // Using FindByIdAsync to search for the user by their ID
        var user = await _userManager.FindByIdAsync(dto.MemberId);
        if (user == null) return false;

        // Creating a new claim based on the provided DTO
        var newClaim = new Claim(dto.ClaimType, dto.ClaimValue);

        // Adding the claim to the user and checking if the operation succeeded
        var result = await _userManager.AddClaimAsync(user, newClaim);

        return result.Succeeded;

    }

    public async Task<IEnumerable<ClaimsClubMemberDto>> GetClaimsAsync(string memberId, CancellationToken cancellationToken = default)
    {
        // User search
        var user = await _userManager.FindByIdAsync(memberId);
        if (user == null) return Enumerable.Empty<ClaimsClubMemberDto>();

        // Getting list of claims for the user
        var claims = await _userManager.GetClaimsAsync(user);

        // Mapping claims to DTOs
        return claims.Select(MapToReadDto);
    }

    public async Task<bool> RemoveClaimAsync(AddClaimClubMemberDto dto, CancellationToken cancellationToken = default)
    {
        var user = await _userManager.FindByIdAsync(dto.MemberId);
        if (user == null) return false;

        // Searching for the existing claim to remove
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

        // Find the old claim
        var oldClaim = claims.FirstOrDefault(c =>
            c.Type == dto.OldClaimType &&
            c.Value == dto.OldClaimValue);

        if (oldClaim == null)
            return false;

        // Remove old claim
        var removeResult = await _userManager.RemoveClaimAsync(user, oldClaim);
        if (!removeResult.Succeeded)
            return false;

        // Add new claim
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


