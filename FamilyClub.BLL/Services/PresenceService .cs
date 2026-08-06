using FamilyClub.BLL.Interfaces;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Text;
using System.Linq;

namespace FamilyClub.BLL.Services
{
    public class PresenceService : IPresenceService
    {
        private readonly ConcurrentDictionary<string, ActiveSessionInfo> _sessions = new();
        private static readonly TimeSpan ActiveWindow = TimeSpan.FromSeconds(60);

        public void Ping(string sessionId, string ipAddress, string? userAgent = null, string? userName = null)
        {
            if (string.IsNullOrWhiteSpace(sessionId)) return;

            _sessions.AddOrUpdate(
                sessionId,
                id => new ActiveSessionInfo
                {
                    SessionId = id,
                    IpAddress = ipAddress ?? string.Empty,
                    LastSeen = DateTime.UtcNow,
                    UserAgent = userAgent,
                    UserName = userName
                },
                (id, existing) =>
                {
                    existing.IpAddress = string.IsNullOrEmpty(ipAddress) ? existing.IpAddress : ipAddress;
                    existing.LastSeen = DateTime.UtcNow;
                    if (!string.IsNullOrEmpty(userAgent)) existing.UserAgent = userAgent;
                    if (!string.IsNullOrEmpty(userName)) existing.UserName = userName;
                    return existing;
                });
        }

        public int GetActiveCount()
        {
            var threshold = DateTime.UtcNow - ActiveWindow;
            return _sessions.Values.Count(s => s.LastSeen >= threshold);
        }

        public IEnumerable<ActiveSessionInfo> GetActiveSessions()
        {
            var threshold = DateTime.UtcNow - ActiveWindow;
            return _sessions.Values
                .Where(s => s.LastSeen >= threshold)
                .OrderByDescending(s => s.LastSeen)
                .ToList();
        }
    }
}
