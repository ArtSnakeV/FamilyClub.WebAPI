using System;
using System.Collections.Generic;
using System.Text;

namespace FamilyClub.BLL.DTOs.Notification
{
	public class CreateNotificationDTO
	{
		public string Text { get; set; } = string.Empty;
		public string ClubMemberId { get; set; } = string.Empty;
        public string SenderId { get; set; } = string.Empty;
    }
}
