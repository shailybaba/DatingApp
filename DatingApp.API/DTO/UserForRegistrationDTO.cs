using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.DTO
{
    public class UserForRegistrationDTO
    {
        [Required]
        public string Username { get; set; }
        [Required]
        [StringLength(8, MinimumLength=4,ErrorMessage="Must specify password between 4 and 8 characters.")]
        public string Password { get; set; }
    }
}