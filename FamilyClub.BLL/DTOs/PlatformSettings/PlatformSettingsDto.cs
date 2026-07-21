using System.ComponentModel.DataAnnotations;

namespace FamilyClub.BLL.DTOs.PlatformSettings;

public class PlatformSettingsDto
{
    public int Id { get; set; } = 1;

    [MaxLength(200)]
    public string CompanyName { get; set; } = "Ink & Echo";

    [MaxLength(300)]
    public string? Slogan { get; set; }

    [MaxLength(200)]
    public string? SupportEmail { get; set; }

    [MaxLength(50)]
    public string? SupportPhone { get; set; }

    [MaxLength(500)]
    public string? CompanyAddress { get; set; }

    public int BooksPerPage { get; set; } = 12;

    public int MaxFileSizeMb { get; set; } = 10;

    [MaxLength(200)]
    public string AllowedFileFormats { get; set; } = "jpg, png, webp, pdf";

    [MaxLength(100)]
    public string ImageResizeMode { get; set; } = "1920";

    public string? LogoData { get; set; }
    public string? LogoContentType { get; set; }

    public string? IconData { get; set; }
    public string? IconContentType { get; set; }

    public string? BannerData { get; set; }
    public string? BannerContentType { get; set; }

    public bool MaintenanceMode { get; set; }

    [MaxLength(2000)]
    public string MaintenanceMessage { get; set; } =
        "Ми проводимо технічні роботи. Скоро сервіс знову запрацює!";

    public DateTime UpdatedAt { get; set; }
}
