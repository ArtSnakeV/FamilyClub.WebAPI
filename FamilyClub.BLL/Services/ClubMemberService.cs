using FamilyClub.BLL.DTOs.ClubMember;
using FamilyClub.BLL.Interfaces;
using FamilyClub.DAL.Interfaces;
using FamilyClubLibrary;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Xml.Linq;
using FamilyClub.BLL.Mapping;

namespace FamilyClub.BLL.Services;


// Method used by `admin` to manage club members (CRUD operations).
public class ClubMemberService : IClubMemberService
{
    private readonly IUnitOfWork _unitOfWork; // We do not use it now, but it can be used later if we decide to update some other entities together with ClubMember
    private readonly UserManager<ClubMember> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;

    public ClubMemberService(IUnitOfWork unitOfWork, UserManager<ClubMember> userManager, RoleManager<IdentityRole> roleManager)
    {
        _unitOfWork = unitOfWork;
        _userManager = userManager;
        _roleManager = roleManager;
    }

    public async Task<IEnumerable<ClubMemberReadDto>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        var members = await _userManager.Users.ToListAsync(cancellationToken);
        var dtos = new List<ClubMemberReadDto>();

        foreach (var member in members)
        {
            var roles = await _userManager.GetRolesAsync(member);
            dtos.Add(ClubMemberMapper.MapToReadDto(member, roles));
        }

        return dtos;
    }

    public async Task<ClubMemberReadDto?> GetByIdAsync(string id, CancellationToken cancellationToken = default)
    {
        cancellationToken.ThrowIfCancellationRequested(); // Checking for cancellation before starting the operation

        var clubMember = await _userManager.FindByIdAsync(id);
        if (clubMember == null) return null;

        // Рекомендую добавить получение ролей и здесь:
        var roles = await _userManager.GetRolesAsync(clubMember);
        return ClubMemberMapper.MapToReadDto(clubMember, roles);
    }

    public async Task<ClubMemberReadDto> CreateAsync(RegisterClubMemberDto dto, CancellationToken cancellationToken = default)
    {
        var clubMember = new ClubMember
        {
            UserName = dto.Email,
            Email = dto.Email,
            Name = dto.Name,
            Surname = dto.Surname,
            PhoneNumber = dto.PhoneNumber,
            DateOfBirth = dto.DateOfBirth,
        };


        var result = await _userManager.CreateAsync(clubMember, dto.Password);
        
        if(!result.Succeeded)
        {
            var errors = string.Join(", ", result.Errors.Select(e => e.Description));
            throw new Exception($"Registration error: {errors}");
        }

        // Adding roles to the user after successful creation
        if (dto.SelectedRoles != null && dto.SelectedRoles.Any())
        {
            foreach (var roleName in dto.SelectedRoles)
            {
                // Creating new role, if it's not assigned
                if (!await _roleManager.RoleExistsAsync(roleName))
                {
                    await _roleManager.CreateAsync(new IdentityRole(roleName));
                }
            }
            await _userManager.AddToRolesAsync(clubMember, dto.SelectedRoles);
        }
        //else // In case admin didn't choose role, we can assign `User` by default. To be discassed. For the moment commented to have opportunity to `block` User if necessary (no roles, only `Guest` acccess)
        //{
        //    await _userManager.AddToRoleAsync(clubMember, "User"); // Assigning default role if no roles are selected
        //}

        var roles = await _userManager.GetRolesAsync(clubMember);
        return ClubMemberMapper.MapToReadDto(clubMember, roles);
    }

    public async Task<bool> UpdateAsync(string id, UpdateClubMemberDto dto, CancellationToken cancellationToken = default)
    {
        var clubMember = await _userManager.FindByIdAsync(id);
        if (clubMember is null)
        {
            return false;
        }
        clubMember.Name = dto.Name;
        clubMember.Surname = dto.Surname;
        clubMember.PhoneNumber = dto.PhoneNumber;
        clubMember.DateOfBirth = dto.DateOfBirth;

        cancellationToken.ThrowIfCancellationRequested(); // Checking for cancellation before starting the update operation

        var result = await _userManager.UpdateAsync(clubMember);
        if (!result.Succeeded) return false;

        return true;
    }

    public async Task<bool> DeleteAsync(string id, CancellationToken cancellationToken = default)
    {
        var clubMember = await _userManager.FindByIdAsync(id);
        if (clubMember is null)
        {
            return false;
        }

        await _userManager.DeleteAsync(clubMember);

        return true;
    }

    public async Task<ClubMemberReadDto?> GetByEmailAsync(string email, CancellationToken cancellationToken = default)
    {
        cancellationToken.ThrowIfCancellationRequested(); // Checking for cancellation before starting the operation
        
        var clubMember = await _userManager.FindByEmailAsync(email);
        if (clubMember == null) return null;

        var roles = await _userManager.GetRolesAsync(clubMember);
        return clubMember is null ? null : ClubMemberMapper.MapToReadDto(clubMember, roles);
    }

    // Method is searching for clubMembers with the specified phone number and returns a list of matching members.
    public async Task<List<ClubMemberReadDto>> GetByPhoneNumberAsync(string phoneNumber, CancellationToken cancellationToken = default)
    {
        var members = await _userManager.Users
            .Where(m => m.PhoneNumber == phoneNumber)
            .ToListAsync(cancellationToken);

        var dtos = new List<ClubMemberReadDto>();
        foreach (var member in members)
        {
            var roles = await _userManager.GetRolesAsync(member);
            dtos.Add(ClubMemberMapper.MapToReadDto(member, roles));
        }
        return dtos;
    }

    // We always return ReadMapToReadDto to ensure consistent output format
    private async Task<List<ClubMemberReadDto>> MapToReadDtosAsync(List<ClubMember> clubMembers)
    {
        var list = new List<ClubMemberReadDto>();

        foreach (var member in clubMembers)
        {
            var roles = await _userManager.GetRolesAsync(member);
            list.Add(ClubMemberMapper.MapToReadDto(member, roles));
        }

        return list;
    }

}

