using FamilyClub.BLL.DTOs.CartItem;
using FamilyClub.BLL.Services;
using FamilyClub.DAL.Interfaces;
using FamilyClubLibrary;
using Moq;
using Xunit;

namespace FamilyClub.BLL.Tests.Services
{
    public class CartServiceTests
    {
        private readonly Mock<ICartRepository> _cartRepoMock;
        private readonly Mock<ICartItemRepository> _cartItemRepoMock;
        private readonly Mock<IUnitOfWork> _unitOfWorkMock;
        private readonly CartService _cartService;

        public CartServiceTests()
        {
            _cartRepoMock = new Mock<ICartRepository>();
            _cartItemRepoMock = new Mock<ICartItemRepository>();
            _unitOfWorkMock = new Mock<IUnitOfWork>();

            _cartService = new CartService(
                _cartRepoMock.Object,
                _cartItemRepoMock.Object,
                _unitOfWorkMock.Object);
        }

        [Fact]
        public async Task GetByMemberIdAsync_WhenCartExists_ReturnsMappedCartDTO()
        {
            // Arrange
            var cart = new Cart
            {
                Id = 1,
                ClubMemberId = "user-123",
                CartItems = new List<CartItem>
                {
                    new CartItem { Id = 10, CartId = 1, ProductId = 100, Quantity = 2, Format = "Paperback" }
                }
            };

            _cartRepoMock.Setup(r => r.GetByMemberIdAsync("user-123", It.IsAny<CancellationToken>()))
                .ReturnsAsync(cart);

            // Act
            var result = await _cartService.GetByMemberIdAsync("user-123");

            // Assert
            Assert.NotNull(result);
            Assert.Equal("user-123", result.ClubMemberId);
            Assert.Single(result.CartItems);
            Assert.Equal(100, result.CartItems[0].ProductId);
            Assert.Equal(2, result.CartItems[0].Quantity);
        }

        [Fact]
        public async Task AddItemAsync_WhenItemNew_AddsCartItem()
        {
            // Arrange
            var cart = new Cart
            {
                Id = 1,
                ClubMemberId = "user-123",
                CartItems = new List<CartItem>()
            };

            _cartRepoMock.Setup(r => r.GetByMemberIdAsync("user-123", It.IsAny<CancellationToken>()))
                .ReturnsAsync(cart);

            var dto = new CartItemDTO
            {
                ProductId = 5,
                Quantity = 1,
                Format = "Hardcover"
            };

            // Act
            var result = await _cartService.AddItemAsync("user-123", dto);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(5, result.ProductId);
            Assert.Equal("Hardcover", result.Format);
            _cartItemRepoMock.Verify(r => r.AddAsync(It.Is<CartItem>(ci => ci.ProductId == 5 && ci.Quantity == 1), It.IsAny<CancellationToken>()), Times.Once);
            _unitOfWorkMock.Verify(u => u.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);
        }

        [Fact]
        public async Task AddItemAsync_WhenItemExistsWithSameFormat_IncrementsQuantity()
        {
            // Arrange
            var existingItem = new CartItem { Id = 15, CartId = 1, ProductId = 5, Quantity = 2, Format = "Hardcover" };
            var cart = new Cart
            {
                Id = 1,
                ClubMemberId = "user-123",
                CartItems = new List<CartItem> { existingItem }
            };

            _cartRepoMock.Setup(r => r.GetByMemberIdAsync("user-123", It.IsAny<CancellationToken>()))
                .ReturnsAsync(cart);

            var dto = new CartItemDTO
            {
                ProductId = 5,
                Quantity = 3,
                Format = "Hardcover"
            };

            // Act
            var result = await _cartService.AddItemAsync("user-123", dto);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(5, existingItem.Quantity);
            _cartItemRepoMock.Verify(r => r.Update(existingItem), Times.Once);
            _unitOfWorkMock.Verify(u => u.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);
        }

        [Fact]
        public async Task UpdateItemQuantityAsync_WhenQuantityZeroOrLess_DeletesItem()
        {
            // Arrange
            var item = new CartItem { Id = 10, CartId = 1, ProductId = 5, Quantity = 2 };
            var cart = new Cart
            {
                Id = 1,
                ClubMemberId = "user-123",
                CartItems = new List<CartItem> { item }
            };

            _cartRepoMock.Setup(r => r.GetByMemberIdAsync("user-123", It.IsAny<CancellationToken>()))
                .ReturnsAsync(cart);

            // Act
            var success = await _cartService.UpdateItemQuantityAsync("user-123", 10, 0);

            // Assert
            Assert.True(success);
            _cartItemRepoMock.Verify(r => r.Delete(item), Times.Once);
            _unitOfWorkMock.Verify(u => u.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);
        }

        [Fact]
        public async Task ClearCartAsync_WhenCartExists_DeletesAllItems()
        {
            // Arrange
            var items = new List<CartItem>
            {
                new CartItem { Id = 1, CartId = 1 },
                new CartItem { Id = 2, CartId = 1 }
            };
            var cart = new Cart { Id = 1, ClubMemberId = "user-123", CartItems = items };

            _cartRepoMock.Setup(r => r.GetByMemberIdAsync("user-123", It.IsAny<CancellationToken>()))
                .ReturnsAsync(cart);

            // Act
            var success = await _cartService.ClearCartAsync("user-123");

            // Assert
            Assert.True(success);
            _cartItemRepoMock.Verify(r => r.DeleteRange(items), Times.Once);
            _unitOfWorkMock.Verify(u => u.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);
        }
    }
}
