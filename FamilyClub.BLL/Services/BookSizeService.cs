using FamilyClub.BLL.DTOs.BookSize;
using FamilyClub.BLL.DTOs.Format;
using FamilyClub.DAL.Interfaces;
using FamilyClubLibrary;
using System;
using System.Collections.Generic;
using System.Text;

namespace FamilyClub.BLL.Services
{
	public class BookSizeService
	{

		private readonly IBookSizeRepository _bookSizeRepository;
		private readonly IUnitOfWork _unitOfWork;

		public BookSizeService(IBookSizeRepository bookSizeRepository, IUnitOfWork unitOfWork)
		{
			_bookSizeRepository = bookSizeRepository;
			_unitOfWork = unitOfWork;
		}

		public async Task<IEnumerable<BookSizeDto>> GetAllAsync(CancellationToken cancellationToken = default)
		{
			var bookSizes = await _bookSizeRepository.GetAllAsync(cancellationToken);
			return bookSizes.Select(MapToReadDto);
		}

		public async Task<BookSizeDto?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
		{
			var bookSize = await _bookSizeRepository.GetByIdAsync(id, cancellationToken);
			return bookSize is null ? null : MapToReadDto(bookSize);
		}

		public async Task<BookSizeDto> CreateAsync(BookSizeDto dto, CancellationToken cancellationToken = default)
		{
			var bookSize = new BookSize
			{
				Name = dto.Name.Trim(),
				Code = dto.Code?.Trim(),
			};

			await _bookSizeRepository.AddAsync(bookSize, cancellationToken);
			await _unitOfWork.SaveChangesAsync(cancellationToken);

			return MapToReadDto(bookSize);
		}

		public async Task<bool> UpdateAsync(int id, BookSize dto, CancellationToken cancellationToken = default)
		{
			var bookSize = await _bookSizeRepository.GetByIdAsync(id, cancellationToken);
			if (bookSize is null)
			{
				return false;
			}

			bookSize.Name = dto.Name.Trim();
			bookSize.Code = dto.Code?.Trim();

			_bookSizeRepository.Update(bookSize);
			await _unitOfWork.SaveChangesAsync(cancellationToken);

			return true;
		}

		public async Task<bool> DeleteAsync(int id, CancellationToken cancellationToken = default)
		{
			var bookSize = await _bookSizeRepository.GetByIdAsync(id, cancellationToken);
			if (bookSize is null)
			{
				return false;
			}

			_bookSizeRepository.Delete(bookSize);
			await _unitOfWork.SaveChangesAsync(cancellationToken);

			return true;
		}

		private static BookSizeDto MapToReadDto(BookSize bookSize)
		{
			return new BookSizeDto
			{
				Id = bookSize.Id,
				Name = bookSize.Name,
				Code = bookSize.Code,
			};
		}
	}
}
