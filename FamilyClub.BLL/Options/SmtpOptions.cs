namespace FamilyClub.BLL.Options;

public class SmtpOptions
{
    public const string SectionName = "Smtp";

    /// <summary>SMTP host, e.g. smtp.gmail.com</summary>
    public string Host { get; set; } = string.Empty;

    public int Port { get; set; } = 587;

    public bool UseSsl { get; set; } = true;

    public string User { get; set; } = string.Empty;

    public string Password { get; set; } = string.Empty;

    /// <summary>From address shown to recipients</summary>
    public string FromEmail { get; set; } = string.Empty;

    public string FromName { get; set; } = "Ink & Echo";
}
