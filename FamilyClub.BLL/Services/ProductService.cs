using FamilyClub.BLL.DTOs.Product;
using FamilyClub.BLL.Interfaces;
using FamilyClub.DAL.Interfaces;
using FamilyClubLibrary;
using Microsoft.AspNetCore.Http;

namespace FamilyClub.BLL.Services;

public class ProductService : IProductService
{
    private readonly IProductRepository _productRepository;
    private readonly IUnitOfWork _unitOfWork;

    public ProductService(IProductRepository productRepository, IUnitOfWork unitOfWork)
    {
        _productRepository = productRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task<IEnumerable<ProductDto>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        var products = await _productRepository.GetAllAsync(cancellationToken);
        foreach (var product in products)
        {
            product.ProductImages = (await _productRepository
                .GetProductImagesByProductIdAsync(product.Id, cancellationToken))
                .ToList();
        }
        return products.Select(MapToDto);
    }

    public async Task<ProductDto?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        var product = await _productRepository.GetByIdAsync(id, cancellationToken);
        if (product is null)
        {
            return null;
        }

        product.ProductImages = (await _productRepository
            .GetProductImagesByProductIdAsync(id, cancellationToken))
            .ToList();

        return MapToDto(product);
    }

	//public async Task<ProductDto> CreateAsync(ProductDto? dto, List<IFormFile> productImageFiles, CancellationToken cancellationToken = default)
	//{
	//    dto.ProductImages ??= new List<ProductImage>();
	//    dto = await UploadImagesAsync(dto, productImageFiles);

	//    var product = new Product
	//    {
	//        ProductName = dto.ProductName.Trim(),
	//        Price = dto.Price,
	//        DiscountPrice = dto.DiscountPrice,
	//        Description = dto.Description,
	//        PublisherId = dto.PublisherId,
	//        OriginalTitle = dto.OriginalTitle,
	//        PageCount = dto.PageCount,
	//        PublishingDate = dto.PublishingDate,
	//        Format = dto.Format,
	//        OriginalLanguageId = dto.OriginalLanguageId,
	//        ISBN = dto.ISBN,
	//        PromotionId = dto.PromotionId,
	//        ProductCode = dto.ProductCode,
	//        WeightGrams = dto.WeightGrams,
	//        ItemsInSet = dto.ItemsInSet,
	//        AgeRestrictions = dto.AgeRestrictions,
	//        ProductImages = dto.ProductImages?.Select(productImage => new ProductImage
	//        {
	//            ImageData = productImage.ImageData,
	//            ImageName = productImage.ImageName
	//        }).ToList()
	//    };

	//    await _productRepository.AddAsync(product, cancellationToken);
	//    await _unitOfWork.SaveChangesAsync(cancellationToken);

	//    return MapToDto(product);
	//}
	public async Task<ProductDto> CreateAsync(
	ProductDto dto,
	List<IFormFile> productImageFiles,
	CancellationToken cancellationToken = default)
	{
		dto.ProductImages ??= new List<ProductImage>();

		dto = await UploadImagesAsync(dto, productImageFiles);

		var product = new Product
		{
			ProductName = dto.ProductName.Trim(),
			Price = dto.Price,
			DiscountPrice = dto.DiscountPrice,
			Description = dto.Description,

			PublisherId = dto.PublisherId,

			OriginalTitle = dto.OriginalTitle,
			PageCount = dto.PageCount,
			PublishingDate = dto.PublishingDate,

			CoverType = dto.CoverType,
			Availability = dto.Availability,

			QuantityInStock = dto.QuantityInStock,
			ProductCode = dto.ProductCode,
			WeightGrams = dto.WeightGrams,
			ItemsInSet = dto.ItemsInSet,

			AgeRestriction = dto.AgeRestriction,

			OriginalLanguageId = dto.OriginalLanguageId,
			ISBN = dto.ISBN,

			PromotionId = dto.PromotionId,

			ProductImages = dto.ProductImages?.Select(productImage => new ProductImage
			{
				ImageData = productImage.ImageData,
				ImageName = productImage.ImageName
			}).ToList()
		};

		// many-to-many
		product.Authors = dto.AuthorIds?.Select(id => new Author { Id = id }).ToList() ?? new();
		product.Languages = dto.LanguageIds?.Select(id => new Language { Id = id }).ToList() ?? new();
		product.Categories = dto.CategoryIds?.Select(id => new Category { Id = id }).ToList() ?? new();
		product.Series = dto.SeriesIds?.Select(id => new Series { Id = id }).ToList() ?? new();
		product.Translators = dto.TranslatorIds?.Select(id => new Translator { Id = id }).ToList() ?? new();
		product.Formats = dto.FormatIds?.Select(id => new Format  { Id = id }).ToList() ?? new();
		product.BookSizes = dto.BookSizeIds?.Select(id => new BookSize { Id = id }).ToList() ?? new();
		await _productRepository.AddAsync(product, cancellationToken);
		await _unitOfWork.SaveChangesAsync(cancellationToken);

		return MapToDto(product);
	}

	public async Task<bool> UpdateAsync(
	int id,
	ProductDto dto,
	List<IFormFile> productImageFiles,
	CancellationToken cancellationToken = default)
	{
		var existingProduct = await _productRepository.GetByIdWithImagesAsync(id, cancellationToken);

		if (existingProduct is null)
			return false;

		// basic fields
		existingProduct.ProductName = dto.ProductName.Trim();
		existingProduct.Price = dto.Price;
		existingProduct.DiscountPrice = dto.DiscountPrice;
		existingProduct.Description = dto.Description;

		existingProduct.PublisherId = dto.PublisherId;

		existingProduct.OriginalTitle = dto.OriginalTitle;
		existingProduct.PageCount = dto.PageCount;
		existingProduct.PublishingDate = dto.PublishingDate;

		// enums
		//existingProduct.ProductFormat = dto.ProductFormat;
		existingProduct.CoverType = dto.CoverType;
		existingProduct.Availability = dto.Availability;
		//existingProduct.BookSize = dto.BookSize;
		existingProduct.AgeRestriction = dto.AgeRestriction;

		// inventory / meta
		existingProduct.QuantityInStock = dto.QuantityInStock;
		existingProduct.ProductCode = dto.ProductCode;
		existingProduct.WeightGrams = dto.WeightGrams;
		existingProduct.ItemsInSet = dto.ItemsInSet;

		existingProduct.OriginalLanguageId = dto.OriginalLanguageId;
		existingProduct.ISBN = dto.ISBN;

		existingProduct.PromotionId = dto.PromotionId;

		// many-to-many 
		existingProduct.Authors = dto.AuthorIds?
			.Select(id => new Author { Id = id }).ToList() ?? new();

		existingProduct.Languages = dto.LanguageIds?
			.Select(id => new Language { Id = id }).ToList() ?? new();

		existingProduct.Categories = dto.CategoryIds?
			.Select(id => new Category { Id = id }).ToList() ?? new();

		existingProduct.Series = dto.SeriesIds?
			.Select(id => new Series { Id = id }).ToList() ?? new();

		existingProduct.Translators = dto.TranslatorIds?
			.Select(id => new Translator { Id = id }).ToList() ?? new();
		existingProduct.Formats = dto.FormatIds?
			.Select(id => new Format { Id = id }).ToList() ?? new();
		existingProduct.BookSizes = dto.BookSizeIds?
			.Select(id => new BookSize { Id = id }).ToList() ?? new();

		// IMAGES 
		if (!dto.LeaveOldImages)
		{
			existingProduct.ProductImages?.Clear();
		}

		if (productImageFiles is { Count: > 0 })
		{
			dto.ProductImages = new List<ProductImage>();
			await UploadImagesAsync(dto, productImageFiles);

			foreach (var image in dto.ProductImages)
			{
				existingProduct.ProductImages?.Add(new ProductImage
				{
					ImageData = image.ImageData,
					ImageName = image.ImageName,
					ProductId = existingProduct.Id
				});
			}
		}

		_productRepository.Update(existingProduct);
		await _unitOfWork.SaveChangesAsync(cancellationToken);

		return true;
	}

	//public async Task<bool> UpdateAsync(int id, ProductDto dto, List<IFormFile> productImageFiles, CancellationToken cancellationToken = default)
	//   {
	//       var existingProduct = await _productRepository.GetByIdWithImagesAsync(id, cancellationToken);
	//       if (existingProduct is null)
	//       {
	//           return false;
	//       }

	//       existingProduct.ProductName = dto.ProductName.Trim();
	//       existingProduct.Price = dto.Price;
	//       existingProduct.DiscountPrice = dto.DiscountPrice;
	//       existingProduct.Description = dto.Description;
	//       existingProduct.PublisherId = dto.PublisherId;
	//       existingProduct.OriginalTitle = dto.OriginalTitle;
	//       existingProduct.PageCount = dto.PageCount;
	//       existingProduct.PublishingDate = dto.PublishingDate;
	//       existingProduct.Format = dto.Format;
	//       existingProduct.OriginalLanguageId = dto.OriginalLanguageId;
	//       existingProduct.ISBN = dto.ISBN;
	//       existingProduct.PromotionId = dto.PromotionId;
	//       existingProduct.ProductCode = dto.ProductCode;
	//       existingProduct.WeightGrams = dto.WeightGrams;
	//       existingProduct.ItemsInSet = dto.ItemsInSet;
	//       existingProduct.AgeRestrictions = dto.AgeRestrictions;

	//       if (!dto.LeaveOldImages)
	//       {
	//           existingProduct.ProductImages?.Clear();
	//       }

	//       if (productImageFiles is { Count: > 0 })
	//       {
	//           dto.ProductImages = new List<ProductImage>();
	//           await UploadImagesAsync(dto, productImageFiles);

	//           foreach (var image in dto.ProductImages)
	//           {
	//               existingProduct.ProductImages?.Add(new ProductImage
	//               {
	//                   ImageData = image.ImageData,
	//                   ImageName = image.ImageName,
	//                   ProductId = existingProduct.Id
	//               });
	//           }
	//       }

	//       _productRepository.Update(existingProduct);
	//       await _unitOfWork.SaveChangesAsync(cancellationToken);
	//       return true;
	//   }

	public async Task<bool> DeleteAsync(int id, CancellationToken cancellationToken = default)
    {
        var product = await _productRepository.GetByIdAsync(id, cancellationToken);
        if (product is null)
        {
            return false;
        }

        _productRepository.Delete(product);
        await _unitOfWork.SaveChangesAsync(cancellationToken);
        return true;
    }

    private async Task<ProductDto?> UploadImagesAsync(ProductDto? productDto, List<IFormFile> imageFiles)
    {
        if (imageFiles != null && imageFiles.Count > 0)
        {
            int maxImageNumber = Math.Min(imageFiles.Count, 5);

            for (int i = 0; i < maxImageNumber; i++)
            {
                var file = imageFiles[i];
                if (file.Length > 0)
                {
                    using var memoryStream = new MemoryStream();
                    await file.CopyToAsync(memoryStream);
                    byte[] imageData = memoryStream.ToArray();
                    var productImage = new ProductImage
                    {
                        ImageData = imageData,
                        ImageName = file.FileName,
                    };
                    productDto?.ProductImages?.Add(productImage);
                }
            }
        }
        return productDto;
    }

	//private static ProductDto MapToDto(Product product)
	//{
	//    return new ProductDto
	//    {
	//        Id = product.Id,
	//        ProductName = product.ProductName,
	//        Price = product.Price,
	//        DiscountPrice = product.DiscountPrice,
	//        Description = product.Description,
	//        PublisherId = product.PublisherId,
	//        OriginalTitle = product.OriginalTitle,
	//        PageCount = product.PageCount,
	//        PublishingDate = product.PublishingDate,
	//        Format = product.Format,
	//        OriginalLanguageId = product.OriginalLanguageId,
	//        ISBN = product.ISBN,
	//        PromotionId = product.PromotionId,
	//        ProductCode = product.ProductCode,
	//        WeightGrams = product.WeightGrams,
	//        ItemsInSet = product.ItemsInSet,
	//        AgeRestrictions = product.AgeRestrictions,
	//        ProductImages = product.ProductImages?.Select(productImage => new ProductImage
	//        {
	//            ImageData = productImage.ImageData,
	//            ImageName = productImage.ImageName
	//        }).ToList()
	//    };
	//}

	private static ProductDto MapToDto(Product product)
	{
		return new ProductDto
		{
			Id = product.Id,

			ProductName = product.ProductName,
			Price = product.Price,
			DiscountPrice = product.DiscountPrice,
			Description = product.Description,

			PublisherId = product.PublisherId,

			OriginalTitle = product.OriginalTitle,
			PageCount = product.PageCount,
			PublishingDate = product.PublishingDate,

			//ProductFormat = product.ProductFormat,
			CoverType = product.CoverType,
			Availability = product.Availability,
			//BookSize = product.BookSize,
			AgeRestriction = product.AgeRestriction,

			QuantityInStock = product.QuantityInStock,
			ProductCode = product.ProductCode,
			WeightGrams = product.WeightGrams,
			ItemsInSet = product.ItemsInSet,

			OriginalLanguageId = product.OriginalLanguageId,
			ISBN = product.ISBN,

			PromotionId = product.PromotionId,

			// images 
			ProductImages = product.ProductImages?.Select(img => new ProductImage
			{
				ImageData = img.ImageData,
				ImageName = img.ImageName
			}).ToList(),

			// many-to-many 
			AuthorIds = product.Authors?.Select(a => a.Id).ToList(),
			LanguageIds = product.Languages?.Select(l => l.Id).ToList(),
			CategoryIds = product.Categories?.Select(c => c.Id).ToList(),
			SeriesIds = product.Series?.Select(s => s.Id).ToList(),
			TranslatorIds = product.Translators?.Select(t => t.Id).ToList(),
			FormatIds = product.Formats?.Select(f => f.Id).ToList(),
			BookSizeIds = product.BookSizes?.Select(f => f.Id).ToList(),
		};
	}
}