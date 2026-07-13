using System.ComponentModel.DataAnnotations;

namespace FamilyClub.BLL.DTOs.ClubMember;

public class ClubMemberReadDto
{
    public string Id { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;

    public byte[]? AvatarData { get; set; }
    public string? Name { get; set; }
    public string? Surname { get; set; }
    public DateOnly? DateOfBirth { get; set; }
    public DateTimeOffset? LockoutEnd { get; set; }
    public DateTimeOffset? LockedAt { get; set; }

    public string? LockedBy { get; set; }

    public string? LockoutReason { get; set; }

    // Roles of our User
    public IEnumerable<string> Roles { get; set; } = new List<string>();

}
