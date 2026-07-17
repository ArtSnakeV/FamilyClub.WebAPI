using FamilyClub.BLL.DTOs.Promotion;
using FamilyClub.BLL.Interfaces;
using FamilyClub.DAL.Interfaces;
using FamilyClubLibrary;

namespace FamilyClub.BLL.Services;

public class PromotionService : IPromotionService
{
    private readonly IPromotionRepository _promotionRepository;
    private readonly IUnitOfWork _unitOfWork;

    public PromotionService(IPromotionRepository promotionRepository, IUnitOfWork unitOfWork)
    {
        _promotionRepository = promotionRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task<IEnumerable<PromotionDto>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        var promotions = await _promotionRepository.GetAllAsync(cancellationToken);
        return promotions.Select(MapToReadDto);
    }

    public async Task<PromotionDto?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        var promotion = await _promotionRepository.GetByIdAsync(id, cancellationToken);
        return promotion is null ? null : MapToReadDto(promotion);
    }

    public async Task<PromotionDto> CreateAsync(PromotionDto dto, CancellationToken cancellationToken = default)
    {
        var promotion = new Promotion
        {
            DiscountPercent = dto.DiscountPercent,
            StartDate = dto.StartDate,
            EndDate = dto.EndDate
        };

        await _promotionRepository.AddAsync(promotion, cancellationToken);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return MapToReadDto(promotion);
    }

    public async Task<bool> UpdateAsync(int id, PromotionDto dto, CancellationToken cancellationToken = default)
    {
        var promotion = await _promotionRepository.GetByIdAsync(id, cancellationToken);
        if (promotion is null)
        {
            return false;
        }

        promotion.DiscountPercent = dto.DiscountPercent;
        promotion.StartDate = dto.StartDate;
        promotion.EndDate = dto.EndDate;
        _promotionRepository.Update(promotion);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return true;
    }

    public async Task<bool> DeleteAsync(int id, CancellationToken cancellationToken = default)
    {
        var promotion = await _promotionRepository.GetByIdAsync(id, cancellationToken);
        if (promotion is null)
        {
            return false;
        }

        _promotionRepository.Delete(promotion);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return true;
    }

    private static PromotionDto MapToReadDto(Promotion promotion)
    {
        return new PromotionDto
        {
            Id = promotion.Id,
            DiscountPercent = promotion.DiscountPercent,
            StartDate = promotion.StartDate,
            EndDate = promotion.EndDate
        };
    }
}

