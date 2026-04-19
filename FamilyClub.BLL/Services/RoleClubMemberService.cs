using FamilyClub.BLL.DTOs.ClubMember;
using FamilyClub.BLL.DTOs.Roles;
using FamilyClub.BLL.Interfaces;
using FamilyClub.BLL.Mapping;
using FamilyClubLibrary;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;


namespace FamilyClub.BLL.Services;

public class RoleClubMemberService : IRoleClubMemberService
{
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly UserManager<ClubMember> _userManager;

    public RoleClubMemberService(RoleManager<IdentityRole> roleManager, UserManager<ClubMember> userManager)
    {
        _roleManager = roleManager;
        _userManager = userManager;
    }

    public async Task<bool> CreateRoleAsync(string roleName, CancellationToken cancellationToken = default)
    {
        if(string.IsNullOrWhiteSpace(roleName)) return false;
        // Checking if role already exists
        if (await _roleManager.RoleExistsAsync(roleName)) return false;

        var result = await _roleManager.CreateAsync(new IdentityRole(roleName));
        return result.Succeeded;
    }

    public async Task<bool> DeleteRoleAsync(string id, CancellationToken cancellationToken = default)
    {
        var role = await _roleManager.FindByIdAsync(id);
        if (role == null) return false;

        var result = await _roleManager.DeleteAsync(role);
        return result.Succeeded;
    }

    public async Task<IEnumerable<RoleClubMemberDTO>> GetAllRolesAsync(CancellationToken cancellationToken = default)
    {
        var roles = await _roleManager.Roles.ToListAsync(cancellationToken);

        return roles.Select(r => new RoleClubMemberDTO
        {
            Id = r.Id,
            Name = r.Name ?? string.Empty
        });
    }

    public async Task<RoleClubMemberDTO?> GetRoleByIdAsync(string id, CancellationToken cancellationToken = default)
    {
        var role = await _roleManager.FindByIdAsync(id);
        if (role == null) return null;

        return new RoleClubMemberDTO
        {
            Id = role.Id,
            Name = role.Name ?? string.Empty
        };
    }

    public async Task<IEnumerable<ClubMemberReadDto>> GetUsersInRoleAsync(string roleName, CancellationToken cancellationToken = default)
    {
        // Method returns list of users (by their Email or UserName) who are in the specified role
        var users = await _userManager.GetUsersInRoleAsync(roleName);

        // Return the list of user identifiers (Email or UserName) for users in the specified role
        var dtos = new List<ClubMemberReadDto>();

        foreach (var user in users)
        {
            var allUserRoles = await _userManager.GetRolesAsync(user);
            dtos.Add(ClubMemberMapper.MapToReadDto(user, allUserRoles));
        }

        return dtos;
    }

    public async Task<bool> UpdateRoleAsync(string id, string newRoleName, CancellationToken cancellationToken = default)
    {
        var role = await _roleManager.FindByIdAsync(id);
        if (role == null) return false;

        // Prevent duplicate role names
        if (await _roleManager.RoleExistsAsync(newRoleName))
            throw new Exception("Role with this name already exists.");

        role.Name = newRoleName;
        var result = await _roleManager.UpdateAsync(role);
        return result.Succeeded;
    }

}


