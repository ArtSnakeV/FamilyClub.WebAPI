using FamilyClub.DAL.EF.DB;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FamilyClub.WebAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize(Roles = "Admin")]
public class AdminSeedController : ControllerBase
{
	private readonly IServiceProvider _serviceProvider;
	private readonly IConfiguration _configuration;

	public AdminSeedController(IServiceProvider serviceProvider, IConfiguration configuration)
	{
		_serviceProvider = serviceProvider;
		_configuration = configuration;
	}

	/// <summary>
	/// Idempotent seed of catalog books/authors from product_images/seed-catalog.json.
	/// Skips entities that already exist (by name / ISBN). Does not wipe the database.
	/// </summary>
	[HttpPost("catalog")]
	[RequestSizeLimit(100_000_000)]
	public async Task<ActionResult<SeedCatalogResult>> SeedCatalog(CancellationToken cancellationToken)
	{
		// Seed is CPU/IO heavy; honor cancellation between phases via linked token if needed later.
		cancellationToken.ThrowIfCancellationRequested();

		var result = await DbInitializer.SeedCatalogIdempotentAsync(_serviceProvider, _configuration);
		if (!result.Success)
		{
			return BadRequest(result);
		}

		return Ok(result);
	}
}
