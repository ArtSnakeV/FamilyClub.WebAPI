using FamilyClub.BLL.DTOs.Cart;
using FamilyClub.BLL.DTOs.CartItem;
using System;
using System.Collections.Generic;
using System.Text;

namespace FamilyClub.BLL.Interfaces
{
	public interface ICartService
	{
		Task<CartDTO?> GetByMemberIdAsync(string clubMemberId, CancellationToken cancellationToken = default);
		Task<CartDTO> GetOrCreateByMemberIdAsync(string clubMemberId, CancellationToken cancellationToken = default);
		Task<CartItemDTO> AddItemAsync(string clubMemberId, CartItemDTO dto, CancellationToken cancellationToken = default);
		Task<bool> UpdateItemQuantityAsync(string clubMemberId, int cartItemId, int quantity, CancellationToken cancellationToken = default);
		Task<bool> RemoveItemAsync(string clubMemberId, int cartItemId, CancellationToken cancellationToken = default);
		Task<bool> ClearCartAsync(string clubMemberId, CancellationToken cancellationToken = default);
	}
}
