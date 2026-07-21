using System.ComponentModel.DataAnnotations;

namespace FamilyClubLibrary;

/// <summary>
/// Singleton platform settings (one row in DB, Id = 1).
/// </summary>
public class PlatformSettings
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

    /// <summary>Base64 image data (without data: prefix) or full data URL.</summary>
    public string? LogoData { get; set; }

    [MaxLength(100)]
    public string? LogoContentType { get; set; }

    public string? IconData { get; set; }

    [MaxLength(100)]
    public string? IconContentType { get; set; }

    public string? BannerData { get; set; }

    [MaxLength(100)]
    public string? BannerContentType { get; set; }

    public bool MaintenanceMode { get; set; }

    [MaxLength(2000)]
    public string MaintenanceMessage { get; set; } =
        "Ми проводимо технічні роботи. Скоро сервіс знову запрацює!";

    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
