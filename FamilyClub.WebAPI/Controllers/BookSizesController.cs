using FamilyClub.BLL.DTOs.BookSize;
using FamilyClub.BLL.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FamilyClub.WebAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class BookSizesController : ControllerBase
	{
		private readonly IBookSizeService _bookSizeService;

		public BookSizesController(IBookSizeService bookSizeService)
		{
			_bookSizeService = bookSizeService;
		}

		// GET: api/bookSizes
		[HttpGet]
		public async Task<ActionResult<IEnumerable<BookSizeDto>>> GetAll(CancellationToken cancellationToken)
		{
			var bookSizes = await _bookSizeService.GetAllAsync(cancellationToken);
			return Ok(bookSizes);
		}

		// GET: api/bookSizes/5
		[HttpGet("{id:int}")]
		public async Task<ActionResult<BookSizeDto>> GetById(int id, CancellationToken cancellationToken)
		{
			var bookSize = await _bookSizeService.GetByIdAsync(id, cancellationToken);

			if (bookSize is null)
				return NotFound();

			return Ok(bookSize);
		}

		// POST: api/bookSizes
		[Authorize(Roles = "Admin,Manager")]
		[HttpPost]
		public async Task<IActionResult> Create([FromBody] BookSizeDto dto, CancellationToken cancellationToken)
		{
			var createdBookSize = await _bookSizeService.CreateAsync(dto, cancellationToken);
			return CreatedAtAction(nameof(GetById), new { id = createdBookSize.Id }, createdBookSize);
		}


		[Authorize(Roles = "Admin,Manager")]
		[HttpPut("{id:int}")]
		public async Task<IActionResult> Update(int id, [FromBody] BookSizeDto dto, CancellationToken cancellationToken)
		{
			var updated = await _bookSizeService.UpdateAsync(id, dto, cancellationToken);
			if (!updated)
			{
				return NotFound();
			}

			return NoContent();
		}

		// DELETE: api/formats/5
		[Authorize(Roles = "Admin,Manager")]
		[HttpDelete("{id:int}")]
		public async Task<IActionResult> Delete(int id, CancellationToken cancellationToken)
		{
			var deleted = await _bookSizeService.DeleteAsync(id, cancellationToken);

			if (!deleted)
				return NotFound();

			return NoContent();
		}
	}
}
