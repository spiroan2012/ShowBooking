using Core.Entities;
using Core.Params;
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
        Task<PagedList<Show>> GetAllShowsAsync(ShowParams showParams);
        Task<Show> GetShowByIdAsync(int id);
        Task<Hall> GetHallOfShowAsync(int id);
        Task<bool> Complete();
        void Update(Show show);
        Task<IReadOnlyList<Show>> GetShowsForSpecificDateAsync(DateTime dateGiven);
    }
}
