using System.ComponentModel.DataAnnotations;

namespace FamilyClub.BLL.DTOs.Roles;

public class RoleClubMemberDTO 
{
    public string Id { get; set; } = default!;
    [Required]
    [MinLength(1)]
    public string Name { get; set; } = default!;
}
