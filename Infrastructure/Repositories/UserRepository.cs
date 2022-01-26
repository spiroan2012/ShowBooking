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
    public class UserRepository : IUserRepository
    {
        private readonly BookingContext _context;

        public UserRepository(BookingContext context)
        {
            _context = context;
        }
        public async Task<AppUser> GetUserByIdAsync(int id)
        {
            return await _context.Users
                .FindAsync(id);
        }

        public async Task<AppUser> GetUserByUsernameAsync(string username)
        {
            var user = await _context.Users
                .SingleOrDefaultAsync(x => x.UserName == username);
            return user;
        }

        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            return await _context.Users
                .ToListAsync();
        }

        public void Update(AppUser user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }
    }
}
