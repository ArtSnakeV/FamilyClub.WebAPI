using FamilyClub.BLL.DTOs.Category;
using FamilyClub.BLL.Interfaces;
using FamilyClub.WebAPI.Controllers;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace FamilyClub.WebAPI.Tests.Controllers
{
    public class CategoriesControllerTests
    {
        private readonly Mock<ICategoryService> _categoryServiceMock;
        private readonly CategoriesController _controller;

        public CategoriesControllerTests()
        {
            _categoryServiceMock = new Mock<ICategoryService>();
            _controller = new CategoriesController(_categoryServiceMock.Object);
        }

        [Fact]
        public async Task GetAll_ReturnsOkResultWithCategories()
        {
            // Arrange
            var categories = new List<CategoryDto>
            {
                new CategoryDto { Id = 1, CategoryName = "Category 1" },
                new CategoryDto { Id = 2, CategoryName = "Category 2" }
            };

            _categoryServiceMock.Setup(s => s.GetAllAsync(It.IsAny<CancellationToken>()))
                .ReturnsAsync(categories);

            // Act
            var actionResult = await _controller.GetAll(CancellationToken.None);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            var resultCategories = Assert.IsAssignableFrom<IEnumerable<CategoryDto>>(okResult.Value);
            Assert.Equal(2, resultCategories.Count());
        }

        [Fact]
        public async Task GetById_WhenCategoryExists_ReturnsOkWithCategory()
        {
            // Arrange
            var category = new CategoryDto { Id = 1, CategoryName = "Fiction" };
            _categoryServiceMock.Setup(s => s.GetByIdAsync(1, It.IsAny<CancellationToken>()))
                .ReturnsAsync(category);

            // Act
            var actionResult = await _controller.GetById(1, CancellationToken.None);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            var returnCategory = Assert.IsType<CategoryDto>(okResult.Value);
            Assert.Equal(1, returnCategory.Id);
            Assert.Equal("Fiction", returnCategory.CategoryName);
        }

        [Fact]
        public async Task GetById_WhenCategoryDoesNotExist_ReturnsNotFound()
        {
            // Arrange
            _categoryServiceMock.Setup(s => s.GetByIdAsync(999, It.IsAny<CancellationToken>()))
                .ReturnsAsync((CategoryDto?)null);

            // Act
            var actionResult = await _controller.GetById(999, CancellationToken.None);

            // Assert
            Assert.IsType<NotFoundResult>(actionResult.Result);
        }

        [Fact]
        public async Task Create_ReturnsCreatedAtActionWithCategory()
        {
            // Arrange
            var dto = new CategoryDto { CategoryName = "Sci-Fi" };
            var created = new CategoryDto { Id = 5, CategoryName = "Sci-Fi" };

            _categoryServiceMock.Setup(s => s.CreateAsync(dto, It.IsAny<CancellationToken>()))
                .ReturnsAsync(created);

            // Act
            var result = await _controller.Create(dto, CancellationToken.None);

            // Assert
            var createdResult = Assert.IsType<CreatedAtActionResult>(result);
            Assert.Equal(nameof(CategoriesController.GetById), createdResult.ActionName);
            Assert.Equal(5, createdResult.RouteValues?["id"]);
            Assert.Equal(created, createdResult.Value);
        }

        [Fact]
        public async Task Update_WhenCategoryExists_ReturnsNoContent()
        {
            // Arrange
            var dto = new CategoryDto { CategoryName = "Updated" };
            _categoryServiceMock.Setup(s => s.UpdateAsync(1, dto, It.IsAny<CancellationToken>()))
                .ReturnsAsync(true);

            // Act
            var result = await _controller.Update(1, dto, CancellationToken.None);

            // Assert
            Assert.IsType<NoContentResult>(result);
        }

        [Fact]
        public async Task Delete_WhenCategoryExists_ReturnsNoContent()
        {
            // Arrange
            _categoryServiceMock.Setup(s => s.DeleteAsync(1, It.IsAny<CancellationToken>()))
                .ReturnsAsync(true);

            // Act
            var result = await _controller.Delete(1, CancellationToken.None);

            // Assert
            Assert.IsType<NoContentResult>(result);
        }
    }
}
