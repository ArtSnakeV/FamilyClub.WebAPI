using FamilyClub.BLL.DTOs.Promotion;
using FamilyClub.BLL.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace FamilyClub.WebAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PromotionsController : ControllerBase
{
    private readonly IPromotionService _promotionService;

    public PromotionsController(IPromotionService promotionService)
    {
        _promotionService = promotionService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<PromotionDto>>> GetAll(CancellationToken cancellationToken)
    {
        var promotions = await _promotionService.GetAllAsync(cancellationToken);
        return Ok(promotions);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<PromotionDto>> GetById(int id, CancellationToken cancellationToken)
    {
        var promotion = await _promotionService.GetByIdAsync(id, cancellationToken);
        if (promotion is null)
        {
            return NotFound();
        }

        return Ok(promotion);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] PromotionDto dto, CancellationToken cancellationToken)
    {
        var createdPromotion = await _promotionService.CreateAsync(dto, cancellationToken);
        return CreatedAtAction(nameof(GetById), new { id = createdPromotion.Id }, createdPromotion);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] PromotionDto dto, CancellationToken cancellationToken)
    {
        var updated = await _promotionService.UpdateAsync(id, dto, cancellationToken);
        if (!updated)
        {
            return NotFound();
        }

        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id, CancellationToken cancellationToken)
    {
        var deleted = await _promotionService.DeleteAsync(id, cancellationToken);
        if (!deleted)
        {
            return NotFound();
        }

        return NoContent();
    }
}