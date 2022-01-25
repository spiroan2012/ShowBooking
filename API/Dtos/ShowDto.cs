﻿using System;

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
        public int Duration { get; init; }
        public string HallName { get; set; }

    }
}
