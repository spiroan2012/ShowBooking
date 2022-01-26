using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IShowRepository
    {
        void Add(Show show);
        void Delete(Show show);
        Task<IReadOnlyList<Show>> GetAllShowsAsync();
        Task<Show> GetShowByIdAsync(int id);
        Task<Hall> GetHallOfShowAsync(int id);
        Task<IReadOnlyList<Show>> GetShowsForSpecificDateAsync(DateTime date);
        Task<bool> Complete();
        void Update(Show show);
    }
}
