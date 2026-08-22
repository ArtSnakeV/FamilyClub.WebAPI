namespace FamilyClub.BLL.DTOs.ClubMember;

public class ExternalLoginRequestDto
{
    public string Provider { get; set; } = string.Empty;
    public string? IdToken { get; set; }
    public string? AccessToken { get; set; }
    public string? ReturnUrl { get; set; }
}
