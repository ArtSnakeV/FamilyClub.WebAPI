using System;
using System.Collections.Generic;
using System.Text;

namespace FamilyClub.BLL.DTOs.Claims;

public class UpdateClaimClubMemberDto
{
    public string MemberId { get; set; } = default!;
    public string OldClaimType { get; set; } = default!;
    public string OldClaimValue { get; set; } = default!;
    public string NewClaimType { get; set; } = default!;
    public string NewClaimValue { get; set; } = default!;
}
