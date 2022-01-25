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

        public void Add(Hall hall)
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
                .Include(hall => hall.Shows)
                .SingleOrDefaultAsync(h => h.Id == id);
        }

        public void Update(Hall hall)
        {
            _context.Entry(hall).State = EntityState.Modified;
        }

        public void AddShow(Hall hall, Show show)
        {
            hall.Shows.Add(show);
        }

        public async Task<bool> Complete()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<IReadOnlyList<Show>> GetShowsOfHallAsync(int id)
        {
            var hall = await _context.Halls
                .Include(p => p.Shows)
                .SingleOrDefaultAsync(p => p.Id == id);
            return hall?.Shows.ToList();
        }
    }
}
