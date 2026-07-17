using FamilyClub.BLL.DTOs.AgeRestriction;
using FamilyClub.BLL.DTOs.Format;
using FamilyClub.BLL.Interfaces;
using FamilyClub.DAL.Interfaces;
using FamilyClubLibrary;
using System;
using System.Collections.Generic;
using System.Text;

namespace FamilyClub.BLL.Services
{
	public class AgeRestrictionService : IAgeRestrictionService
	{
		private readonly IAgeRestrictionRepository _ageRestrictionRepository;
		private readonly IUnitOfWork _unitOfWork;

		public AgeRestrictionService(IAgeRestrictionRepository ageRestrictionRepository, IUnitOfWork unitOfWork)
		{
			_ageRestrictionRepository = ageRestrictionRepository;
			_unitOfWork = unitOfWork;
		}

		public async Task<IEnumerable<AgeRestrictionDto>> GetAllAsync(CancellationToken cancellationToken = default)
		{
			var ageRestrictions = await _ageRestrictionRepository.GetAllAsync(cancellationToken);
			return ageRestrictions.Select(MapToReadDto);
		}

		public async Task<AgeRestrictionDto?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
		{
			var ageRestriction = await _ageRestrictionRepository.GetByIdAsync(id, cancellationToken);
			return ageRestriction is null ? null : MapToReadDto(ageRestriction);
		}

		public async Task<AgeRestrictionDto> CreateAsync(AgeRestrictionDto dto, CancellationToken cancellationToken = default)
		{
			var ageRestriction = new AgeRestriction
			{
				Name = dto.Name.Trim(),
				Code = dto.Code?.Trim(),
			};

			await _ageRestrictionRepository.AddAsync(ageRestriction, cancellationToken);
			await _unitOfWork.SaveChangesAsync(cancellationToken);

			return MapToReadDto(ageRestriction);
		}

		public async Task<bool> UpdateAsync(int id, AgeRestrictionDto dto, CancellationToken cancellationToken = default)
		{
			var ageRestriction = await _ageRestrictionRepository.GetByIdAsync(id, cancellationToken);
			if (ageRestriction is null)
			{
				return false;
			}

			ageRestriction.Name = dto.Name.Trim();
			ageRestriction.Code = dto.Code?.Trim();

			_ageRestrictionRepository.Update(ageRestriction);
			await _unitOfWork.SaveChangesAsync(cancellationToken);

			return true;
		}

		public async Task<bool> DeleteAsync(int id, CancellationToken cancellationToken = default)
		{
			var ageRestriction = await _ageRestrictionRepository.GetByIdAsync(id, cancellationToken);
			if (ageRestriction is null)
			{
				return false;
			}

			_ageRestrictionRepository.Delete(ageRestriction);
			await _unitOfWork.SaveChangesAsync(cancellationToken);

			return true;
		}

		private static AgeRestrictionDto MapToReadDto(AgeRestriction ageRestriction)
		{
			return new AgeRestrictionDto
			{
				Id = ageRestriction.Id,
				Name = ageRestriction.Name,
				Code = ageRestriction.Code,
			};
		}
	}
}
