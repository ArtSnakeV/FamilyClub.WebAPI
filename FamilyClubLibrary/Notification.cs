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
        // Власник треду (з ким листується адмін)
        public string ClubMemberId { get; set; } = string.Empty;
		public ClubMember ClubMember { get; set; } = null!;
        // Хто фактично написав це повідомлення (може дорівнювати ClubMemberId,
        // якщо написав сам користувач, або бути іншим Id, якщо написав адмін)
        public string? SenderId { get; set; } = string.Empty;
        public ClubMember? Sender { get; set; } = null!;
    }
}
