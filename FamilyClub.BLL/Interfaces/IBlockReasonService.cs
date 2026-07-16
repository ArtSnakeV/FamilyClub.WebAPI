using FamilyClub.BLL.DTOs.BlockReason;
using FamilyClub.BLL.DTOs.BookSize;
using System;
using System.Collections.Generic;
using System.Text;

namespace FamilyClub.BLL.Interfaces
{
    public interface IBlockReasonService
    {
        Task<IEnumerable<BlockReasonDto>> GetAllAsync(CancellationToken cancellationToken = default);
        Task<BlockReasonDto?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
        Task<BlockReasonDto> CreateAsync(BlockReasonDto dto, CancellationToken cancellationToken = default);
        Task<bool> UpdateAsync(int id, BlockReasonDto dto, CancellationToken cancellationToken = default);
        Task<bool> DeleteAsync(int id, CancellationToken cancellationToken = default);
    }
}
