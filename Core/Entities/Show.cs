using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Show
    {
        [Key]
        public int Id { get; init; }
        [Required]
        [MaxLength(60)]
        public string Title { get; init; }
        [Required]
        [MaxLength(600)]
        public string Description { get; init; }
        [Required]
        public DateTime DateStart { get; set; }
        [Required]
        public DateTime DateEnd { get; set; }
        [Required]
        public DateTime TimeStart { get; set; }
        [Required]
        public int Duration { get; init; } = 90;
        [Required]
        public Hall Hall { get; set; }
    }
}
