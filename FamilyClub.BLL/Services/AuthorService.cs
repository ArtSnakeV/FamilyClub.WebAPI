using FamilyClub.BLL.DTOs.ActionLog;
using FamilyClub.BLL.DTOs.Author;
using FamilyClub.BLL.Interfaces;
using FamilyClub.DAL.Interfaces;
using FamilyClubLibrary;

namespace FamilyClub.BLL.Services
{
	public class AuthorService : IAuthorService
	{
		private readonly IAuthorRepository _authorRepository;
		private readonly IUnitOfWork _unitOfWork;
		private readonly IActionLogService _actionLog;

		public AuthorService(
			IAuthorRepository authorRepository,
			IUnitOfWork unitOfWork,
			IActionLogService actionLog)
		{
			_authorRepository = authorRepository;
			_unitOfWork = unitOfWork;
			_actionLog = actionLog;
		}

		public async Task<IEnumerable<AuthorDTO>> GetAllAsync(CancellationToken cancellationToken = default)
		{
			var authors = await _authorRepository.GetAllAsync(cancellationToken);
			return authors.Select(MapToReadDto);
		}

		public async Task<AuthorDTO?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
		{
			var author = await _authorRepository.GetByIdAsync(id, cancellationToken);
			return author is null ? null : MapToReadDto(author);
		}

		public async Task<AuthorDTO> CreateAsync(AuthorDTO dto, CancellationToken cancellationToken = default)
		{
			var author = new Author
			{
				AuthorName = dto.AuthorName.Trim(),
				Biography = dto.Biography?.Trim(),
				PhotoUrl = dto.PhotoUrl,
			};

			await _authorRepository.AddAsync(author, cancellationToken);
			await _unitOfWork.SaveChangesAsync(cancellationToken);

			await SafeLogAsync(
				ActionLogCodes.Actions.Created,
				ActionLogCodes.Modules.Authors,
				$"Створено автора «{author.AuthorName}», Id={author.Id}",
				ActionLogCodes.Levels.Success,
				cancellationToken);

			return MapToReadDto(author);
		}

		public async Task<bool> UpdateAsync(int id, AuthorDTO dto, CancellationToken cancellationToken = default)
		{
			var author = await _authorRepository.GetByIdAsync(id, cancellationToken);
			if (author is null)
			{
				return false;
			}

			author.AuthorName = dto.AuthorName.Trim();
			author.Biography = dto.Biography?.Trim();
			author.PhotoUrl = dto.PhotoUrl;

			_authorRepository.Update(author);
			await _unitOfWork.SaveChangesAsync(cancellationToken);

			return true;
		}

		public async Task<bool> DeleteAsync(int id, CancellationToken cancellationToken = default)
		{
			var author = await _authorRepository.GetByIdAsync(id, cancellationToken);
			if (author is null)
			{
				return false;
			}

			var name = author.AuthorName;
			_authorRepository.Delete(author);
			await _unitOfWork.SaveChangesAsync(cancellationToken);

			await SafeLogAsync(
				ActionLogCodes.Actions.Deleted,
				ActionLogCodes.Modules.Authors,
				$"Видалено автора «{name}», Id={id}",
				ActionLogCodes.Levels.Warning,
				cancellationToken);

			return true;
		}

		private async Task SafeLogAsync(
			string action,
			string module,
			string details,
			string level,
			CancellationToken cancellationToken)
		{
			try
			{
				await _actionLog.LogAsync(action, module, details, level, cancellationToken: cancellationToken);
			}
			catch
			{
			}
		}

		private static AuthorDTO MapToReadDto(Author author)
		{
			return new AuthorDTO
			{
				Id = author.Id,
				AuthorName = author.AuthorName,
				Biography = author.Biography,
				PhotoUrl = author.PhotoUrl,
			};
		}
	}
}
