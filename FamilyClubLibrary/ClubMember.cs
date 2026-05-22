using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace FamilyClubLibrary
{
    public class ClubMember : IdentityUser
    {
        public string? Name { get; set; }

        public string? Surname { get; set; }

        public DateOnly? DateOfBirth { get; set; }

		// To see all orders/reviews for a specific User
		public List<Order> Orders { get; set; } = new();
        public List<Review> Reviews { get; set; } = new();

		public List<Notification> Notifications { get; set; } = new();

        public byte[]? AvatarData { get; set; }
    }
}
