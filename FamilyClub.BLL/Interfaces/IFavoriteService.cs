using FamilyClub.BLL.DTOs.Product;
using System;
using System.Collections.Generic;
using System.Text;

namespace FamilyClub.BLL.Interfaces
{
    public interface IFavoriteService
    {
        Task<IEnumerable<ProductDto>> GetFavoritesAsync(string memberId, CancellationToken cancellationToken = default);
        Task AddFavoriteAsync(string memberId, int productId, CancellationToken cancellationToken = default);
        Task RemoveFavoriteAsync(string memberId, int productId, CancellationToken cancellationToken = default);
        Task<bool> IsFavoriteAsync(string memberId, int productId, CancellationToken cancellationToken = default);
    }
}
