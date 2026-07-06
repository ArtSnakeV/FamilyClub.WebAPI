using System;
using System.ComponentModel.DataAnnotations;

namespace FamilyClubLibrary
{
    public class ComplaintImage
    {
        public int Id { get; set; }

        public required byte[] ImageData { get; set; }

        [MaxLength(255)]
        public string ImageName { get; set; } = string.Empty;

        // Optional: store content type for proper display
        [MaxLength(50)]
        public string? ContentType { get; set; }

        public DateTime UploadedAt { get; set; }

        // Foreign key to Complaint
        public int ComplaintId { get; set; }

        // Navigation property
        public Complaint Complaint { get; set; } = default!;
    }
}