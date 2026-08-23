using FamilyClub.BLL.DTOs.Category;
using FamilyClub.BLL.Interfaces;
using FamilyClub.BLL.Services;
using FamilyClub.DAL.Interfaces;
using FamilyClubLibrary;
using Moq;
using Xunit;

namespace FamilyClub.BLL.Tests.Services
{
    public class CategoryServiceTests
    {
        private readonly Mock<ICategoryRepository> _categoryRepoMock;
        private readonly Mock<IUnitOfWork> _unitOfWorkMock;
        private readonly Mock<ICacheService> _cacheServiceMock;
        private readonly CategoryService _categoryService;

        public CategoryServiceTests()
        {
            _categoryRepoMock = new Mock<ICategoryRepository>();
            _unitOfWorkMock = new Mock<IUnitOfWork>();
            _cacheServiceMock = new Mock<ICacheService>();

            _categoryService = new CategoryService(
                _categoryRepoMock.Object,
                _unitOfWorkMock.Object,
                _cacheServiceMock.Object);
        }

        [Fact]
        public async Task GetAllAsync_WhenCached_ReturnsCachedCategoriesWithoutQueryingRepo()
        {
            // Arrange
            var cachedCategories = new List<CategoryDto>
            {
                new CategoryDto { Id = 1, CategoryName = "Fiction" },
                new CategoryDto { Id = 2, CategoryName = "Fantasy" }
            };

            _cacheServiceMock.Setup(c => c.GetAsync<List<CategoryDto>>("categories_all", It.IsAny<CancellationToken>()))
                .ReturnsAsync(cachedCategories);

            // Act
            var result = await _categoryService.GetAllAsync();

            // Assert
            Assert.NotNull(result);
            Assert.Equal(2, result.Count());
            _categoryRepoMock.Verify(r => r.GetAllAsync(It.IsAny<CancellationToken>()), Times.Never);
        }

        [Fact]
        public async Task GetAllAsync_WhenNotCached_QueriesRepoAndSetsCache()
        {
            // Arrange
            _cacheServiceMock.Setup(c => c.GetAsync<List<CategoryDto>>("categories_all", It.IsAny<CancellationToken>()))
                .ReturnsAsync((List<CategoryDto>?)null);

            var dbCategories = new List<Category>
            {
                new Category { Id = 10, CategoryName = "History" }
            };

            _categoryRepoMock.Setup(r => r.GetAllAsync(It.IsAny<CancellationToken>()))
                .ReturnsAsync(dbCategories);

            // Act
            var result = await _categoryService.GetAllAsync();

            // Assert
            Assert.NotNull(result);
            var list = result.ToList();
            Assert.Single(list);
            Assert.Equal("History", list[0].CategoryName);

            _cacheServiceMock.Verify(c => c.SetAsync(
                "categories_all",
                It.IsAny<List<CategoryDto>>(),
                It.IsAny<TimeSpan?>(),
                It.IsAny<CancellationToken>()), Times.Once);
        }

        [Fact]
        public async Task GetByIdAsync_WhenFoundInRepo_SetsCacheAndReturnsDTO()
        {
            // Arrange
            _cacheServiceMock.Setup(c => c.GetAsync<CategoryDto>("categories_item_5", It.IsAny<CancellationToken>()))
                .ReturnsAsync((CategoryDto?)null);

            var category = new Category { Id = 5, CategoryName = "Science" };
            _categoryRepoMock.Setup(r => r.GetByIdAsync(5, It.IsAny<CancellationToken>()))
                .ReturnsAsync(category);

            // Act
            var result = await _categoryService.GetByIdAsync(5);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(5, result.Id);
            Assert.Equal("Science", result.CategoryName);

            _cacheServiceMock.Verify(c => c.SetAsync(
                "categories_item_5",
                It.Is<CategoryDto>(d => d.Id == 5 && d.CategoryName == "Science"),
                It.IsAny<TimeSpan?>(),
                It.IsAny<CancellationToken>()), Times.Once);
        }

        [Fact]
        public async Task CreateAsync_AddsCategorySavesAndInvalidatesCache()
        {
            // Arrange
            var createDto = new CategoryDto { CategoryName = "  Detective  " };

            _categoryRepoMock.Setup(r => r.AddAsync(It.IsAny<Category>(), It.IsAny<CancellationToken>()))
                .Returns(Task.CompletedTask);
            _unitOfWorkMock.Setup(u => u.SaveChangesAsync(It.IsAny<CancellationToken>()))
                .ReturnsAsync(1);

            // Act
            var result = await _categoryService.CreateAsync(createDto);

            // Assert
            Assert.NotNull(result);
            Assert.Equal("Detective", result.CategoryName);

            _categoryRepoMock.Verify(r => r.AddAsync(It.Is<Category>(c => c.CategoryName == "Detective"), It.IsAny<CancellationToken>()), Times.Once);
            _unitOfWorkMock.Verify(u => u.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);
            _cacheServiceMock.Verify(c => c.RemoveAsync("categories_all", It.IsAny<CancellationToken>()), Times.Once);
            _cacheServiceMock.Verify(c => c.RemoveByPrefixAsync("categories_", It.IsAny<CancellationToken>()), Times.Once);
        }

        [Fact]
        public async Task DeleteAsync_WhenCategoryExists_DeletesCategoryAndInvalidatesCache()
        {
            // Arrange
            var category = new Category { Id = 3, CategoryName = "Drama" };
            _categoryRepoMock.Setup(r => r.GetByIdAsync(3, It.IsAny<CancellationToken>()))
                .ReturnsAsync(category);

            // Act
            var success = await _categoryService.DeleteAsync(3);

            // Assert
            Assert.True(success);
            _categoryRepoMock.Verify(r => r.Delete(category), Times.Once);
            _unitOfWorkMock.Verify(u => u.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);
            _cacheServiceMock.Verify(c => c.RemoveAsync("categories_item_3", It.IsAny<CancellationToken>()), Times.Once);
        }
    }
}
