using FamilyClub.BLL.DTOs.Review;
using FamilyClub.BLL.Interfaces;
using FamilyClub.DAL.Interfaces;
using FamilyClubLibrary;

namespace FamilyClub.BLL.Services;

public class ReviewService : IReviewService
{
    private readonly IReviewRepository _reviewRepository;
    private readonly IUnitOfWork _unitOfWork;

    public ReviewService(IReviewRepository reviewRepository, IUnitOfWork unitOfWork)
    {
        _reviewRepository = reviewRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task<IEnumerable<ReviewDto>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        var reviews = await _reviewRepository.GetAllAsync(cancellationToken);
        return reviews.Select(MapToDto);
    }

    public async Task<ReviewDto?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        var review = await _reviewRepository.GetByIdAsync(id, cancellationToken);
        return review is null ? null : MapToDto(review);
    }

    public async Task<ReviewDto> CreateAsync(ReviewDto dto, CancellationToken cancellationToken = default)
    {
        var review = new Review
        {
            ProductId = dto.ProductId,
            UserId = dto.UserId,
            Rating = dto.Rating,
            Comment = dto.Comment,
            CreatedAt = dto.CreatedAt == default ? DateTime.UtcNow : dto.CreatedAt,
            Approved = dto.Approved
        };

        await _reviewRepository.AddAsync(review, cancellationToken);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return MapToDto(review);
    }

    public async Task<bool> UpdateAsync(int id, ReviewDto dto, CancellationToken cancellationToken = default)
    {
        var review = await _reviewRepository.GetByIdAsync(id, cancellationToken);
        if (review is null)
        {
            return false;
        }

        review.ProductId = dto.ProductId;
        review.UserId = dto.UserId;
        review.Rating = dto.Rating;
        review.Comment = dto.Comment;
        review.Approved = dto.Approved;

        _reviewRepository.Update(review);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return true;
    }

    public async Task<bool> DeleteAsync(int id, CancellationToken cancellationToken = default)
    {
        var review = await _reviewRepository.GetByIdAsync(id, cancellationToken);
        if (review is null)
        {
            return false;
        }

        _reviewRepository.Delete(review);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return true;
    }
    public async Task<IEnumerable<ReviewDto>> GetByUserIdAsync(string userId, CancellationToken cancellationToken = default)
    {
        var reviews = await _reviewRepository.GetByUserIdAsync(userId, cancellationToken);
        return reviews.Select(MapToDto);
    }
    private static ReviewDto MapToDto(Review review)
    {
        string nameToShow = "Анонім";

        if (review.ClubMember != null)
        {
            var fullName = $"{review.ClubMember.Name} {review.ClubMember.Surname}".Trim();

            if (!string.IsNullOrWhiteSpace(fullName) && fullName.ToLower() != "string")
            {
                nameToShow = fullName;
            }
            else if (!string.IsNullOrWhiteSpace(review.ClubMember.Name) && review.ClubMember.Name.ToLower() != "string")
            {
                nameToShow = review.ClubMember.Name;
            }
            else if (!string.IsNullOrWhiteSpace(review.ClubMember.UserName) && review.ClubMember.UserName.ToLower() != "string")
            {
                nameToShow = review.ClubMember.UserName;
            }
            else if (!string.IsNullOrWhiteSpace(review.ClubMember.Email))
            {
                nameToShow = review.ClubMember.Email;
            }
        }

        return new ReviewDto
        {
            Id = review.Id,
            ProductId = review.ProductId,
            ProductName = review.Product?.ProductName,
            UserId = review.UserId,
            UserName = nameToShow,
            Rating = review.Rating,
            Comment = review.Comment,
            CreatedAt = review.CreatedAt,
            Approved = review.Approved,
            Authors = review.Product?.Authors != null
    ? string.Join(", ", review.Product.Authors.Select(a => a.AuthorName))
    : null,
            ProductImages = review.Product?.ProductImages?.Select(img => new ProductImageDto
            {
                Id = img.Id,
                ImageData = img.ImageData, // Передаємо byte[], JSON серіалізує його в Base64
                ImageName = img.ImageName
            }).ToList()


        };

    }

}
