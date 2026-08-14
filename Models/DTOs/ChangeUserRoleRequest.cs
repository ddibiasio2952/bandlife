using System.ComponentModel.DataAnnotations;

namespace BandLife.Models.DTOs
{
    public class ChangeUserRoleRequest
    {
        [Required]
        public string Role { get; set; } = string.Empty;
    }
}
