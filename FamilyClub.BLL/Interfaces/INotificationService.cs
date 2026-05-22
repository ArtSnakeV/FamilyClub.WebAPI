using FamilyClub.BLL.DTOs.Notification;
using System;
using System.Collections.Generic;
using System.Text;

namespace FamilyClub.BLL.Interfaces
{
	public interface INotificationService
	{
		Task<IEnumerable<NotificationDTO>> GetAllAsync(CancellationToken cancellationToken = default);
		Task<NotificationDTO?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
		Task<NotificationDTO> CreateAsync(CreateNotificationDTO dto, CancellationToken cancellationToken = default);
		Task<bool> UpdateAsync(int id, NotificationDTO dto, CancellationToken cancellationToken = default);
		Task<bool> DeleteAsync(int id, CancellationToken cancellationToken = default);
		Task<int> GetCountAsync(CancellationToken cancellationToken = default);
		Task<int> GetUnreadCountAsync(string clubMemberId, CancellationToken cancellationToken = default);
	}
}
