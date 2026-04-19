using FamilyClub.BLL.DTOs.ClubMember;
using FamilyClub.BLL.DTOs.Roles;

namespace FamilyClub.BLL.Interfaces;

public interface IRoleClubMemberService
{
    Task<IEnumerable<RoleClubMemberDTO>> GetAllRolesAsync(CancellationToken cancellationToken = default);
    Task<RoleClubMemberDTO?> GetRoleByIdAsync(string id, CancellationToken cancellationToken = default);
    Task<bool> CreateRoleAsync(string roleName, CancellationToken cancellationToken = default);
    Task<bool> UpdateRoleAsync(string id, string newRoleName, CancellationToken cancellationToken = default);
    Task<bool> DeleteRoleAsync(string id, CancellationToken cancellationToken = default);
    Task<IEnumerable<ClubMemberReadDto>> GetUsersInRoleAsync(string roleName, CancellationToken cancellationToken = default);

}
