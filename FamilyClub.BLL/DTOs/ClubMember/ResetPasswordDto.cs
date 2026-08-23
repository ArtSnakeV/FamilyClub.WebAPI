using System.ComponentModel.DataAnnotations;

namespace FamilyClub.BLL.DTOs.ClubMember;

public class ResetPasswordDto
{
    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    /// <summary>5-digit code from email</summary>
    [Required]
    [StringLength(5, MinimumLength = 5)]
    public string Code { get; set; } = string.Empty;

    [Required]
    [MinLength(6)]
    public string NewPassword { get; set; } = string.Empty;

    [Required]
    [Compare(nameof(NewPassword), ErrorMessage = "Passwords do not match.")]
    public string ConfirmPassword { get; set; } = string.Empty;
}
