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
    public class ShowRepository : IShowRepository
    {
        private readonly BookingContext _context;

        public ShowRepository(BookingContext context)
        {
            _context = context;
        }

        public void Add(Show show)
        {
            _context.Shows.Add(show);
        }

        public async Task<bool> Complete()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<IReadOnlyList<Show>> GetAllShowsAsync()
        {
            return await _context.Shows.ToListAsync();
        }

        public async Task<Hall> GetHallOfShowAsync(int id)
        {
            var show = await _context.Shows.Include(h => h.Hall)
                .SingleOrDefaultAsync(p => p.Id == id);
            return show?.Hall;
        }

        public async Task<Show> GetShowByIdAsync(int id)
        {
            return await _context.Shows
                .SingleOrDefaultAsync(p => p.Id == id);
        }

        public void Update(Show Show)
        {
            _context.Entry(Show).State = EntityState.Modified;
        }
    }
}
