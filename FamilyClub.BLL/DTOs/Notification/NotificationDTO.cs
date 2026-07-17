using System;
using System.Collections.Generic;
using System.Text;

namespace FamilyClub.BLL.DTOs.Notification
{
	public class NotificationDTO
	{
		public int Id { get; set; }
		public string? Text { get; set; }
		public bool IsRead { get; set; }
		public DateTime CreatedAt { get; set; }
		public string ClubMemberId { get; set; }
	}
}
