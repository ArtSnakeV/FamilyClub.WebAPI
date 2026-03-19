using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using FamilyClubLibrary;

namespace FamilyClub.WebAPI.Data
{
    public class FamilyClubContext : IdentityDbContext<ClubMember>
    {


    }
}
