using FamilyClub.BLL.DTOs.Claims;
using FamilyClub.BLL.DTOs.Language;
using System.Security.Claims;

namespace FamilyClub.BLL.Interfaces;

public interface IClaimsClubMemberService
{
    Task<IEnumerable<ClaimsClubMemberDto>> GetClaimsAsync(string memberId, CancellationToken cancellationToken = default);
    Task<bool> AddClaimAsync(AddClaimClubMemberDto dto, CancellationToken cancellationToken = default);
    Task<bool> RemoveClaimAsync(AddClaimClubMemberDto dto, CancellationToken cancellationToken = default);
    Task<bool> UpdateClaimAsync(UpdateClaimClubMemberDto dto, CancellationToken cancellationToken = default);
}

