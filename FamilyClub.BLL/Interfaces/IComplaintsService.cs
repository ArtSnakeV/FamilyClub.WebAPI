using FamilyClub.BLL.DTOs.Complaint;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace FamilyClub.BLL.Interfaces
{
    public interface IComplaintsService
    {
        Task<IEnumerable<ComplaintsReadDto>> GetAllAsync(CancellationToken cancellationToken = default);
        Task<ComplaintsReadDto?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
        Task<ComplaintsReadDto> CreateAsync(ComplaintsCreateDto dto, CancellationToken cancellationToken = default);

        // Для оновлення скарги (наприклад, додавання нотаток або зміна статусу вирішення)
        Task<bool> UpdateAsync(int id, ComplaintsReadDto dto, CancellationToken cancellationToken = default);
        Task<bool> DeleteAsync(int id, CancellationToken cancellationToken = default);

        // Додатковий корисний метод для вибірки скарг конкретного члена клубу
        Task<IEnumerable<ComplaintsReadDto>> GetByClubMemberIdAsync(string clubMemberId, CancellationToken cancellationToken = default);

        // Image management methods
        Task<ComplaintImageDto> AddImageToComplaintAsync(int complaintId, ComplaintImageCreateDto imageDto, CancellationToken cancellationToken = default);
        Task<bool> RemoveImageFromComplaintAsync(int complaintId, int imageId, CancellationToken cancellationToken = default);
        Task<IEnumerable<ComplaintImageDto>> GetComplaintImagesAsync(int complaintId, CancellationToken cancellationToken = default);
    }
}