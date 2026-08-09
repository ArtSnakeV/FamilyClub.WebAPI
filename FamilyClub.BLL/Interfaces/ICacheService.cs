namespace FamilyClub.BLL.Interfaces;

public interface ICacheService
{
    /// <summary>
    /// Отримує значення з кешу за ключем.
    /// </summary>
    Task<T?> GetAsync<T>(string key, CancellationToken cancellationToken = default);

    /// <summary>
    /// Записує значення в кеш з вказаним часом життя (TTL).
    /// </summary>
    Task SetAsync<T>(string key, T value, TimeSpan? expiration = null, CancellationToken cancellationToken = default);

    /// <summary>
    /// Видаляє конкретний ключ з кешу.
    /// </summary>
    Task RemoveAsync(string key, CancellationToken cancellationToken = default);

    /// <summary>
    /// Видаляє всі ключі, що починаються з вказаного префіксу (інвалідація кешу).
    /// </summary>
    Task RemoveByPrefixAsync(string prefixKey, CancellationToken cancellationToken = default);

    /// <summary>
    /// Повертає статус підключення розподіленого кешу Redis/Memcached.
    /// </summary>
    Task<bool> IsAvailableAsync(CancellationToken cancellationToken = default);
}
