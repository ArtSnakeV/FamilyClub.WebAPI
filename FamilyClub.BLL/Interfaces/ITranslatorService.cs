using FamilyClub.BLL.DTOs.Translator;

namespace FamilyClub.BLL.Interfaces;

public interface ITranslatorService
{
    Task<IEnumerable<TranslatorDto>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<TranslatorDto?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<TranslatorDto> CreateAsync(TranslatorDto dto, CancellationToken cancellationToken = default);
    Task<bool> UpdateAsync(int id, TranslatorDto dto, CancellationToken cancellationToken = default);
    Task<bool> DeleteAsync(int id, CancellationToken cancellationToken = default);
}