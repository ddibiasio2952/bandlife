namespace BandLife.Models.DTOs.Events
{
    public class UpdateEventDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public List<EventOptionResponseDto> Options { get; set; } = [];
    }
}
