using Core.Entities;
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
    public class HallRepository : IHallRepository
    {
        private readonly BookingContext _context;

        public HallRepository(BookingContext context)
        {
            _context = context;
        }

        public void AddHall(Hall hall)
        {
            _context.Halls.Add(hall);
        }

        public async Task<IReadOnlyList<Hall>> GetAllHallsAsync()
        {
            return await _context.Halls.ToListAsync();
        }

        public async Task<Hall> GetHallByIdAsync(int id)
        {
            return await _context.Halls
                .SingleOrDefaultAsync(h => h.Id == id);
        }

        public async Task<bool> Complete()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
