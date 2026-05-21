using FamilyClub.BLL.DTOs.BookSize;
using FamilyClub.BLL.DTOs.Format;
using System;
using System.Collections.Generic;
using System.Text;

namespace FamilyClub.BLL.Interfaces
{
	public interface IBookSizeService
	{
		Task<IEnumerable<BookSizeDto>> GetAllAsync(CancellationToken cancellationToken = default);
		Task<BookSizeDto?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
		Task<BookSizeDto> CreateAsync(BookSizeDto dto, CancellationToken cancellationToken = default);
		Task<bool> UpdateAsync(int id, BookSizeDto dto, CancellationToken cancellationToken = default);
		Task<bool> DeleteAsync(int id, CancellationToken cancellationToken = default);
	}
}
