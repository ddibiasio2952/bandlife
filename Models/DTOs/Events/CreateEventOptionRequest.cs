namespace BandLife.Models.DTOs.Events
{
    public class CreateEventOptionRequest
    {
        public required string Text { get; set; }
        public required string Outcome { get; set; }

        public int MembersModifier { get; set; }
        public string? NewJob { get; set; }
        public int JobIncomeModifier { get; set; }
        public int BandIncomeModifier { get; set; }
        public string? NewPopularityLevel { get; set; }
        public int ListenersModifier { get; set; }
    }
}
