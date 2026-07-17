using FamilyClub.BLL.DTOs.Translator;
using FamilyClub.BLL.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace FamilyClub.WebAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TranslatorsController : ControllerBase
{
    private readonly ITranslatorService _translatorService;

    public TranslatorsController(ITranslatorService translatorService)
    {
        _translatorService = translatorService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TranslatorDto>>> GetAll(CancellationToken cancellationToken)
    {
        var translators = await _translatorService.GetAllAsync(cancellationToken);
        return Ok(translators);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<TranslatorDto>> GetById(int id, CancellationToken cancellationToken)
    {
        var translator = await _translatorService.GetByIdAsync(id, cancellationToken);
        if (translator is null)
        {
            return NotFound();
        }

        return Ok(translator);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] TranslatorDto dto, CancellationToken cancellationToken)
    {
        var createdTranslator = await _translatorService.CreateAsync(dto, cancellationToken);
        return CreatedAtAction(nameof(GetById), new { id = createdTranslator.Id }, createdTranslator);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] TranslatorDto dto, CancellationToken cancellationToken)
    {
        var updated = await _translatorService.UpdateAsync(id, dto, cancellationToken);
        if (!updated)
        {
            return NotFound();
        }

        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id, CancellationToken cancellationToken)
    {
        var deleted = await _translatorService.DeleteAsync(id, cancellationToken);
        if (!deleted)
        {
            return NotFound();
        }

        return NoContent();
    }
}