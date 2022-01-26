using System;

namespace API.Dtos
{
    public class BookingDto
    {
        public ShowDto Show { get; init; }
        public DateTime BookingTimestamp { get; init; }
        public DateTime DateOfShow { get; set; }
        public UserDto User { get; set; }
        public int NumOfSeats { get; init; }
        public bool Appeared { get; set; }
    }
}
