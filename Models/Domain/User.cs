using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages.Manage;
using System.ComponentModel.DataAnnotations;

namespace BandLife.Models.Domain
{
    public class User
    {
        public int Id { get; set; }
        public required string Band { get; set; }
        [EmailAddress]
        public required string Email { get; set; }
        public required string Instrument { get; set; }
        public required List<string> Genres { get; set; } = new List<string>();
        public required List<string> Status { get; set; } = new List<string>();
        public required int Members { get; set; }
        public required int Events { get; set; }
    }
}
