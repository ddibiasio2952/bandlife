using System.Text.Json.Serialization;

namespace BandLife.Models.Domain
{
    public class EventOption
    {
        public int Id { get; set; }
        public required string Text { get; set; }
        public required string Outcome { get; set; }
        public int MembersModifier { get; set; }
        public string? NewJob { get; set; }
        public int JobIncomeModifier { get; set; }
        public int BandIncomeModifier { get; set; }
        public string? NewPopularityLevel { get; set; }
        public int ListenersModifier { get; set; }

        public int EventId { get; set; }
        public Event Event { get; set; } = null!;
    }
}
