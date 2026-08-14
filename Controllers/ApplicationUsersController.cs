using BandLife.Data;
using BandLife.Models.Domain;
using BandLife.Models.DTOs;
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

        public ApplicationUsersController(
            UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
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
                Job = user.Job,
                JobIncome = user.JobIncome,
                JobStart = user.JobStart,
                BandIncome = user.BandIncome,
                Popularity = user.Popularity,
                Listeners = user.Listeners,
                Releases = user.Releases
            };

            return Ok(response);
        }
    }
}
