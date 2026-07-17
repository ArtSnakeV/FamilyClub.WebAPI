using System;
using System.Collections.Generic;
using System.Text;

namespace FamilyClubLibrary
{
    public class Cart
    {
        public int Id { get; set; }
        public required string ClubMemberId { get; set; }
        public ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();
    }
}
