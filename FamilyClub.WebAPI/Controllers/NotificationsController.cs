using FamilyClub.BLL.DTOs.Author;
using FamilyClub.BLL.DTOs.Notification;
using FamilyClub.BLL.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FamilyClub.WebAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class NotificationsController : ControllerBase
	{
		private readonly INotificationService _notificationService;

		public NotificationsController(INotificationService notificationService)
		{
			_notificationService = notificationService;
		}

		// GET: api/<NotificationsController>
		[HttpGet]
		public async Task<ActionResult<IEnumerable<NotificationDTO>>> GetAll(CancellationToken cancellationToken)
		{
			var notifications = await _notificationService.GetAllAsync(cancellationToken);
			return Ok(notifications);
		}

		// GET api/<NotificationsController>/5
		[HttpGet("{id:int}")]
		public async Task<ActionResult<NotificationDTO>> GetById(int id, CancellationToken cancellationToken)
		{
			var notification = await _notificationService.GetByIdAsync(id, cancellationToken);
			if (notification is null)
			{
				return NotFound();
			}

			return Ok(notification);
		}

		// POST api/<NotificationsController>
		[HttpPost]
		public async Task<IActionResult> Create([FromBody] CreateNotificationDTO dto, CancellationToken cancellationToken)
		{
			var createdNotification = await _notificationService.CreateAsync(dto, cancellationToken);
			return CreatedAtAction(nameof(GetById), new { id = createdNotification.Id }, createdNotification);
		}

		// PUT api/<NotificationsController>/5
		[HttpPut("{id:int}")]
		public async Task<IActionResult> Update(int id, [FromBody] NotificationDTO dto, CancellationToken cancellationToken)
		{
			var updated = await _notificationService.UpdateAsync(id, dto, cancellationToken);
			if (!updated)
			{
				return NotFound();
			}

			return NoContent();
		}

		// DELETE api/<NotificationsController>/5
		[HttpDelete("{id:int}")]
		public async Task<IActionResult> Delete(int id, CancellationToken cancellationToken)
		{
			var deleted = await _notificationService.DeleteAsync(id, cancellationToken);
			if (!deleted)
			{
				return NotFound();
			}

			return NoContent();
		}

		// TOTAL COUNT
		[HttpGet("count")]
		public async Task<ActionResult<int>> GetCount(CancellationToken cancellationToken)
		{
			var count = await _notificationService.GetCountAsync(cancellationToken);
			return Ok(count);
		}

		// UNREAD COUNT
		[HttpGet("unread-count/{clubMemberId}")]
		public async Task<ActionResult<int>> GetUnreadCount(string clubMemberId, CancellationToken cancellationToken)
		{
			var count = await _notificationService.GetUnreadCountAsync(clubMemberId, cancellationToken);
			return Ok(count);
		}
	}
}
