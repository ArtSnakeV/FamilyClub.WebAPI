using System;
using System.Collections.Generic;
using System.Text;

namespace FamilyClub.BLL.Interfaces
{
    public interface IPresenceService
    {
        void Ping(string sessionId);
        int GetActiveCount();
    }
}
