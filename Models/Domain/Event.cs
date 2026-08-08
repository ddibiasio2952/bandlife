namespace BandLife.Models.Domain
{
    public class Event
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        public required List<string> Options { get; set; } = new List<string>();
        public required List<string> Outcomes { get; set; } = new List<string>();
        public required List<int> Members { get; set; } = new List<int>();
        public required List<string> Job { get; set; } = new List<string>();
        public required List<int> JobIncome { get; set; } = new List<int>();
        public required List<int> BandIncome { get; set; } = new List<int>();
        public required List<string> Popularity { get; set; } = new List<string>();
        public required List<int> Listeners { get; set; } = new List<int>();
    }
}
