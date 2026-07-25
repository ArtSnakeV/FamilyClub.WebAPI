using FamilyClub.BLL.DTOs.ActionLog;
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
    private readonly IActionLogService _actionLog;

    public RoleClubMemberService(
        RoleManager<IdentityRole> roleManager,
        UserManager<ClubMember> userManager,
        IActionLogService actionLog)
    {
        _roleManager = roleManager;
        _userManager = userManager;
        _actionLog = actionLog;
    }

    public async Task<bool> CreateRoleAsync(string roleName, CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(roleName)) return false;
        if (await _roleManager.RoleExistsAsync(roleName)) return false;

        var result = await _roleManager.CreateAsync(new IdentityRole(roleName));
        if (result.Succeeded)
        {
            await SafeLogAsync(
                ActionLogCodes.Actions.Created,
                ActionLogCodes.Modules.Roles,
                $"Створено роль «{roleName}»",
                ActionLogCodes.Levels.Success,
                cancellationToken);
        }
        return result.Succeeded;
    }

    public async Task<bool> DeleteRoleAsync(string id, CancellationToken cancellationToken = default)
    {
        var role = await _roleManager.FindByIdAsync(id);
        if (role == null) return false;

        var name = role.Name;
        var result = await _roleManager.DeleteAsync(role);
        if (result.Succeeded)
        {
            await SafeLogAsync(
                ActionLogCodes.Actions.Deleted,
                ActionLogCodes.Modules.Roles,
                $"Видалено роль «{name}», Id={id}",
                ActionLogCodes.Levels.Warning,
                cancellationToken);
        }
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
        var users = await _userManager.GetUsersInRoleAsync(roleName);
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

        if (await _roleManager.RoleExistsAsync(newRoleName))
            throw new Exception("Role with this name already exists.");

        var oldName = role.Name;
        role.Name = newRoleName;
        var result = await _roleManager.UpdateAsync(role);
        if (result.Succeeded)
        {
            await SafeLogAsync(
                ActionLogCodes.Actions.PermissionsUpdated,
                ActionLogCodes.Modules.Roles,
                $"Перейменовано роль «{oldName}» → «{newRoleName}»",
                ActionLogCodes.Levels.Info,
                cancellationToken);
        }
        return result.Succeeded;
    }

    public async Task<bool> AssignRolesToUserAsync(string userId, List<string> roles, CancellationToken cancellationToken = default)
    {
        var user = await _userManager.FindByIdAsync(userId);

        if (user == null)
            return false;

        var currentRoles = await _userManager.GetRolesAsync(user);

        if (currentRoles.Any())
        {
            var removeResult = await _userManager.RemoveFromRolesAsync(user, currentRoles);

            if (!removeResult.Succeeded)
                return false;
        }

        if (roles.Any())
        {
            var addResult = await _userManager.AddToRolesAsync(user, roles);

            if (!addResult.Succeeded)
                return false;
        }

        await SafeLogAsync(
            ActionLogCodes.Actions.RoleAssigned,
            ActionLogCodes.Modules.Roles,
            $"Оновлено ролі користувача {user.Email}: [{string.Join(", ", roles)}]",
            ActionLogCodes.Levels.Success,
            cancellationToken);

        return true;
    }

    private async Task SafeLogAsync(
        string action,
        string module,
        string details,
        string level,
        CancellationToken cancellationToken)
    {
        try
        {
            await _actionLog.LogAsync(action, module, details, level, cancellationToken: cancellationToken);
        }
        catch
        {
        }
    }
}
