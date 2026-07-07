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

    public new async Task<IEnumerable<Product>> GetAllAsync(CancellationToken cancellationToken = default)
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
		.Include(p => p.AgeRestrictions)
		.ToListAsync(cancellationToken);
	}

    public new async Task<Product?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
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
		.Include(p => p.AgeRestrictions)
		.FirstOrDefaultAsync(p => p.Id == id, cancellationToken);
	}

    public async Task<IEnumerable<Product>> GetAllWithImagesAsync(CancellationToken cancellationToken = default) => await GetAllAsync(cancellationToken);
    public async Task<Product?> GetByIdWithImagesAsync(int id, CancellationToken cancellationToken = default) => await GetByIdAsync(id, cancellationToken);
}
public class PromotionRepository(FamilyClubContext context) : Repository<Promotion>(context), IPromotionRepository;
public class PublisherRepository(FamilyClubContext context) : Repository<Publisher>(context), IPublisherRepository;
//public class ReviewRepository(FamilyClubContext context) : Repository<Review>(context), IReviewRepository;
public class ReviewRepository : Repository<Review>, IReviewRepository
{
    private readonly FamilyClubContext _context;

    public ReviewRepository(FamilyClubContext context) : base(context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Review>> GetByUserIdAsync(string userId, CancellationToken cancellationToken = default)
    {
        return await _context.Reviews
            .Include(p => p.Product)
            .Where(r => r.UserId == userId)
            .ToListAsync(cancellationToken);
    }
}
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
    public new async Task<IEnumerable<Order>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return await _context.Orders
            .Include(o => o.OrderItems)
            .ToListAsync(cancellationToken);
    }
    public new async Task<Order?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        return await _context.Orders
            .Include(o => o.OrderItems)
            .FirstOrDefaultAsync(o => o.Id == id, cancellationToken);
    }
    public async Task<IEnumerable<Order>> GetByUserIdAsync(string userId, CancellationToken cancellationToken = default)
    {
        return await _context.Orders
            .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Product)
                    .ThenInclude(p => p.ProductImages)
            .Where(o => o.UserId == userId)
            .ToListAsync(cancellationToken);
    }
}
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
public class AgeRestrictionRepository(FamilyClubContext context) : Repository<AgeRestriction>(context), IAgeRestrictionRepository;
public class BookSizeRepository(FamilyClubContext context) : Repository<BookSize>(context), IBookSizeRepository;
public class CartRepository : Repository<Cart>, ICartRepository
{
    private readonly FamilyClubContext _context;
    public CartRepository(FamilyClubContext context) : base(context)
    {
        _context = context;
    }
    public async Task<Cart?> GetByMemberIdAsync(string clubMemberId, CancellationToken cancellationToken = default)
    {
        return await _context.Cart
            .Include(c => c.CartItems)
            .ThenInclude(ci => ci.Product)
            .FirstOrDefaultAsync(c => c.ClubMemberId == clubMemberId, cancellationToken);
    }
}

public class CartItemRepository : Repository<CartItem>, ICartItemRepository
{
    private readonly FamilyClubContext _context;
    public CartItemRepository(FamilyClubContext context) : base(context)
    {
        _context = context;
    }
    public async Task<IEnumerable<CartItem>> GetByCartIdAsync(int cartId, CancellationToken cancellationToken = default)
    {
        return await _context.CartItems
            .Where(ci => ci.CartId == cartId)
            .Include(ci => ci.Product)
            .ToListAsync(cancellationToken);
    }
}

public class ComplaintRepository : Repository<Complaint>, IComplaintRepository
{
    private readonly FamilyClubContext _context;

    public ComplaintRepository(FamilyClubContext context) : base(context)
    {
        _context = context;
    }

    // Hide base methods to include images by default
    public new async Task<IEnumerable<Complaint>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return await _context.Complaints
            .Include(c => c.ComplaintImages)
            .Include(c => c.ClubMember)
            .ToListAsync(cancellationToken);
    }

    public new async Task<Complaint?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        return await _context.Complaints
            .Include(c => c.ComplaintImages)
            .Include(c => c.ClubMember)
            .FirstOrDefaultAsync(c => c.Id == id, cancellationToken);
    }

    public async Task<IEnumerable<Complaint>> GetByClubMemberIdAsync(string clubMemberId, CancellationToken cancellationToken = default)
    {
        return await _context.Complaints
            .Include(c => c.ComplaintImages)
            .Include(c => c.ClubMember)
            .Where(c => c.ClubMemberId == clubMemberId)
            .ToListAsync(cancellationToken);
    }
}