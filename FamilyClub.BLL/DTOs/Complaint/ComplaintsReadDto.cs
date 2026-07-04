using System;
using System.Collections.Generic;
using System.Text;

namespace FamilyClub.BLL.DTOs.Complaint
{
    public class ComplaintsReadDto
    {
        public int Id { get; set; }
        public string ComplaintText { get; set; } = null!;
        public string ComplaintType { get; set; } = null!;
        public bool IsResolved { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? ResolvedAt { get; set; }
        public string ClubMemberId { get; set; } = null!;
        public string? ResolutionNotes { get; set; }
        public List<ComplaintImageDto> Images { get; set; } = new();
    }
}
