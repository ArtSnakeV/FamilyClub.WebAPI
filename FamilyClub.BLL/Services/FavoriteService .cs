using FamilyClub.BLL.DTOs.Product;
using FamilyClub.BLL.Interfaces;
using FamilyClub.DAL.EF;
using FamilyClubLibrary;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;

namespace FamilyClub.BLL.Services
{
    public class FavoriteService : IFavoriteService
    {
        private readonly FamilyClubContext _context;
        private readonly UserManager<ClubMember> _userManager;

        public FavoriteService(FamilyClubContext context, UserManager<ClubMember> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public async Task<IEnumerable<ProductDto>> GetFavoritesAsync(string memberId, CancellationToken cancellationToken = default)
        {
            return await _context.Products
                .Where(p => p.FavoritedBy.Any(u => u.Id == memberId))
                .Select(p => new ProductDto
                {
                    Id = p.Id,
                    ProductName = p.ProductName,
                    Price = p.Price,
                    DiscountPrice = p.DiscountPrice,

                    AuthorIds = p.Authors.Select(a => a.Id).ToList(),
                    CategoryIds = p.Categories.Select(c => c.Id).ToList(),
                    FormatIds = p.Formats.Select(f => f.Id).ToList(),
                })
                .ToListAsync(cancellationToken);
        }

        public async Task AddFavoriteAsync(string memberId, int productId, CancellationToken cancellationToken = default)
        {
            var member = await _context.Users
                .Include(m => m.FavoriteProducts)
                .FirstOrDefaultAsync(m => m.Id == memberId, cancellationToken);

            if (member is null) throw new Exception("Member not found");

            var product = await _context.Products.FindAsync(new object[] { productId }, cancellationToken);
            if (product is null) throw new Exception("Product not found");

            if (!member.FavoriteProducts.Any(p => p.Id == productId))
            {
                member.FavoriteProducts.Add(product);
                await _context.SaveChangesAsync(cancellationToken);
            }
        }

        public async Task RemoveFavoriteAsync(string memberId, int productId, CancellationToken cancellationToken = default)
        {
            var member = await _context.Users
                .Include(m => m.FavoriteProducts)
                .FirstOrDefaultAsync(m => m.Id == memberId, cancellationToken);

            if (member is null) throw new Exception("Member not found");

            var product = member.FavoriteProducts.FirstOrDefault(p => p.Id == productId);
            if (product is not null)
            {
                member.FavoriteProducts.Remove(product);
                await _context.SaveChangesAsync(cancellationToken);
            }
        }

        public async Task<bool> IsFavoriteAsync(string memberId, int productId, CancellationToken cancellationToken = default)
        {
            var member = await _context.Users
                .Include(m => m.FavoriteProducts)
                .FirstOrDefaultAsync(m => m.Id == memberId, cancellationToken);

            return member?.FavoriteProducts.Any(p => p.Id == productId) ?? false;
        }
    }
}
