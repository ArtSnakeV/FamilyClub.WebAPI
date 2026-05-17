using System;
using System.Collections.Generic;
using System.Text;

namespace FamilyClubLibrary
{
	public class Notification
	{
		public int Id { get; set; }

		public string Text { get; set; } = string.Empty;

		public bool IsRead { get; set; } = false;

		public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

		public string ClubMemberId { get; set; } = string.Empty;
		public ClubMember ClubMember { get; set; } = null!;
	}
}
