using FamilyClubLibrary;

namespace FamilyClub.DAL.Interfaces;

public interface IAuthorRepository : IRepository<Author>;
public interface ICategoryRepository : IRepository<Category>;
public interface ILanguageRepository : IRepository<Language>;
public interface IOrderItemRepository : IRepository<OrderItem>;
public interface IProductRepository : IRepository<Product>
{
    new Task<IEnumerable<Product>> GetAllAsync(CancellationToken cancellationToken = default);
    new Task<Product?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<IEnumerable<Product>> GetAllWithImagesAsync(CancellationToken cancellationToken = default);
    Task<Product?> GetByIdWithImagesAsync(int id, CancellationToken cancellationToken = default);
}
public interface IPromotionRepository : IRepository<Promotion>;
public interface IPublisherRepository : IRepository<Publisher>;
//public interface IReviewRepository : IRepository<Review>;
public interface IReviewRepository : IRepository<Review>
{
    new Task<IEnumerable<Review>> GetAllAsync(CancellationToken cancellationToken = default);
    new Task<Review?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<IEnumerable<Review>> GetByUserIdAsync(string userId, CancellationToken cancellationToken = default);
}
public interface ISeriesRepository : IRepository<Series>;
public interface ITranslatorRepository : IRepository<Translator>;
public interface IClubMemberRepository : IRepository<ClubMember>;
public interface IOrderRepository : IRepository<Order>
{
	Task<IEnumerable<Order>> GetAllAsync(CancellationToken cancellationToken = default);
	Task<Order?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<IEnumerable<Order>> GetByUserIdAsync(string userId, CancellationToken cancellationToken = default);
};

public interface INotificationRepository : IRepository<Notification> 
{
	Task<int> GetCountAsync(CancellationToken cancellationToken = default);

	Task<int> GetUnreadCountAsync(string clubMemberId, CancellationToken cancellationToken = default);
};
public interface IFormatRepository : IRepository<Format>;
public interface IBookSizeRepository : IRepository<BookSize>;
public interface IBlockReasonRepository : IRepository<BlockReason>;
public interface IAgeRestrictionRepository : IRepository<AgeRestriction>;

public interface ICartRepository : IRepository<Cart>
{
    Task<Cart?> GetByMemberIdAsync(string clubMemberId, CancellationToken cancellationToken = default);
}

public interface ICartItemRepository : IRepository<CartItem>
{
    Task<IEnumerable<CartItem>> GetByCartIdAsync(int cartId, CancellationToken cancellationToken = default);
}

public interface IComplaintRepository : IRepository<Complaint>
{
    // Метод для отримання всіх скарг конкретного користувача
    Task<IEnumerable<Complaint>> GetByClubMemberIdAsync(string clubMemberId, CancellationToken cancellationToken = default);
}

public interface IBlockedIpRepository : IRepository<BlockedIp>
{
    Task<BlockedIp?> GetByIpAsync(string ipAddress, CancellationToken cancellationToken = default);
}

public interface IPlatformSettingsRepository : IRepository<PlatformSettings>
{
    Task<PlatformSettings?> GetSingletonAsync(CancellationToken cancellationToken = default);
}

public interface IActionLogRepository : IRepository<ActionLog>
{
    Task<ActionLog?> GetByIdAsync(long id, CancellationToken cancellationToken = default);

    Task<(IReadOnlyList<ActionLog> Items, int TotalCount)> GetPagedAsync(
        string? search,
        string? action,
        string? module,
        string? clubMemberId,
        string? level,
        DateTime? fromUtc,
        DateTime? toUtc,
        int page,
        int pageSize,
        CancellationToken cancellationToken = default);

    Task<ActionLogStatsRow> GetStatsAsync(
        DateTime? fromUtc,
        DateTime? toUtc,
        CancellationToken cancellationToken = default);

    Task<IReadOnlyList<ActionLog>> GetOlderThanAsync(
        DateTime cutoffUtc,
        CancellationToken cancellationToken = default);

    Task DeleteRangeByIdsAsync(
        IEnumerable<long> ids,
        CancellationToken cancellationToken = default);

    Task<ActionLogArchive?> GetCurrentArchiveAsync(
        CancellationToken cancellationToken = default);

    Task ReplaceArchiveAsync(
        ActionLogArchive archive,
        CancellationToken cancellationToken = default);
}

/// <summary>Агрегати для KPI журналу дій.</summary>
public sealed class ActionLogStatsRow
{
    public int Total { get; init; }
    public int Success { get; init; }
    public int Warning { get; init; }
    public int Error { get; init; }
    public int Info { get; init; }
    public int UniqueUsers { get; init; }
}