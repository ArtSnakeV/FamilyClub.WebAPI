using System.ComponentModel.DataAnnotations;

namespace FamilyClub.BLL.DTOs.Complaint
{
    public class ComplaintImageCreateDto
    {
        [Required]
        public byte[] ImageData { get; set; } = null!;

        [MaxLength(255)]
        public string ImageName { get; set; } = string.Empty;

        [MaxLength(50)]
        public string? ContentType { get; set; }
    }
}
