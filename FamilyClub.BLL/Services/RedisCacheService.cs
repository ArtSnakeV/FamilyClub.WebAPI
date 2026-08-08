using System.Collections.Concurrent;
using System.Text.Json;
using FamilyClub.BLL.Interfaces;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using StackExchange.Redis;

namespace FamilyClub.BLL.Services;

public class RedisCacheService : ICacheService
{
    private readonly IDistributedCache _distributedCache;
    private readonly IMemoryCache _memoryCache;
    private readonly IConnectionMultiplexer? _redisConnection;
    private readonly ILogger<RedisCacheService> _logger;
    private static readonly ConcurrentDictionary<string, byte> TrackedKeys = new();

    private static readonly JsonSerializerOptions JsonOptions = new()
    {
        PropertyNameCaseInsensitive = true,
        WriteIndented = false
    };

    public RedisCacheService(
        IDistributedCache distributedCache,
        IMemoryCache memoryCache,
        ILogger<RedisCacheService> logger,
        IConnectionMultiplexer? redisConnection = null)
    {
        _distributedCache = distributedCache;
        _memoryCache = memoryCache;
        _logger = logger;
        _redisConnection = redisConnection;
    }

    private bool IsRedisAvailable => _redisConnection is { IsConnected: true };

    public async Task<T?> GetAsync<T>(string key, CancellationToken cancellationToken = default)
    {
        // 1. Якщо Redis не підключено — читаємо з MemoryCache без затримок
        if (!IsRedisAvailable)
        {
            if (_memoryCache.TryGetValue(key, out T? localVal))
            {
                return localVal;
            }
            return default;
        }

        // 2. Якщо Redis підключено — намагаємося прочитати з Redis
        try
        {
            var cachedData = await _distributedCache.GetAsync(key, cancellationToken);
            if (cachedData is null || cachedData.Length == 0)
            {
                return default;
            }

            return JsonSerializer.Deserialize<T>(cachedData, JsonOptions);
        }
        catch (Exception ex)
        {
            _logger.LogDebug(ex, "Redis недоступний при читанні ключа {Key}. Використовується локальний IMemoryCache.", key);
            if (_memoryCache.TryGetValue(key, out T? fallbackVal))
            {
                return fallbackVal;
            }
            return default;
        }
    }

    public async Task SetAsync<T>(string key, T value, TimeSpan? expiration = null, CancellationToken cancellationToken = default)
    {
        if (value is null)
        {
            return;
        }

        var ttl = expiration ?? TimeSpan.FromMinutes(15);
        
        // Завжди зберігаємо у локальний MemoryCache для миттєвого відгуку
        _memoryCache.Set(key, value, ttl);
        TrackedKeys.TryAdd(key, 0);

        // Якщо Redis сервер не підключено — пропускаємо спробу запису в мережу
        if (!IsRedisAvailable)
        {
            return;
        }

        try
        {
            var bytes = JsonSerializer.SerializeToUtf8Bytes(value, JsonOptions);
            var options = new DistributedCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = ttl
            };

            await _distributedCache.SetAsync(key, bytes, options, cancellationToken);
        }
        catch (Exception ex)
        {
            _logger.LogDebug(ex, "Redis недоступний при запису ключа {Key}. Збережено в локальний IMemoryCache.", key);
        }
    }

    public async Task RemoveAsync(string key, CancellationToken cancellationToken = default)
    {
        _memoryCache.Remove(key);
        TrackedKeys.TryRemove(key, out _);

        if (!IsRedisAvailable)
        {
            return;
        }

        try
        {
            await _distributedCache.RemoveAsync(key, cancellationToken);
        }
        catch (Exception ex)
        {
            _logger.LogDebug(ex, "Redis недоступний при видаленні ключа {Key}.", key);
        }
    }

    public async Task RemoveByPrefixAsync(string prefixKey, CancellationToken cancellationToken = default)
    {
        var keysToRemove = TrackedKeys.Keys.Where(k => k.StartsWith(prefixKey, StringComparison.OrdinalIgnoreCase)).ToList();
        foreach (var key in keysToRemove)
        {
            _memoryCache.Remove(key);
            TrackedKeys.TryRemove(key, out _);
        }

        if (IsRedisAvailable && _redisConnection is not null)
        {
            try
            {
                var endpoints = _redisConnection.GetEndPoints();
                foreach (var endpoint in endpoints)
                {
                    var server = _redisConnection.GetServer(endpoint);
                    if (server.IsReplica) continue;

                    var keys = server.Keys(pattern: $"*{prefixKey}*").ToArray();
                    if (keys.Length > 0)
                    {
                        var db = _redisConnection.GetDatabase();
                        await db.KeyDeleteAsync(keys);
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogDebug(ex, "Redis недоступний при інвалідації за префіксом {PrefixKey}.", prefixKey);
            }
        }
    }

    public Task<bool> IsAvailableAsync(CancellationToken cancellationToken = default)
    {
        return Task.FromResult(IsRedisAvailable);
    }
}
