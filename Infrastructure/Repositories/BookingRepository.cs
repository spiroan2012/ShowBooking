﻿using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class BookingRepository : IBookingRepository
    {
        public BookingContext _context { get; set; }

        public BookingRepository(BookingContext context)
        {
            _context = context;
        }

        public void CreateBooking(Booking booking)
        {
            _context.Bookings.Add(booking);
            int id = booking.Id;
        }

        public async Task<string[]> GetReservedSeatsForShow(int showId, DateTime dateOfShow)
        {
            var seats=  await _context.Seats
                .Include(p => p.Booking)
                .Where(p => p.Booking.Show.Id == showId && p.Booking.DateOfShow == dateOfShow)
                .ToListAsync();

            return seats.Select(p => p.SeatNumber).ToArray();
        }

        public void ReserveSeatsForBooking(Booking booking, string[] seats, AppUser user)
        {
            foreach(string seatNum in seats)
            {
                Seat seat = new Seat
                {
                    Booking = booking,
                    SeatNumber = seatNum
                };
                _context.Seats.Add(seat);
            }
        }

        public async Task<bool> CheckIfReserved(int showId, DateTime dateOfShow, AppUser user)
        {
            return await _context.Bookings
                .AnyAsync(p => p.Show.Id == showId && p.DateOfShow == dateOfShow && p.User.Id == user.Id);
        }

        public async Task<bool> Complete()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<IReadOnlyList<Booking>> GetBookingsForUserAync(AppUser user)
        {
            var data = await _context.Bookings
                .Include(s => s.Show)
                .Include(s => s.Seats)
                .Where(p => p.User.Id == user.Id && p.Appeared == false)
                .ToListAsync();
            return data;
        }

        public async Task<IEnumerable<Booking>> GetBookingsForShowAndDate(int showId, DateTime dateGiven)
        {
            return await _context.Bookings
                .Where(b => b.DateOfShow == dateGiven && b.Show.Id == showId)
                .Include(b => b.Seats)
                .Include(b =>b.User)
                .ToListAsync();
        }
        public async Task SetAppearForBooking(int bookingId)
        {
            var booking =  _context.Bookings.Where(b => b.Id == bookingId).FirstOrDefault();
            booking.Appeared = true;
        }

        public async Task<IEnumerable<Booking>> GetBookingsForUserNotAppearedAync(AppUser user)
        {
            var data = await _context.Bookings
                .Where(p => p.User.Id == user.Id && p.Appeared == false)
                .Include(s => s.Show)
                .Include(s => s.Seats)
                .ToListAsync();
            return data;
        }
    }
}
