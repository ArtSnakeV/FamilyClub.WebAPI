using System.ComponentModel.DataAnnotations;

namespace FamilyClub.BLL.DTOs.Claims;

public class AddClaimClubMemberDto : ClaimsClubMemberDto
{
    [Required]
    public string MemberId { get; set; } = default!;
}

