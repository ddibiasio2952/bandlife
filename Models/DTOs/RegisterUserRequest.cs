using System.ComponentModel.DataAnnotations;

namespace BandLife.Models.DTOs
{
    public class RegisterUserRequest
    {
        [Required]
        [EmailAddress]
        public required string Email { get; set; }
        [Required]
        public required string Password { get; set; }
        [Required]
        public string AccountType { get; set; } = string.Empty;
        [Required]
        public required string Band { get; set; } = string.Empty;
        [Required]
        public required string Name { get; set; }
        [Required]
        public string Instrument { get; set; } = string.Empty;
        [Required]
        public List<string> Genres { get; set; } = [];
    }
}
