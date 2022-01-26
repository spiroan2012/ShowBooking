using API.Dtos;
using System.Collections.Generic;
using System.Linq;

namespace API.Helpers
{
    public class BookingUtilityClass
    {
        public static bool CheckSeatsAvailability(string[] userPreferences, string[] booked)
        {
            return userPreferences.Any(x => booked.Any(y => y.Equals(x)));
        }

        public static bool IsValidSeat(int capacity, string seat)
        {
            int seatNum = int.Parse(seat);
            return seatNum >= 1 && seatNum <= capacity;
        }

        public static bool NumOfRequestedSeatsMoreThanAvailable(int available, int numRequested)
        {
            return available < numRequested;
        }

        public static SeatsShowDto[] CreateArrayOfSeats(string[] reservedSeats, int capacity) 
        {
            List<SeatsShowDto> seats = new List<SeatsShowDto>();
            for(int i = 1; i <= capacity; i++)
            {
                seats.Add(new SeatsShowDto
                {
                    SeatNumber = i.ToString(),
                    IsAvailable = !reservedSeats.Contains(i.ToString())
                });
            }
            return seats.ToArray();
        }
    }
}
