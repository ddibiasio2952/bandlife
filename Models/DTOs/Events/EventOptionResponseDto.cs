namespace BandLife.Models.DTOs.Events
{
    public class EventOptionResponseDto
    {
        public int Id { get; set; }

        public string Text { get; set; } = string.Empty;
        public string Outcome { get; set; } = string.Empty;

        public int MembersModifier { get; set; }
        public string? NewJob { get; set; }
        public int JobIncomeModifier { get; set; }
        public int BandIncomeModifier { get; set; }
        public string? NewPopularityLevel { get; set; }
        public int ListenersModifier { get; set; }

        public int EventId { get; set; }
    }
}
