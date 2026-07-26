namespace FamilyClub.BLL.DTOs.Claims;

public class ClaimWithMemberDto
{
    public string MemberId { get; set; } = default!;
    public string? Email { get; set; }
    public string? UserName { get; set; }
    public string? PhoneNumber { get; set; }
    public string ClaimType { get; set; } = default!;
    public string ClaimValue { get; set; } = default!;
}
