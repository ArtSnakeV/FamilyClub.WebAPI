using FamilyClub.BLL.DTOs.Product;
using FamilyClub.BLL.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FamilyClub.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavoritesController : ControllerBase
    {
        private readonly IFavoriteService _favoriteService;

        public FavoritesController(IFavoriteService favoriteService)
        {
            _favoriteService = favoriteService;
        }

        private string? GetCurrentUserId() =>
            User.FindFirstValue(ClaimTypes.NameIdentifier)
    ?? User.FindFirstValue("sub");

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetFavorites(CancellationToken cancellationToken)
        {
            var memberId = GetCurrentUserId();
            if (memberId is null) return Unauthorized();

            var favorites = await _favoriteService.GetFavoritesAsync(memberId, cancellationToken);
            return Ok(favorites);
        }

        [HttpPost("{productId:int}")]
        public async Task<ActionResult> AddFavorite(int productId, CancellationToken cancellationToken)
        {
            var memberId = GetCurrentUserId();
            if (memberId is null) return Unauthorized();

            await _favoriteService.AddFavoriteAsync(memberId, productId, cancellationToken);
            return Ok();
        }

        [HttpDelete("{productId:int}")]
        public async Task<ActionResult> RemoveFavorite(int productId, CancellationToken cancellationToken)
        {
            var memberId = GetCurrentUserId();
            if (memberId is null) return Unauthorized();

            await _favoriteService.RemoveFavoriteAsync(memberId, productId, cancellationToken);
            return NoContent();
        }

        [HttpGet("{productId:int}/is-favorite")]
        public async Task<ActionResult<bool>> IsFavorite(int productId, CancellationToken cancellationToken)
        {
            var memberId = GetCurrentUserId();
            if (memberId is null) return Unauthorized();

            var result = await _favoriteService.IsFavoriteAsync(memberId, productId, cancellationToken);
            return Ok(result);
        }
    }
}
