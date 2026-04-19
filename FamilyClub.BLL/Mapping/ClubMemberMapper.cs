using FamilyClub.BLL.DTOs.ClubMember;
using FamilyClubLibrary;

namespace FamilyClub.BLL.Mapping;

public static class ClubMemberMapper
{
    public static ClubMemberReadDto MapToReadDto(ClubMember clubMember, IEnumerable<string>? roles = null)
    {
        return new ClubMemberReadDto
        {
            Id = clubMember.Id,
            Email = clubMember.Email ?? clubMember.UserName!,
            Name = clubMember.Name,
            Surname = clubMember.Surname,
            PhoneNumber = clubMember.PhoneNumber!,
            DateOfBirth = clubMember.DateOfBirth,
            Roles = roles ?? new List<string>()
        };
    }
}
