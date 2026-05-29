using FamilyClubLibrary;
using FamilyClubLibrary.Enum;

namespace FamilyClub.BLL.DTOs.Product;

public class ProductDto
{
	//public int Id { get; set; }
	//public string ProductName { get; set; } = default!;
	//public decimal Price { get; set; }
	//public decimal? DiscountPrice { get; set; }
	//public string? Description { get; set; }
	//public int? PublisherId { get; set; }
	//public List<ProductImage>? ProductImages { get; set; } = new();
	//public string? OriginalTitle { get; set; }
	//public int? PageCount { get; set; }
	//public DateOnly? PublishingDate { get; set; }
	//public string? Format { get; set; }
	//public int? OriginalLanguageId { get; set; }
	//public string? ISBN { get; set; }
	//public int? PromotionId { get; set; }
	//public string? ProductCode { get; set; }
	//public int? WeightGrams { get; set; }
	//public int? ItemsInSet { get; set; }
	//public string? AgeRestrictions { get; set; }
	//public bool LeaveOldImages { get; set; }

	public int Id { get; set; }

	public string ProductName { get; set; } = default!;
	public decimal Price { get; set; }
	public decimal? DiscountPrice { get; set; }
	public string? Description { get; set; }

	public int? PublisherId { get; set; }

	// images
	public List<ProductImage>? ProductImages { get; set; } = new();

	public string? OriginalTitle { get; set; }
	public int? PageCount { get; set; }
	public DateOnly? PublishingDate { get; set; }

	// ❗ FIXED: enum-и
	public CoverType? CoverType { get; set; }
	public Availability? Availability { get; set; }
	public int? QuantityInStock { get; set; }
	public int? OriginalLanguageId { get; set; }
	public string? ISBN { get; set; }

	public int? PromotionId { get; set; }

	public string? ProductCode { get; set; }
	public int? WeightGrams { get; set; }
	public int? ItemsInSet { get; set; }

	// many-to-many (для фронта — тільки Id)
	public List<int>? AuthorIds { get; set; }
	public List<int>? LanguageIds { get; set; }
	public List<int>? CategoryIds { get; set; }
	public List<int>? SeriesIds { get; set; }
	public List<int>? TranslatorIds { get; set; }
	public List<int>? FormatIds { get; set; } = new();
	public List<int>? BookSizeIds { get; set; } = new();
	public List<int>? AgeRestrictionIds { get; set; } = new();
	public bool LeaveOldImages { get; set; }
}
