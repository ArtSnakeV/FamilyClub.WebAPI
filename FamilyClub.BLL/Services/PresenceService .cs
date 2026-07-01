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
        private readonly ConcurrentDictionary<string, DateTime> _sessions = new();
        private static readonly TimeSpan ActiveWindow = TimeSpan.FromSeconds(60);

        public void Ping(string sessionId)
        {
            _sessions[sessionId] = DateTime.UtcNow;
        }

        public int GetActiveCount()
        {
            var threshold = DateTime.UtcNow - ActiveWindow;
            return _sessions.Count(kv => kv.Value >= threshold);
        }
    }
}
