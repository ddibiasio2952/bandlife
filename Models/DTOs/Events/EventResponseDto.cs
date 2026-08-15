using BandLife.Models.Domain;

namespace BandLife.Models.DTOs.Events
{
    public class EventResponseDto
    {
        public int Id { get; set; }
        public string Category { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public List<EventOptionResponseDto> Options { get; set; } = [];
    }
}
