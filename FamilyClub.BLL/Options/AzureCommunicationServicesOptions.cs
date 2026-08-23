namespace FamilyClub.BLL.Options;

public class AzureCommunicationServicesOptions
{
    public const string SectionName = "AzureCommunicationServices";

    /// <summary>ACS connection string: endpoint=...;accesskey=...</summary>
    public string ConnectionString { get; set; } = string.Empty;

    /// <summary>Verified sender on your domain, e.g. DoNotReply@familyclubqwerqwer12.pp.ua</summary>
    public string FromEmail { get; set; } = string.Empty;

    public string FromName { get; set; } = "Librellis";
}
