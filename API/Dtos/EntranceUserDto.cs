using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class EntranceUserDto
    {
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string EmailAddress { get; set; }
        [Required]
        public IFormFile Photo { get; set; }
    }
}
