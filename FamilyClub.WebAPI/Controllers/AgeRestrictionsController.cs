using FamilyClub.BLL.DTOs.AgeRestriction;
using FamilyClub.BLL.DTOs.Format;
using FamilyClub.BLL.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FamilyClub.WebAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class AgeRestrictionsController : ControllerBase
	{
		private readonly IAgeRestrictionService _ageRestrictionService;

		public AgeRestrictionsController(IAgeRestrictionService ageRestrictionService)
		{
			_ageRestrictionService = ageRestrictionService;
		}

		// GET: api/ageRestrictions
		[HttpGet]
		public async Task<ActionResult<IEnumerable<AgeRestrictionDto>>> GetAll(CancellationToken cancellationToken)
		{
			var ageRestrictions = await _ageRestrictionService.GetAllAsync(cancellationToken);
			return Ok(ageRestrictions);
		}

		// GET: api/ageRestrictions/5
		[HttpGet("{id:int}")]
		public async Task<ActionResult<AgeRestrictionDto>> GetById(int id, CancellationToken cancellationToken)
		{
			var ageRestrictions = await _ageRestrictionService.GetAllAsync(cancellationToken);
			var ageRestriction = ageRestrictions.FirstOrDefault(x => x.Id == id);

			if (ageRestriction is null)
				return NotFound();

			return Ok(ageRestriction);
		}

		// POST: api/ageRestrictions
		[Authorize(Roles = "Admin,Manager")]
		[HttpPost]
		public async Task<IActionResult> Create([FromBody] AgeRestrictionDto dto, CancellationToken cancellationToken)
		{
			var createdAgeRestriction = await _ageRestrictionService.CreateAsync(dto, cancellationToken);
			return CreatedAtAction(nameof(GetById), new { id = createdAgeRestriction.Id }, createdAgeRestriction);
		}


		[Authorize(Roles = "Admin,Manager")]
		[HttpPut("{id:int}")]
		public async Task<IActionResult> Update(int id, [FromBody] AgeRestrictionDto dto, CancellationToken cancellationToken)
		{
			var updated = await _ageRestrictionService.UpdateAsync(id, dto, cancellationToken);
			if (!updated)
			{
				return NotFound();
			}

			return NoContent();
		}

		// DELETE: api/ageRestrictions/5
		[Authorize(Roles = "Admin,Manager")]
		[HttpDelete("{id:int}")]
		public async Task<IActionResult> Delete(int id, CancellationToken cancellationToken)
		{
			var deleted = await _ageRestrictionService.DeleteAsync(id, cancellationToken);

			if (!deleted)
				return NotFound();

			return NoContent();
		}
	}
}
