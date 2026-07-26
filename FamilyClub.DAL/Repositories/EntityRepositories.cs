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
		.AsNoTracking()
		.Include(p => p.ProductImages)
		.Include(p => p.Authors)
		.Include(p => p.Languages)
		.Include(p => p.Categories)
		.Include(p => p.Series)
		.Include(p => p.Translators)
		.Include(p => p.Formats)
		.Include(p => p.BookSizes)
		.Include(p => p.AgeRestrictions)
		.AsSplitQuery()
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
		.AsSplitQuery()
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

    public new async Task<IEnumerable<Review>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return await _context.Reviews
         .Include(r => r.ClubMember)
         .Include(r => r.Product)
             .ThenInclude(p => p.Authors)
         .Include(r => r.Product)
             .ThenInclude(p => p.ProductImages)
         .AsSplitQuery()
         .ToListAsync(cancellationToken);
    }

    public new async Task<Review?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        return await _context.Reviews
            .Include(r => r.ClubMember)
            .Include(r => r.Product)
              .ThenInclude(p => p.Authors)
            .Include(r => r.Product)
              .ThenInclude(p => p.ProductImages)
            .AsSplitQuery()
            .FirstOrDefaultAsync(r => r.Id == id, cancellationToken);
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
            .Include(o => o.ClubMember)
            .AsSplitQuery()
            .ToListAsync(cancellationToken);
    }
    public new async Task<Order?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        return await _context.Orders
            .Include(o => o.OrderItems)
            .Include(o => o.ClubMember)
            .AsSplitQuery()
            .FirstOrDefaultAsync(o => o.Id == id, cancellationToken);
    }
    public async Task<IEnumerable<Order>> GetByUserIdAsync(string userId, CancellationToken cancellationToken = default)
    {
        return await _context.Orders
            .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Product)
                    .ThenInclude(p => p.ProductImages)
                     .Include(o => o.ClubMember)
            .Where(o => o.UserId == userId)
            .AsSplitQuery()
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
public class BlockReasonRepository(FamilyClubContext context) : Repository<BlockReason>(context), IBlockReasonRepository;
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
            .AsSplitQuery()
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
            .AsSplitQuery()
            .ToListAsync(cancellationToken);
    }

    public new async Task<Complaint?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        return await _context.Complaints
            .Include(c => c.ComplaintImages)
            .Include(c => c.ClubMember)
            .AsSplitQuery()
            .FirstOrDefaultAsync(c => c.Id == id, cancellationToken);
    }

    public async Task<IEnumerable<Complaint>> GetByClubMemberIdAsync(string clubMemberId, CancellationToken cancellationToken = default)
    {
        return await _context.Complaints
            .Include(c => c.ComplaintImages)
            .Include(c => c.ClubMember)
            .Where(c => c.ClubMemberId == clubMemberId)
            .AsSplitQuery()
            .ToListAsync(cancellationToken);
    }
}

public class BlockedIpRepository : Repository<BlockedIp>, IBlockedIpRepository
{
    private readonly FamilyClubContext _context;

    public BlockedIpRepository(FamilyClubContext context) : base(context)
    {
        _context = context;
    }

    public async Task<BlockedIp?> GetByIpAsync(string ipAddress, CancellationToken cancellationToken = default)
    {
        return await _context.BlockedIps
            .FirstOrDefaultAsync(b => b.IpAddress == ipAddress, cancellationToken);
    }
}

public class PlatformSettingsRepository : Repository<PlatformSettings>, IPlatformSettingsRepository
{
    private readonly FamilyClubContext _context;

    public PlatformSettingsRepository(FamilyClubContext context) : base(context)
    {
        _context = context;
    }

    public async Task<PlatformSettings?> GetSingletonAsync(CancellationToken cancellationToken = default)
    {
        return await _context.PlatformSettings
            .FirstOrDefaultAsync(s => s.Id == 1, cancellationToken);
    }
}

public class ActionLogRepository : Repository<ActionLog>, IActionLogRepository
{
    private readonly FamilyClubContext _context;

    public ActionLogRepository(FamilyClubContext context) : base(context)
    {
        _context = context;
    }

