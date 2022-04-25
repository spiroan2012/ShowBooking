using System;

namespace API.Dtos
{
    public class ShowDto
    {
        public int Id { get; init; }
        public string Title { get; init; }
        public string Description { get; init; }
        public DateTime DateStart { get; set; }
        public DateTime DateEnd { get; set; }
        public DateTime TimeStart { get; set; }
        public string[] Actors { get; set; }
        public string[] Directors { get; set; }
        public int Duration { get; init; }
        public string HallName { get; set; }
        public string HallDescription { get; set; }
        public string HallAddress { get; set; }
        public string HallPhone { get; set; }
        public string HallEmail { get; set; }

    }
}
