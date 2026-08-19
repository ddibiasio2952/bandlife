using BandLife.Data;
using BandLife.Models.Domain;
using BandLife.Models.DTOs;
using BandLife.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BandLife.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationUsersController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly PaycheckService _paycheckService;

        public ApplicationUsersController(
            UserManager<ApplicationUser> userManager, PaycheckService paycheckService)
        {
            _userManager = userManager;
            _paycheckService = paycheckService;
        }

        // GET: /api/applicationusers/profile
        [HttpGet("profile")]
        public async Task<ActionResult<ApplicationUserProfileResponse>> GetProfile() {
            // Endpoint obtains the User from the Identity cookie
            var user = await _userManager.GetUserAsync(User);

            if (user is null)
            {
                return Unauthorized();
            }

            var paycheckApplied = _paycheckService.ApplyPendingPaychecks(user);

            if (paycheckApplied)
            {
                var result = await _userManager.UpdateAsync(user);

                if (!result.Succeeded)
                {
                    return StatusCode(
                        StatusCodes.Status500InternalServerError,
                        result.Errors);
                }
            }

            var response = new ApplicationUserProfileResponse
            {
                Id = user.Id,
                Email = user.Email ?? string.Empty,
                Name = user.Name,
                Band = user.Band,
                Instrument = user.Instrument,
                Genres = user.Genres?.ToList() ?? [],
                Status = user.Status?.ToList() ?? [],
                Members = user.Members,
                Events = user.Events,
                BankAccount = user.BankAccount,
                Job = user.Job,
                JobIncome = user.JobIncome,
                JobStart = user.JobStart,
                LastPaycheckAt = user.LastPaycheckAt,
                BandIncome = user.BandIncome,
                Popularity = user.Popularity,
                Listeners = user.Listeners,
                Releases = user.Releases,
                CompletedEventIds = user.CompletedEventIds?.ToArray() ?? Array.Empty<int>()
            };

            return Ok(response);
        }
    }
}
