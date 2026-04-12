using FamilyClub.BLL.DTOs.Roles;
using FamilyClub.BLL.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace FamilyClub.WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
//[Authorize(Roles = "Admin")] // Only admins have access
public class RolesClubMemberController : ControllerBase
{
    private readonly IRoleClubMemberService _roleService;

    public RolesClubMemberController(IRoleClubMemberService roleService)
    {
        _roleService = roleService;
    }

    [HttpGet]
    public async Task<IActionResult> GetRoles(CancellationToken cancellationToken)
    {
        var roles = await _roleService.GetAllRolesAsync(cancellationToken);
        return Ok(roles);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(string id, CancellationToken cancellationToken)
    {
        var role = await _roleService.GetRoleByIdAsync(id, cancellationToken);
        if (role == null) return NotFound();
        return Ok(role);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] string roleName, CancellationToken cancellationToken)
    {
        var cleanName = roleName?.Trim();

        if (string.IsNullOrWhiteSpace(cleanName))
            return BadRequest("Role name cannot be empty.");

        var result = await _roleService.CreateRoleAsync(cleanName, cancellationToken);

        if (!result)
            return BadRequest("Role already exists or creation failed.");

        return Ok(new { message = "Role created successfully" });
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(string id, [FromBody] string newName, CancellationToken cancellationToken)
    {
        var result = await _roleService.UpdateRoleAsync(id, newName, cancellationToken);
        if (!result) return BadRequest("Update failed.");
        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id, CancellationToken cancellationToken)
    {
        var result = await _roleService.DeleteRoleAsync(id, cancellationToken);
        if (!result) return NotFound();
        return Ok();
    }

    [HttpGet("{roleName}/users")]
    public async Task<IActionResult> GetUsersInRole(string roleName, CancellationToken cancellationToken)
    {
        var users = await _roleService.GetUsersInRoleAsync(roleName, cancellationToken);
        return Ok(users);
    }
}