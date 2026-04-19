using System.ComponentModel.DataAnnotations;

namespace FamilyClub.BLL.DTOs.Claims;

public class ClaimsClubMemberDto
{
    [Required]
    public string ClaimType { get; set; } = default!;
    [Required]
    public string ClaimValue { get; set; } = default!;
}

