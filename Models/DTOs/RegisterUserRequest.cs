namespace BandLife.Models.DTOs
{
    public class RegisterUserRequest
    {
        public required string Email { get; set; }
        public required string Password { get; set; }
        public required string Band { get; set; } = string.Empty;
        public required string Name { get; set; }
        public string Instrument { get; set; } = string.Empty;
        public List<string> Genres { get; set; } = [];
    }
}
