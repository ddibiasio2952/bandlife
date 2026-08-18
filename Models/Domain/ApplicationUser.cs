using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages.Manage;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace BandLife.Models.Domain
{
    public class ApplicationUser : IdentityUser
    {
        public string Name { get; set; } = string.Empty;
        public string Band { get; set; } = string.Empty;
        public string Instrument { get; set; } = string.Empty;
        public List<string> Genres { get; set; } = [];
        public List<string> Status { get; set; } = [];
        public int Members { get; set; } = 1;
        public int Events { get; set; }
        public int BankAccount { get; set; } = 0;
        public string Job { get; set; } = string.Empty;
        public int JobIncome { get; set; }
        public DateTimeOffset? JobStart { get; set; }
        public DateTimeOffset? LastPaycheckAt { get; set; }
        public int BandIncome { get; set; }
        public string Popularity { get; set; } = string.Empty;
        public int Listeners { get; set; }
        public List<string> Releases { get; set; } = [];
    }
}
