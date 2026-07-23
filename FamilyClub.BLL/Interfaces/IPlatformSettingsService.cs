using FamilyClub.BLL.DTOs.PlatformSettings;

namespace FamilyClub.BLL.Interfaces;

public interface IPlatformSettingsService
{
    Task<PlatformSettingsDto> GetAsync(CancellationToken cancellationToken = default);
    Task<PlatformSettingsDto> UpdateAsync(PlatformSettingsDto dto, CancellationToken cancellationToken = default);
}
