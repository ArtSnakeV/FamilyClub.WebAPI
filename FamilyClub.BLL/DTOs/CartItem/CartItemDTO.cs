using System;
using System.Collections.Generic;
using System.Text;

namespace FamilyClub.BLL.DTOs.CartItem
{
	public class CartItemDTO
	{
		public int? Id { get; set; }

		public int CartId { get; set; }

		public int ProductId { get; set; }

		public int Quantity { get; set; }

		public string? Format { get; set; }

		public string? ProductName { get; set; }

		public decimal? ProductPrice { get; set; }
	}
}
