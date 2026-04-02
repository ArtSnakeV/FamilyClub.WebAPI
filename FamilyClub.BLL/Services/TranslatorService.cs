
using FamilyClub.BLL.DTOs.Translator;
using FamilyClub.BLL.Interfaces;
using FamilyClub.DAL.Interfaces;
using FamilyClubLibrary;

namespace FamilyClub.BLL.Services
{
    public class TranslatorService : ITranslatorService
    {
        private readonly ITranslatorRepository _translatorRepository;
        private readonly IUnitOfWork _unitOfWork;

        public TranslatorService(ITranslatorRepository translatorRepository, IUnitOfWork unitOfWork)
        {
            _translatorRepository = translatorRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<TranslatorDto>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            var translators = await _translatorRepository.GetAllAsync(cancellationToken);
            return translators.Select(MapToReadDto);
        }

        public async Task<TranslatorDto?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
        {
            var translator = await _translatorRepository.GetByIdAsync(id, cancellationToken);
            return translator is null ? null : MapToReadDto(translator);
        }

        public async Task<TranslatorDto> CreateAsync(TranslatorDto dto, CancellationToken cancellationToken = default)
        {
            var translator = new Translator
            {
                TranslatorName = dto.TranslatorName.Trim()
            };

            await _translatorRepository.AddAsync(translator, cancellationToken);
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return MapToReadDto(translator);
        }

        public async Task<bool> UpdateAsync(int id, TranslatorDto dto, CancellationToken cancellationToken = default)
        {
            var translator = await _translatorRepository.GetByIdAsync(id, cancellationToken);
            if (translator is null)
            {
                return false;
            }

            translator.TranslatorName = dto.TranslatorName.Trim();
            _translatorRepository.Update(translator);
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return true;
        }

        public async Task<bool> DeleteAsync(int id, CancellationToken cancellationToken = default)
        {
            var translator = await _translatorRepository.GetByIdAsync(id, cancellationToken);
            if (translator is null)
            {
                return false;
            }

            _translatorRepository.Delete(translator);
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return true;
        }

        private static TranslatorDto MapToReadDto(Translator translator)
        {
            return new TranslatorDto
            {
                Id = translator.Id,
                TranslatorName = translator.TranslatorName
            };
        }
    }
}
