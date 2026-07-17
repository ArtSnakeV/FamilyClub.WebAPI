using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace FamilyClubLibrary
{
    public class Complaint
    {
        public int Id { get; set; }

        [Required]
        public string ComplaintText { get; set; } = default!;

        public string ComplaintType { get; set; } = "other";

        public bool IsResolved { get; set; } = false;

        public DateTime CreatedAt { get; set; }

        public DateTime? ResolvedAt { get; set; }

        // Foreign key to ClubMember
        [Required]
        public string ClubMemberId { get; set; } = default!;

        // Navigation property
        public ClubMember ClubMember { get; set; } = default!;

        // Notes to track situation and resolution of the complaint
        public string? ResolutionNotes { get; set; }

        // Collection of images (up to 5)
        public List<ComplaintImage> ComplaintImages { get; set; } = new();

    }
}

