using FamilyClub.BLL.DTOs.Format;
using FamilyClub.BLL.DTOs.Language;
using FamilyClub.BLL.Interfaces;
using FamilyClub.DAL.Interfaces;
using FamilyClub.DAL.Repositories;
using FamilyClubLibrary;
using System;
using System.Collections.Generic;
using System.Text;

namespace FamilyClub.BLL.Services
{
    public class FormatService : IFormatService
	{
		private readonly IFormatRepository _formatRepository;
		private readonly IUnitOfWork _unitOfWork;

		public FormatService(IFormatRepository formatRepository, IUnitOfWork unitOfWork)
		{
			_formatRepository = formatRepository;
			_unitOfWork = unitOfWork;
		}

		public async Task<IEnumerable<FormatDto>> GetAllAsync(CancellationToken cancellationToken = default)
		{
			var formats = await _formatRepository.GetAllAsync(cancellationToken);
			return formats.Select(MapToReadDto);
		}

		public async Task<FormatDto?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
		{
			var format = await _formatRepository.GetByIdAsync(id, cancellationToken);
			return format is null ? null : MapToReadDto(format);
		}

		public async Task<FormatDto> CreateAsync(FormatDto dto, CancellationToken cancellationToken = default)
		{
			var format = new Format
			{
				Name = dto.Name.Trim(),
				Code = dto.Code?.Trim(),
			};

			await _formatRepository.AddAsync(format, cancellationToken);
			await _unitOfWork.SaveChangesAsync(cancellationToken);

			return MapToReadDto(format);
		}

		public async Task<bool> UpdateAsync(int id, FormatDto dto, CancellationToken cancellationToken = default)
		{
			var format = await _formatRepository.GetByIdAsync(id, cancellationToken);
			if (format is null)
			{
				return false;
			}

			format.Name = dto.Name.Trim();
			format.Code = dto.Code?.Trim();

			_formatRepository.Update(format);
			await _unitOfWork.SaveChangesAsync(cancellationToken);

			return true;
		}

		public async Task<bool> DeleteAsync(int id, CancellationToken cancellationToken = default)
		{
			var format = await _formatRepository.GetByIdAsync(id, cancellationToken);
			if (format is null)
			{
				return false;
			}

			_formatRepository.Delete(format);
			await _unitOfWork.SaveChangesAsync(cancellationToken);

			return true;
		}

		private static FormatDto MapToReadDto(Format format)
		{
			return new FormatDto
			{
				Id = format.Id,
				Name = format.Name,
				Code = format.Code,
			};
		}
	}
}
