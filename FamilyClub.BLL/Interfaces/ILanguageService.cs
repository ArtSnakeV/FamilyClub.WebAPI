using FamilyClub.BLL.DTOs.Language;

namespace FamilyClub.BLL.Interfaces;

public interface ILanguageService
{
    Task<IEnumerable<LanguageDto>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<LanguageDto?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<LanguageDto> CreateAsync(LanguageDto dto, CancellationToken cancellationToken = default);
    Task<bool> UpdateAsync(int id, LanguageDto dto, CancellationToken cancellationToken = default);
    Task<bool> DeleteAsync(int id, CancellationToken cancellationToken = default);
}
