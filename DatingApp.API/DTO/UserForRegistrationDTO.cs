using System;
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
        
        [Required]
        public string KnownAs { get; set; }
       
        [Required]
        public DateTime DateOfBirth { get; set; }
        
        [Required]
        public string City { get; set; }
        
        [Required]
        public string Country { get; set; }
       
        [Required]
        public string Gender { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }

        public UserForRegistrationDTO()
        {
            Created=DateTime.Now;
            LastActive=DateTime.Now;
            
        }
    }
}