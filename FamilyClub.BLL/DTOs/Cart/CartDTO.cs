using FamilyClub.BLL.DTOs.CartItem;
using System;
using System.Collections.Generic;
using System.Text;

namespace FamilyClub.BLL.DTOs.Cart
{
	public class CartDTO
	{
		public int Id { get; set; }

		public string ClubMemberId { get; set; } = string.Empty;

		public List<CartItemDTO> CartItems { get; set; } = new();
	}
}
