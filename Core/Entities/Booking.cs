﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Booking
    {
        [Key]
        public int Id { get; init; }
        [Required]
        public Show Show { get; init; }
        [Required]
        public DateTime BookingTimestamp { get; init; } = DateTime.Now;
        [Required]
        public int NumOfSeats { get; init; } = 50;
    }
}