namespace BandLife.Models.DTOs
{
    public class ApplicationUserProfileResponse
    {
        public string Id { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Band { get; set; } = string.Empty;
        public string Instrument { get; set; } = string.Empty;
        public List<string> Genres { get; set; } = [];
        public List<string> Status { get; set; } = [];
        public int Members { get; set; }
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
        public int[] CompletedEventIds { get; set; } = [];
    }
}
