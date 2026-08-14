using BandLife.Authorization;
using BandLife.Models.Domain;
using BandLife.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace BandLife.Controllers
{
    [ApiController]
    [Route("api/admin/users")]
    [Authorize(Roles = AppRoles.Admin)]
    public class UserRolesController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public UserRolesController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpPut("{userId}/role")]
        public async Task<IActionResult> ChangeRole(string userId, ChangeUserRoleRequest request)
        {
            if (!AppRoles.All.Contains(request.Role))
            {
                return BadRequest(new
                {
                    message = "The specified role is invalid."
                });
            }

            ApplicationUser? user = await _userManager.FindByIdAsync(userId);

            if (user is null)
            {
                return NotFound(new
                {
                    message = "User not found."
                });
            }

            IList<string> currentRoles = await _userManager.GetRolesAsync(user);

            if (currentRoles.Count == 1 &&
                currentRoles.Contains(request.Role))
            {
                return Ok(new
                {
                    message = $"The user already has the '{request.Role}' role."
                });
            }

            IdentityResult addResult = await _userManager.AddToRoleAsync(user, request.Role);

            if (!addResult.Succeeded)
            {
                return BadRequest(new
                {
                    errors = addResult.Errors.Select(error => error.Description)
                });
            }

            string[] rolesToRemove = currentRoles
                .Where(role => role != request.Role)
                .ToArray();

            if (rolesToRemove.Length > 0)
            {
                IdentityResult removeResult = await _userManager.RemoveFromRolesAsync(user, rolesToRemove);
                
                if (!removeResult.Succeeded)
                {
                    return StatusCode(500, new
                    {
                        message = "The new role was assigned, but one or more old roles could not be removed.",
                        errors = removeResult.Errors.Select(error =>
                            error.Description)
                    });
                }
            }

            return Ok(new
            {
                message = "The user's role was updated.",
                userId = user.Id,
                role = request.Role
            });
        }
    }
}
