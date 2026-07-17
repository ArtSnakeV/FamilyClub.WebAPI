using FamilyClub.BLL.DTOs.Category;
using FamilyClub.BLL.DTOs.Notification;
using FamilyClub.BLL.Interfaces;
using FamilyClub.DAL.Interfaces;
using FamilyClubLibrary;
using System;
using System.Collections.Generic;
using System.Text;

namespace FamilyClub.BLL.Services
{
	public class NotificationService : INotificationService
	{
		private readonly INotificationRepository _notificationRepository;
		private readonly IUnitOfWork _unitOfWork;

		public NotificationService(INotificationRepository notificationRepository, IUnitOfWork unitOfWork)
		{
			_notificationRepository = notificationRepository;
			_unitOfWork = unitOfWork;
		}

		public async Task<IEnumerable<NotificationDTO>> GetAllAsync(CancellationToken cancellationToken = default)
		{
			var notifications = await _notificationRepository.GetAllAsync(cancellationToken);
			return notifications.Select(MapToReadDto);
		}

		public async Task<NotificationDTO?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
		{
			var notification = await _notificationRepository.GetByIdAsync(id, cancellationToken);
			return notification is null ? null : MapToReadDto(notification);
		}

		public async Task<NotificationDTO> CreateAsync(CreateNotificationDTO dto, CancellationToken cancellationToken = default)
		{
			var notification = new Notification
			{
				Text = dto.Text,
				ClubMemberId = dto.ClubMemberId,
				IsRead = false,
				CreatedAt = DateTime.UtcNow
			};

			await _notificationRepository.AddAsync(notification, cancellationToken);
			await _unitOfWork.SaveChangesAsync(cancellationToken);

			return MapToReadDto(notification);
		}

		public async Task<bool> UpdateAsync(int id, NotificationDTO dto, CancellationToken cancellationToken = default)
		{
			var notification = await _notificationRepository.GetByIdAsync(id, cancellationToken);
			if (notification is null)
				return false;

			notification.Text = dto.Text;
			notification.IsRead = dto.IsRead;

			_notificationRepository.Update(notification);
			await _unitOfWork.SaveChangesAsync(cancellationToken);

			return true;
		}

		public async Task<bool> DeleteAsync(int id, CancellationToken cancellationToken = default)
		{
			var notification = await _notificationRepository.GetByIdAsync(id, cancellationToken);
			if (notification is null)
			{
				return false;
			}

			_notificationRepository.Delete(notification);
			await _unitOfWork.SaveChangesAsync(cancellationToken);

			return true;
		}

		// TOTAL COUNT (всі повідомлення)
		public Task<int> GetCountAsync(CancellationToken cancellationToken = default)
		{
			return _notificationRepository.GetCountAsync(cancellationToken);
		}

		// UNREAD COUNT (непрочитані)
		public Task<int> GetUnreadCountAsync(string clubMemberId, CancellationToken cancellationToken = default)
		{
			return _notificationRepository.GetUnreadCountAsync(clubMemberId, cancellationToken);
		}
		private static NotificationDTO MapToReadDto(Notification notification)
		{
			return new NotificationDTO
			{
				Id = notification.Id,
				Text = notification.Text,
				IsRead = notification.IsRead,
				CreatedAt = notification.CreatedAt,
				ClubMemberId = notification.ClubMemberId
			};
		}
	}
}
