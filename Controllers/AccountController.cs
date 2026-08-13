using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using BandLife.Models.Domain;
using BandLife.Models.DTOs;
using Microsoft.AspNetCore.Authorization;

namespace BandLife.Controllers
{
    [ApiController]
    [Route("api/account")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        public AccountController(
            UserManager<ApplicationUser> userManager, 
            SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        // POST: /api/account/custom-register
        [HttpPost("custom-register")]
        public async Task<IActionResult> Register(RegisterUserRequest request)
        {
            string email = request.Email.Trim();
            var user = new ApplicationUser
            {
                UserName = email,
                Email = email,
                Band = request.Band.Trim(),
                Instrument = request.Instrument.Trim(),
                Genres = request.Genres,

                Status = [],
                Members = 1,
                Events = 0,
                Job = "Jobless",
                JobIncome = 0,
                BandIncome = 0,
                Popularity = "\"Who?\"",
                Listeners = 0,
                Releases = []
            };

            IdentityResult result = await _userManager.CreateAsync(user, request.Password);
            
            if (!result.Succeeded)
            {
                return BadRequest(new
                {
                    errors = result.Errors.Select(error => new
                    {
                        error.Code,
                        error.Description
                    })
                });
            }

            // Create authentication cookie
            await _signInManager.SignInAsync(user, isPersistent: false);

            return Ok(new
            {
                user.Id,
                user.UserName,
                user.Email,
                user.Band,
                user.Instrument,
                user.Genres
            });
        }

        //POST: /api/account/login
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginUserRequest request)
        {
            if (!ModelState.IsValid)
            {
                return ValidationProblem(ModelState);
            }

            var result = await _signInManager.PasswordSignInAsync(
                userName: request.Email, 
                password: request.Password, 
                isPersistent: request.RememberMe, 
                lockoutOnFailure: false
                );

            if (!result.Succeeded)
            {
                return Unauthorized(new
                {
                    message = "The email address or password is incorrect."
                });
            }

            return Ok(new
            {
                message = "Login successful."
            });
        }

        // POST: /api/account/logout
        [Authorize]
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();

            return Ok(new { message = "Logged out successfully." });
        }


    }
}
