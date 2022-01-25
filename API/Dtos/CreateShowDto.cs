using System;
using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class CreateShowDto
    {
        public string Title { get; init; }
        public string Description { get; init; }
        public DateTime DateStart { get; set; }
        public DateTime DateEnd { get; set; }
        public DateTime TimeStart { get; set; }
        public int Duration { get; init; }
        public int HallId { get; set; }
    }
}
