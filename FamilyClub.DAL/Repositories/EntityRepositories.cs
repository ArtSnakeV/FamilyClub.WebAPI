using FamilyClub.DAL.EF;
using FamilyClub.DAL.Interfaces;
using FamilyClubLibrary;
using Microsoft.EntityFrameworkCore;

namespace FamilyClub.DAL.Repositories;

public class AuthorRepository(FamilyClubContext context) : Repository<Author>(context), IAuthorRepository;
public class CategoryRepository(FamilyClubContext context) : Repository<Category>(context), ICategoryRepository;
public class LanguageRepository(FamilyClubContext context) : Repository<Language>(context), ILanguageRepository;
public class OrderItemRepository(FamilyClubContext context) : Repository<OrderItem>(context), IOrderItemRepository;
public class ProductRepository : Repository<Product>, IProductRepository
{
    private readonly FamilyClubContext _context;

    public ProductRepository(FamilyClubContext context) : base(context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Product>> GetAllWithImagesAsync(CancellationToken cancellationToken = default)
    {
		return await _context.Products
		.Include(p => p.ProductImages)
		.Include(p => p.Authors)
		.Include(p => p.Languages)
		.Include(p => p.Categories)
		.Include(p => p.Series)
		.Include(p => p.Translators)
		.Include(p => p.Formats)
		.Include(p => p.BookSizes)
		.ToListAsync(cancellationToken);
	}

    public async Task<Product?> GetByIdWithImagesAsync(int id, CancellationToken cancellationToken = default)
    {
		return await _context.Products
		.Include(p => p.ProductImages)
		.Include(p => p.Authors)
		.Include(p => p.Languages)
		.Include(p => p.Categories)
		.Include(p => p.Series)
		.Include(p => p.Translators)
		.Include(p => p.Formats)
		.Include(p => p.BookSizes)
		.FirstOrDefaultAsync(p => p.Id == id, cancellationToken);
	}
}
public class PromotionRepository(FamilyClubContext context) : Repository<Promotion>(context), IPromotionRepository;
public class PublisherRepository(FamilyClubContext context) : Repository<Publisher>(context), IPublisherRepository;
public class ReviewRepository(FamilyClubContext context) : Repository<Review>(context), IReviewRepository;
public class SeriesRepository(FamilyClubContext context) : Repository<Series>(context), ISeriesRepository;
public class TranslatorRepository(FamilyClubContext context) : Repository<Translator>(context), ITranslatorRepository;
public class ClubMemberRepository(FamilyClubContext context) : Repository<ClubMember>(context), IClubMemberRepository;

public class OrderRepository : Repository<Order>, IOrderRepository
{
	private readonly FamilyClubContext _context;
	public OrderRepository(FamilyClubContext context) : base(context)
	{
		_context = context;
	}

	public async Task<IEnumerable<Order>> GetAllWithItemsAsync(CancellationToken cancellationToken = default)
	{
		return await _context.Orders
			.Include(o => o.OrderItems)
			.ToListAsync(cancellationToken);
	}

	public async Task<Order?> GetByIdWithItemsAsync(int id, CancellationToken cancellationToken = default)
	{
		return await _context.Orders
			.Include(o => o.OrderItems)
			.FirstOrDefaultAsync(o => o.Id == id, cancellationToken);
	}
};
public class NotificationRepository : Repository<Notification>, INotificationRepository
{
	private readonly FamilyClubContext _context;

	public NotificationRepository(FamilyClubContext context) : base(context)
	{
		_context = context;
	}

	public Task<int> GetCountAsync(CancellationToken cancellationToken = default)
	{
		return _context.Notifications.CountAsync(cancellationToken);
	}

	public Task<int> GetUnreadCountAsync(string clubMemberId, CancellationToken cancellationToken = default)
	{
		return _context.Notifications
			.CountAsync(n => n.ClubMemberId == clubMemberId && !n.IsRead, cancellationToken);
	}
}
public class FormatRepository(FamilyClubContext context) : Repository<Format>(context), IFormatRepository;
public class BookSizeRepository(FamilyClubContext context) : Repository<BookSize>(context), IBookSizeRepository;