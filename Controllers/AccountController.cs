using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using BandLife.Models.Domain;
using BandLife.Models.DTOs;
using Microsoft.AspNetCore.Authorization;

namespace BandLife.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
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
        [AllowAnonymous]
        [HttpPost("custom-register")]
        public async Task<IActionResult> Register(RegisterUserRequest request)
        {
            string email = request.Email.Trim();
            var user = new ApplicationUser
            {
                UserName = email,
                Email = email,
                Name = request.Name.Trim(),
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
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginUserRequest request)
        {
            string email = request.Email.Trim();

            var result = await _signInManager.PasswordSignInAsync(
                userName: email,
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
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();

            return Ok(new { message = "Logged out successfully." });
        }

        // GET: /api/account/status
        [HttpGet("status")]
        public IActionResult GetAuthenticationStatus()
        {
            return Ok(new
            {
                isAuthenticated = User.Identity?.IsAuthenticated ?? false,
                userName = User.Identity?.Name
            });
        }

        // Diagnostic Endpoint
        [AllowAnonymous]
        [HttpGet("debug-auth")]
        public IActionResult DebugAuthentication()
        {
            return Ok(new
            {
                isAuthenticated =
                    User.Identity?.IsAuthenticated ?? false,

                authenticationType =
                    User.Identity?.AuthenticationType,

                userName =
                    User.Identity?.Name,

                claimCount =
                    User.Claims.Count()
            });
        }
    }
}
