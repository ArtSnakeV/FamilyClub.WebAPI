using System;
using System.Collections.Generic;
using System.Text;

namespace FamilyClub.BLL.Interfaces
{
    public class ActiveSessionInfo
    {
        public string SessionId { get; set; } = string.Empty;
        public string IpAddress { get; set; } = string.Empty;
        public DateTime LastSeen { get; set; } = DateTime.UtcNow;
        public string? UserAgent { get; set; }
        public string? UserName { get; set; }
    }

    public interface IPresenceService
    {
        void Ping(string sessionId, string ipAddress, string? userAgent = null, string? userName = null);
        int GetActiveCount();
        IEnumerable<ActiveSessionInfo> GetActiveSessions();
    }
}

