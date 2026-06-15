using FamilyClub.BLL.DTOs.Cart;
using FamilyClub.BLL.DTOs.CartItem;
using FamilyClub.BLL.Interfaces;
using FamilyClub.DAL.Interfaces;
using FamilyClubLibrary;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace FamilyClub.BLL.Services
{
	public class CartService : ICartService
	{
		private readonly ICartRepository _cartRepository;
		private readonly ICartItemRepository _cartItemRepository;
		private readonly IUnitOfWork _unitOfWork;

		public CartService(ICartRepository cartRepository, ICartItemRepository cartItemRepository, IUnitOfWork unitOfWork)
		{
			_cartRepository = cartRepository;
			_cartItemRepository = cartItemRepository;
			_unitOfWork = unitOfWork;
		}

		public async Task<CartDTO?> GetByMemberIdAsync(string clubMemberId, CancellationToken cancellationToken = default)
		{
			var cart = await _cartRepository.GetByMemberIdAsync(clubMemberId, cancellationToken);
			return cart is null ? null : MapToDto(cart);
		}

		public async Task<CartDTO> GetOrCreateByMemberIdAsync(string clubMemberId, CancellationToken cancellationToken = default)
		{
			var cart = await _cartRepository.GetByMemberIdAsync(clubMemberId, cancellationToken);
			if (cart is null)
			{
				cart = new Cart
				{
					ClubMemberId = clubMemberId
				};
				await _cartRepository.AddAsync(cart, cancellationToken);
				await _unitOfWork.SaveChangesAsync(cancellationToken);

				// Reload with includes
				cart = await _cartRepository.GetByMemberIdAsync(clubMemberId, cancellationToken);
			}

			return MapToDto(cart!);
		}

		public async Task<CartItemDTO> AddItemAsync(string clubMemberId, CartItemDTO dto, CancellationToken cancellationToken = default)
		{
			var cart = await _cartRepository.GetByMemberIdAsync(clubMemberId, cancellationToken);
			if (cart is null)
			{
				cart = new Cart
				{
					ClubMemberId = clubMemberId
				};
				await _cartRepository.AddAsync(cart, cancellationToken);
				await _unitOfWork.SaveChangesAsync(cancellationToken);
			}

			// Check if item already exists in cart with the same format
			var existingItem = cart.CartItems.FirstOrDefault(ci => ci.ProductId == dto.ProductId && ci.Format == dto.Format);
			if (existingItem is not null)
			{
				existingItem.Quantity += dto.Quantity;
				_cartItemRepository.Update(existingItem);
				await _unitOfWork.SaveChangesAsync(cancellationToken);

				return MapItemToDto(existingItem);
			}

			var cartItem = new CartItem
			{
				CartId = cart.Id,
				ProductId = dto.ProductId,
				Quantity = dto.Quantity,
				Format = dto.Format
			};

			await _cartItemRepository.AddAsync(cartItem, cancellationToken);
			await _unitOfWork.SaveChangesAsync(cancellationToken);

			return MapItemToDto(cartItem);
		}

		public async Task<bool> UpdateItemQuantityAsync(string clubMemberId, int cartItemId, int quantity, CancellationToken cancellationToken = default)
		{
			var cart = await _cartRepository.GetByMemberIdAsync(clubMemberId, cancellationToken);
			if (cart is null) return false;

			var cartItem = cart.CartItems.FirstOrDefault(ci => ci.Id == cartItemId);
			if (cartItem is null) return false;

			if (quantity <= 0)
			{
				_cartItemRepository.Delete(cartItem);
			}
			else
			{
				cartItem.Quantity = quantity;
				_cartItemRepository.Update(cartItem);
			}

			await _unitOfWork.SaveChangesAsync(cancellationToken);
			return true;
		}

		public async Task<bool> RemoveItemAsync(string clubMemberId, int cartItemId, CancellationToken cancellationToken = default)
		{
			var cart = await _cartRepository.GetByMemberIdAsync(clubMemberId, cancellationToken);
			if (cart is null) return false;

			var cartItem = cart.CartItems.FirstOrDefault(ci => ci.Id == cartItemId);
			if (cartItem is null) return false;

			_cartItemRepository.Delete(cartItem);
			await _unitOfWork.SaveChangesAsync(cancellationToken);

			return true;
		}

		public async Task<bool> ClearCartAsync(string clubMemberId, CancellationToken cancellationToken = default)
		{
			var cart = await _cartRepository.GetByMemberIdAsync(clubMemberId, cancellationToken);
			if (cart is null) return false;

			_cartItemRepository.DeleteRange(cart.CartItems);
			await _unitOfWork.SaveChangesAsync(cancellationToken);

			return true;
		}

		private static CartDTO MapToDto(Cart cart)
		{
			return new CartDTO
			{
				Id = cart.Id,
				ClubMemberId = cart.ClubMemberId,
				CartItems = cart.CartItems.Select(MapItemToDto).ToList()
			};
		}

		private static CartItemDTO MapItemToDto(CartItem item)
		{
			return new CartItemDTO
			{
				Id = item.Id,
				CartId = item.CartId,
				ProductId = item.ProductId,
				Quantity = item.Quantity,
				Format = item.Format,
				ProductName = item.Product?.ProductName,
				ProductPrice = item.Product?.Price
			};
		}
	}
}
