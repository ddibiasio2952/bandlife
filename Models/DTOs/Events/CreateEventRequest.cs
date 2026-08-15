namespace BandLife.Models.DTOs.Events
{
    public class CreateEventRequest
    {
        public required string Name { get; set; }
        public required string Category { get; set; }
        public required string Description { get; set; }

        public List<CreateEventOptionRequest> Options { get; set; } = [];
    }
}
