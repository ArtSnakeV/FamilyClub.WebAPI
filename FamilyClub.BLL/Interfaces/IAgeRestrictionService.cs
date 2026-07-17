using FamilyClub.BLL.DTOs.AgeRestriction;
using System;
using System.Collections.Generic;
using System.Text;

namespace FamilyClub.BLL.Interfaces
{
	public interface IAgeRestrictionService
	{
		Task<IEnumerable<AgeRestrictionDto>> GetAllAsync(CancellationToken cancellationToken = default);
		Task<AgeRestrictionDto?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
		Task<AgeRestrictionDto> CreateAsync(AgeRestrictionDto dto, CancellationToken cancellationToken = default);
		Task<bool> UpdateAsync(int id, AgeRestrictionDto dto, CancellationToken cancellationToken = default);
		Task<bool> DeleteAsync(int id, CancellationToken cancellationToken = default);
	}
}
