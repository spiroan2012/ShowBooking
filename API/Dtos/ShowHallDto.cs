using System;

namespace API.Dtos
{
    public class ShowHallDto
    {
        public int Id { get; init; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Address { get; set; }
        public int Capacity { get; set; }
        public string Phone { get; set; }
        public string EmailAddress { get; set; }
    }
}
