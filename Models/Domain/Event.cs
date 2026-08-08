namespace BandLife.Models.Domain
{
    public class Event
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        public required List<string> Options { get; set; } = new List<string>();
        public required List<string> Outcomes { get; set; } = new List<string>();

    }
}
