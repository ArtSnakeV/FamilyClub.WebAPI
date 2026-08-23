using Azure;
using Azure.Communication.Email;
using FamilyClub.BLL.Interfaces;
using FamilyClub.BLL.Options;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace FamilyClub.WebAPI.Services;

public class AzureEmailSender : IEmailSender
{
    private readonly AzureCommunicationServicesOptions _options;
    private readonly ILogger<AzureEmailSender> _logger;

    public AzureEmailSender(
        IOptions<AzureCommunicationServicesOptions> options,
        ILogger<AzureEmailSender> logger)
    {
        _options = options.Value;
        _logger = logger;
    }

    public async Task SendAsync(
        string toEmail,
        string subject,
        string htmlBody,
        CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(_options.ConnectionString))
        {
            throw new InvalidOperationException(
                "Azure Communication Services is not configured. Set AzureCommunicationServices:ConnectionString.");
        }

        if (string.IsNullOrWhiteSpace(_options.FromEmail))
        {
            throw new InvalidOperationException(
                "Azure Communication Services sender is not configured. Set AzureCommunicationServices:FromEmail.");
        }

        var client = new EmailClient(_options.ConnectionString);

        var message = new EmailMessage(
            senderAddress: _options.FromEmail,
            content: new EmailContent(subject) { Html = htmlBody },
            recipients: new EmailRecipients(new List<EmailAddress> { new(toEmail) }));

        try
        {
            var operation = await client.SendAsync(WaitUntil.Completed, message, cancellationToken);
            _logger.LogInformation(
                "Email sent to {ToEmail} subject={Subject} status={Status}",
                toEmail,
                subject,
                operation.Value.Status);
        }
        catch (RequestFailedException ex)
        {
            _logger.LogError(
                ex,
                "Azure email failed to {ToEmail} subject={Subject} status={Status}",
                toEmail,
                subject,
                ex.Status);
            throw;
        }
    }
}
