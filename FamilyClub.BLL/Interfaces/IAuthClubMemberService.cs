using FamilyClub.BLL.DTOs.ClubMember;

namespace FamilyClub.BLL.Interfaces;

public interface IAuthClubMemberService
{
    Task<AuthResponseClubMemberDTO> LoginAsync(LoginClubMemberDto dto, CancellationToken cancellationToken = default);
    Task<ClubMemberReadDto> RegisterAsync(RegisterClubMemberDto dto, CancellationToken cancellationToken = default);
    Task LogoutAsync(CancellationToken cancellationToken = default);
    Task<ClubMemberReadDto> GetCurrentUserAsync(string userId, CancellationToken cancellationToken = default);
    Microsoft.AspNetCore.Authentication.AuthenticationProperties GetExternalLoginProperties(string provider, string redirectUrl);
    Task<AuthResponseClubMemberDTO> ExternalLoginCallbackAsync(CancellationToken cancellationToken = default);
    Task<AuthResponseClubMemberDTO> ExternalTokenLoginAsync(ExternalLoginRequestDto dto, CancellationToken cancellationToken = default);
}
