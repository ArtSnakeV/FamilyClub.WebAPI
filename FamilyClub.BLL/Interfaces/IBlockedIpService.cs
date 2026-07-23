using FamilyClubLibrary;

namespace FamilyClub.BLL.Interfaces;

public interface IBlockedIpService
{
    Task<bool> IsIpBlockedAsync(string ipAddress, CancellationToken cancellationToken = default);
    Task<IEnumerable<BlockedIp>> GetAllBlockedIpsAsync(CancellationToken cancellationToken = default);
    Task AddBlockedIpAsync(string ipAddress, string? reason, CancellationToken cancellationToken = default);
    Task RemoveBlockedIpAsync(string ipAddress, CancellationToken cancellationToken = default);
}