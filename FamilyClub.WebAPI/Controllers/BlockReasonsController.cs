using FamilyClub.BLL.DTOs.BlockReason;
using FamilyClub.BLL.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FamilyClub.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlockReasonsController : ControllerBase
    {
        private readonly IBlockReasonService _blockReasonService;

        public BlockReasonsController(IBlockReasonService blockReasonService)
        {
            _blockReasonService = blockReasonService;
        }

        // GET: api/blockReasons
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BlockReasonDto>>> GetAll(CancellationToken cancellationToken)
        {
            var blockReasons = await _blockReasonService.GetAllAsync(cancellationToken);
            return Ok(blockReasons);
        }

        // GET: api/blockReasons/5
        [HttpGet("{id:int}")]
        public async Task<ActionResult<BlockReasonDto>> GetById(int id, CancellationToken cancellationToken)
        {
            var blockReason = await _blockReasonService.GetByIdAsync(id, cancellationToken);

            if (blockReason is null)
                return NotFound();

            return Ok(blockReason);
        }

        // POST: api/blockReasons
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] BlockReasonDto dto, CancellationToken cancellationToken)
        {
            var created = await _blockReasonService.CreateAsync(dto, cancellationToken);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] BlockReasonDto dto, CancellationToken cancellationToken)
        {
            var updated = await _blockReasonService.UpdateAsync(id, dto, cancellationToken);
            if (!updated)
            {
                return NotFound();
            }

            return NoContent();
        }

        // DELETE: api/blockReasons/5
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id, CancellationToken cancellationToken)
        {
            var deleted = await _blockReasonService.DeleteAsync(id, cancellationToken);

            if (!deleted)
                return NotFound();

            return NoContent();
        }
    }
}