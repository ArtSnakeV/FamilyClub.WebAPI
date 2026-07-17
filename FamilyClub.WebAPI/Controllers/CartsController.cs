using FamilyClub.BLL.DTOs.Cart;
using FamilyClub.BLL.DTOs.CartItem;
using FamilyClub.BLL.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace FamilyClub.WebAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class CartsController : ControllerBase
	{
		private readonly ICartService _cartService;

		public CartsController(ICartService cartService)
		{
			_cartService = cartService;
		}

		// GET api/Carts/{clubMemberId}
		[HttpGet("{clubMemberId}")]
		public async Task<ActionResult<CartDTO>> GetByMemberId(string clubMemberId, CancellationToken cancellationToken)
		{
			var cart = await _cartService.GetOrCreateByMemberIdAsync(clubMemberId, cancellationToken);
			return Ok(cart);
		}

		// POST api/Carts/{clubMemberId}/items
		[HttpPost("{clubMemberId}/items")]
		public async Task<IActionResult> AddItem(string clubMemberId, [FromBody] CartItemDTO dto, CancellationToken cancellationToken)
		{
			var createdItem = await _cartService.AddItemAsync(clubMemberId, dto, cancellationToken);
			return Ok(createdItem);
		}

		// PUT api/Carts/{clubMemberId}/items/{cartItemId}
		[HttpPut("{clubMemberId}/items/{cartItemId:int}")]
		public async Task<IActionResult> UpdateItemQuantity(string clubMemberId, int cartItemId, [FromBody] int quantity, CancellationToken cancellationToken)
		{
			var updated = await _cartService.UpdateItemQuantityAsync(clubMemberId, cartItemId, quantity, cancellationToken);
			if (!updated)
			{
				return NotFound();
			}

			return NoContent();
		}

		// DELETE api/Carts/{clubMemberId}/items/{cartItemId}
		[HttpDelete("{clubMemberId}/items/{cartItemId:int}")]
		public async Task<IActionResult> RemoveItem(string clubMemberId, int cartItemId, CancellationToken cancellationToken)
		{
			var removed = await _cartService.RemoveItemAsync(clubMemberId, cartItemId, cancellationToken);
			if (!removed)
			{
				return NotFound();
			}

			return NoContent();
		}

		// DELETE api/Carts/{clubMemberId}
		[HttpDelete("{clubMemberId}")]
		public async Task<IActionResult> ClearCart(string clubMemberId, CancellationToken cancellationToken)
		{
			var cleared = await _cartService.ClearCartAsync(clubMemberId, cancellationToken);
			if (!cleared)
			{
				return NotFound();
			}

			return NoContent();
		}
	}
}