    public async Task<ActionLog?> GetByIdAsync(long id, CancellationToken cancellationToken = default)
    {
        return await _context.ActionLogs
            .Include(x => x.ClubMember)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<(IReadOnlyList<ActionLog> Items, int TotalCount)> GetPagedAsync(
        string? search,
        string? action,
        string? module,
        string? clubMemberId,
        string? level,
        DateTime? fromUtc,
        DateTime? toUtc,
        int page,
        int pageSize,
        CancellationToken cancellationToken = default)
    {
        if (page < 1) page = 1;
        if (pageSize < 1) pageSize = 10;
        if (pageSize > 100) pageSize = 100;

        var query = BuildFilterQuery(search, action, module, clubMemberId, level, fromUtc, toUtc);

        var total = await query.CountAsync(cancellationToken);

        var items = await query
            .OrderByDescending(x => x.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Include(x => x.ClubMember)
            .AsNoTracking()
            .ToListAsync(cancellationToken);

        return (items, total);
    }

    public async Task<ActionLogStatsRow> GetStatsAsync(
        DateTime? fromUtc,
        DateTime? toUtc,
        CancellationToken cancellationToken = default)
    {
        var query = BuildFilterQuery(null, null, null, null, null, fromUtc, toUtc);

        var total = await query.CountAsync(cancellationToken);
        var success = await query.CountAsync(x => x.Level == "success", cancellationToken);
        var warning = await query.CountAsync(x => x.Level == "warning", cancellationToken);
        var error = await query.CountAsync(x => x.Level == "error", cancellationToken);
        var info = await query.CountAsync(x => x.Level == "info", cancellationToken);
        var uniqueUsers = await query
            .Where(x => x.ClubMemberId != null)
            .Select(x => x.ClubMemberId)
            .Distinct()
            .CountAsync(cancellationToken);

        return new ActionLogStatsRow
        {
            Total = total,
            Success = success,
            Warning = warning,
            Error = error,
            Info = info,
            UniqueUsers = uniqueUsers,
        };
    }

    public async Task<IReadOnlyList<ActionLog>> GetOlderThanAsync(
        DateTime cutoffUtc,
        CancellationToken cancellationToken = default)
    {
        return await _context.ActionLogs
            .AsNoTracking()
            .Where(x => x.CreatedAt < cutoffUtc)
            .OrderBy(x => x.CreatedAt)
            .ToListAsync(cancellationToken);
    }

    public async Task DeleteRangeByIdsAsync(
        IEnumerable<long> ids,
        CancellationToken cancellationToken = default)
    {
        var idList = ids.ToList();
        if (idList.Count == 0) return;

        await _context.ActionLogs
            .Where(x => idList.Contains(x.Id))
            .ExecuteDeleteAsync(cancellationToken);
    }

    public async Task<ActionLogArchive?> GetCurrentArchiveAsync(
        CancellationToken cancellationToken = default)
    {
        return await _context.ActionLogArchives
            .AsNoTracking()
            .OrderByDescending(x => x.CreatedAt)
            .FirstOrDefaultAsync(cancellationToken);
    }

    public async Task ReplaceArchiveAsync(
        ActionLogArchive archive,
        CancellationToken cancellationToken = default)
    {
        // Один архів: попередній видаляється
        await _context.ActionLogArchives.ExecuteDeleteAsync(cancellationToken);
        await _context.ActionLogArchives.AddAsync(archive, cancellationToken);
    }

    private IQueryable<ActionLog> BuildFilterQuery(
        string? search,
        string? action,
        string? module,
        string? clubMemberId,
        string? level,
        DateTime? fromUtc,
        DateTime? toUtc)
    {
        var query = _context.ActionLogs.AsQueryable();

        if (fromUtc.HasValue)
            query = query.Where(x => x.CreatedAt >= fromUtc.Value);
        if (toUtc.HasValue)
            query = query.Where(x => x.CreatedAt <= toUtc.Value);
        if (!string.IsNullOrWhiteSpace(action))
            query = query.Where(x => x.Action == action);
        if (!string.IsNullOrWhiteSpace(module))
            query = query.Where(x => x.Module == module);
        if (!string.IsNullOrWhiteSpace(clubMemberId))
            query = query.Where(x => x.ClubMemberId == clubMemberId);
        if (!string.IsNullOrWhiteSpace(level))
            query = query.Where(x => x.Level == level);

        if (!string.IsNullOrWhiteSpace(search))
        {
            var term = search.Trim();
            query = query.Where(x =>
                x.Action.Contains(term) ||
                x.Module.Contains(term) ||
                (x.Details != null && x.Details.Contains(term)) ||
                (x.IpAddress != null && x.IpAddress.Contains(term)));
        }

        return query;
    }
}