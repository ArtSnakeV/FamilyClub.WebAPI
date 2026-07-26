using System.ComponentModel.DataAnnotations;
namespace FamilyClubLibrary
{
    public class ActionLog
    {
        public long Id { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        /// <summary>Хто виконав дію. Null — системна подія.</summary>
        [MaxLength(450)]
        public string? ClubMemberId { get; set; }
        public ClubMember? ClubMember { get; set; }
        /// <summary>Created, Deleted, Blocked, Unblocked, RoleAssigned, …</summary>
        [Required]
        [MaxLength(100)]
        public string Action { get; set; } = string.Empty;
        /// <summary>Books, Authors, Users, Managers, Roles, Access, Platform</summary>
        [Required]
        [MaxLength(100)]
        public string Module { get; set; } = string.Empty;
        [MaxLength(2000)]
        public string? Details { get; set; }
        [MaxLength(45)]
        public string? IpAddress { get; set; }
        /// <summary>info | success | warning | error</summary>
        [Required]
        [MaxLength(20)]
        public string Level { get; set; } = "info";
    }
}