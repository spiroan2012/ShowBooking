using System;

namespace API.Dtos
{
    public class CreateBookingDto
    {
        public int ShowId { get; init; }
        public DateTime DateOfShow { get; set; }
        public string[] Seats { get; set; }
    }
}
