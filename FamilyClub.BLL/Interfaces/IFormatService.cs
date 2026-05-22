using FamilyClub.BLL.DTOs.Author;
using FamilyClub.BLL.DTOs.Format;
using FamilyClub.BLL.DTOs.Language;
using FamilyClubLibrary;
using System;
using System.Collections.Generic;
using System.Text;

namespace FamilyClub.BLL.Interfaces
{
	public interface IFormatService
	{
		Task<IEnumerable<FormatDto>> GetAllAsync(CancellationToken cancellationToken = default);
		Task<FormatDto?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
		Task<FormatDto> CreateAsync(FormatDto dto, CancellationToken cancellationToken = default);
		Task<bool> UpdateAsync(int id, FormatDto dto, CancellationToken cancellationToken = default);
		Task<bool> DeleteAsync(int id, CancellationToken cancellationToken = default);
	}
}
