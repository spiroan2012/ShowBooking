using Core.Entities;
using Core.Interfaces;
using Core.Params;
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

        public async Task<PagedList<AppUser>> GetUsersAsync(UserParams userParams )
        {
            var query = _context.Users.AsQueryable();

            if (!string.IsNullOrWhiteSpace(userParams.SearchUsername))
            {
                query = query.Where(x => x.UserName.Contains(userParams.SearchUsername));
            }

            query = userParams.OrderBy switch
            {
                "username" => query.OrderByDescending(s => s.UserName),
                _ => query.OrderByDescending(s => s.CreationDate)
            };

            return await PagedList<AppUser>.CreateAsync(query, userParams.PageNumber, userParams.PageSize);
        }

        public void Update(AppUser user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }
    }
}
