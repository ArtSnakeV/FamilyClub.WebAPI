using FamilyClub.BLL.DTOs.Complaint;
using FamilyClub.BLL.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FamilyClub.WebAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ComplaintsController : ControllerBase
{
    private readonly IComplaintsService _complaintsService;

    public ComplaintsController(IComplaintsService complaintsService)
    {
        _complaintsService = complaintsService;
    }

    /// <summary>
    /// Get all complaints (Admin only)
    /// </summary>
    [HttpGet]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<IEnumerable<ComplaintsReadDto>>> GetAll(CancellationToken cancellationToken)
    {
        var complaints = await _complaintsService.GetAllAsync(cancellationToken);
        return Ok(complaints);
    }

    /// <summary>
    /// Get complaint by ID
    /// </summary>
    [HttpGet("{id:int}")]
    public async Task<ActionResult<ComplaintsReadDto>> GetById(int id, CancellationToken cancellationToken)
    {
        var complaint = await _complaintsService.GetByIdAsync(id, cancellationToken);
        if (complaint is null)
        {
            return NotFound($"Complaint with ID {id} not found.");
        }

        return Ok(complaint);
    }

    /// <summary>
    /// Get complaints by club member ID
    /// </summary>
    [HttpGet("by-member/{clubMemberId}")]
    public async Task<ActionResult<IEnumerable<ComplaintsReadDto>>> GetByClubMember(string clubMemberId, CancellationToken cancellationToken)
    {
        var complaints = await _complaintsService.GetByClubMemberIdAsync(clubMemberId, cancellationToken);
        return Ok(complaints);
    }

    /// <summary>
    /// Create a new complaint
    /// </summary>
    [HttpPost]
    //[Authorize] // Commented out for testing - REMEMBER TO UNCOMMENT IN PRODUCTION!
    public async Task<IActionResult> Create([FromBody] ComplaintsCreateDto dto, CancellationToken cancellationToken)
    {
        try
        {
            var createdComplaint = await _complaintsService.CreateAsync(dto, cancellationToken);
            return CreatedAtAction(nameof(GetById), new { id = createdComplaint.Id }, createdComplaint);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    /// <summary>
    /// Update complaint (Admin only - for resolving complaints)
    /// </summary>
    [HttpPut("{id:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Update(int id, [FromBody] ComplaintsReadDto dto, CancellationToken cancellationToken)
    {
        var updated = await _complaintsService.UpdateAsync(id, dto, cancellationToken);
        if (!updated)
        {
            return NotFound($"Complaint with ID {id} not found.");
        }

        return NoContent();
    }

    /// <summary>
    /// Delete complaint (Admin only)
    /// </summary>
    [HttpDelete("{id:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id, CancellationToken cancellationToken)
    {
        var deleted = await _complaintsService.DeleteAsync(id, cancellationToken);
        if (!deleted)
        {
            return NotFound($"Complaint with ID {id} not found.");
        }

        return NoContent();
    }

    // Image management endpoints

    /// <summary>
    /// Get all images for a specific complaint
    /// </summary>
    [HttpGet("{complaintId:int}/images")]
    public async Task<ActionResult<IEnumerable<ComplaintImageDto>>> GetComplaintImages(int complaintId, CancellationToken cancellationToken)
    {
        var images = await _complaintsService.GetComplaintImagesAsync(complaintId, cancellationToken);
        return Ok(images);
    }

    /// <summary>
    /// Add an image to a complaint
    /// </summary>
    [HttpPost("{complaintId:int}/images")]
    [Authorize]
    public async Task<IActionResult> AddImage(int complaintId, [FromBody] ComplaintImageCreateDto imageDto, CancellationToken cancellationToken)
    {
        try
        {
            var createdImage = await _complaintsService.AddImageToComplaintAsync(complaintId, imageDto, cancellationToken);
            return Ok(createdImage);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    /// <summary>
    /// Remove an image from a complaint
    /// </summary>
    [HttpDelete("{complaintId:int}/images/{imageId:int}")]
    [Authorize]
    public async Task<IActionResult> RemoveImage(int complaintId, int imageId, CancellationToken cancellationToken)
    {
        var removed = await _complaintsService.RemoveImageFromComplaintAsync(complaintId, imageId, cancellationToken);
        if (!removed)
        {
            return NotFound($"Image with ID {imageId} not found in complaint {complaintId}.");
        }

        return NoContent();
    }
}
