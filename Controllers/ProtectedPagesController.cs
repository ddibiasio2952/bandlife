using BandLife.Authorization;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BandLife.Controllers
{
    [Authorize]
    [Route("pages")]
    public class ProtectedPagesController : Controller
    {
        private readonly IWebHostEnvironment _environment;

        public ProtectedPagesController(IWebHostEnvironment environment)
        {
            _environment = environment;
        }


        // For restricted Roles, including Moderator and Admin


        [Authorize(Roles = AppRoles.Moderator + "," + AppRoles.Admin)]
        [HttpGet("event-add")]
        public IActionResult EventAdd()
        {
            return ProtectedHtmlFile("event-add.html");
        }

        [Authorize(Roles = AppRoles.Moderator + "," + AppRoles.Admin)]
        [HttpGet("event-list")]
        public IActionResult EventList()
        {
            return ProtectedHtmlFile("event-list.html");
        }

        [Authorize(Roles = AppRoles.Moderator + "," + AppRoles.Admin)]
        [HttpGet("event-modify")]
        public IActionResult EventModify()
        {
            return ProtectedHtmlFile("event-modify.html");
        }


        // For all Roles, including User, Moderator, and Admin


        [Authorize(Roles = AppRoles.User + "," + AppRoles.Moderator + "," + AppRoles.Admin)]
        [HttpGet("home")]
        public IActionResult Home()
        {
            return ProtectedHtmlFile("home.html");
        }

        [Authorize(Roles = AppRoles.User + "," + AppRoles.Moderator + "," + AppRoles.Admin)]
        [HttpGet("profile")]
        public IActionResult Profile()
        {
            return ProtectedHtmlFile("profile.html");
        }

        [Authorize(Roles = AppRoles.User + "," + AppRoles.Moderator + "," + AppRoles.Admin)]
        [HttpGet("events")]
        public IActionResult Events()
        {
            return ProtectedHtmlFile("events.html");
        }

        [Authorize(Roles = AppRoles.User + "," + AppRoles.Moderator + "," + AppRoles.Admin)]
        [HttpGet("event-go")]
        public IActionResult EventGo()
        {
            return ProtectedHtmlFile("event-go.html");
        }

        [Authorize(Roles = AppRoles.User + "," + AppRoles.Moderator + "," + AppRoles.Admin)]
        [HttpGet("main-page")]
        public IActionResult MainPage()
        {
            return ProtectedHtmlFile("main-page.html");
        }

        private PhysicalFileResult ProtectedHtmlFile(string fileName)
        {
            string path = Path.Combine(_environment.ContentRootPath, "ProtectedPages", fileName);

            return PhysicalFile(path, "text/html");
        }

    }
}
