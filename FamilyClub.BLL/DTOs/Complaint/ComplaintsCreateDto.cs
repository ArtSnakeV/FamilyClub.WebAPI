using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace FamilyClub.BLL.DTOs.Complaint
{
    public class ComplaintsCreateDto
    {
        [Required]
        [StringLength(2000, ErrorMessage = "Complaint text cannot exceed 2000 characters.")]
        public string ComplaintText { get; set; } = null!;

        public string ComplaintType { get; set; } = "other";

        //[Required] // Commented for testing - UNCOMMENT IN PRODUCTION!
        public string ClubMemberId { get; set; } = "test-user-id";

        [MaxLength(5, ErrorMessage = "You can attach a maximum of 5 images.")]
        public List<ComplaintImageCreateDto>? Images { get; set; }
    }
}
