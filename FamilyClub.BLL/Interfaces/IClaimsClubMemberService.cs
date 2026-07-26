using FamilyClub.BLL.DTOs.Claims;

namespace FamilyClub.BLL.Interfaces;

public interface IClaimsClubMemberService
{
    Task<IEnumerable<ClaimWithMemberDto>> GetAllClaimsAsync(CancellationToken cancellationToken = default);
    Task<IEnumerable<ClaimsClubMemberDto>> GetClaimsAsync(string memberId, CancellationToken cancellationToken = default);
    Task<bool> AddClaimAsync(AddClaimClubMemberDto dto, CancellationToken cancellationToken = default);
    Task<bool> RemoveClaimAsync(AddClaimClubMemberDto dto, CancellationToken cancellationToken = default);
    Task<bool> UpdateClaimAsync(UpdateClaimClubMemberDto dto, CancellationToken cancellationToken = default);
}
