using FamilyClub.BLL.DTOs.Promotion;

namespace FamilyClub.BLL.Interfaces;

public interface IPromotionService
{
    Task<IEnumerable<PromotionDto>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<PromotionDto?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<PromotionDto> CreateAsync(PromotionDto dto, CancellationToken cancellationToken = default);
    Task<bool> UpdateAsync(int id, PromotionDto dto, CancellationToken cancellationToken = default);
    Task<bool> DeleteAsync(int id, CancellationToken cancellationToken = default);
}
