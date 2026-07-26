using FamilyClub.BLL.DTOs.BlockReason;
using FamilyClub.BLL.Interfaces;
using FamilyClub.DAL.Interfaces;
using FamilyClubLibrary;
using System;
using System.Collections.Generic;
using System.Text;

namespace FamilyClub.BLL.Services
{
    public class BlockReasonService: IBlockReasonService
    {
        private readonly IBlockReasonRepository _blockReasonRepository;
        private readonly IUnitOfWork _unitOfWork;

        public BlockReasonService(IBlockReasonRepository blockReasonRepository, IUnitOfWork unitOfWork)
        {
            _blockReasonRepository = blockReasonRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<BlockReasonDto>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            var blockReasons = await _blockReasonRepository.GetAllAsync(cancellationToken);
            return blockReasons.Select(MapToReadDto);
        }

        public async Task<BlockReasonDto?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
        {
            var blockReason = await _blockReasonRepository.GetByIdAsync(id, cancellationToken);
            return blockReason is null ? null : MapToReadDto(blockReason);
        }

        public async Task<BlockReasonDto> CreateAsync(BlockReasonDto dto, CancellationToken cancellationToken = default)
        {
            var blockReason = new BlockReason
            {
                Name = dto.Name.Trim(),
                Description = dto.Description,
            };

            await _blockReasonRepository.AddAsync(blockReason, cancellationToken);
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return MapToReadDto(blockReason);
        }

        public async Task<bool> UpdateAsync(int id, BlockReasonDto dto, CancellationToken cancellationToken = default)
        {
            var blockReason = await _blockReasonRepository.GetByIdAsync(id, cancellationToken);
            if (blockReason is null)
            {
                return false;
            }

            blockReason.Name = dto.Name.Trim();
            blockReason.Description = dto.Description?.Trim();

            _blockReasonRepository.Update(blockReason);
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return true;
        }

        public async Task<bool> DeleteAsync(int id, CancellationToken cancellationToken = default)
        {
            var blockReason = await _blockReasonRepository.GetByIdAsync(id, cancellationToken);
            if (blockReason is null)
            {
                return false;
            }

            _blockReasonRepository.Delete(blockReason);
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return true;
        }

        private static BlockReasonDto MapToReadDto(BlockReason blockReason)
        {
            return new BlockReasonDto
            {
                Id = blockReason.Id,
                Name = blockReason.Name,
                Description = blockReason.Description,
            };
        }
    }
}