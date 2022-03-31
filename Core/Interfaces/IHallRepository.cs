using Core.Entities;
using Core.Params;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IHallRepository
    {
        Task<Hall> GetHallByIdAsync(int id);
        Task<PagedList<Hall>> GetAllHallsAsync(HallParams hallParams);
        Task<PagedList<Show>> GetShowsOfHallAsync(int id, HallParams hallParams);
        void Add(Hall hall);
        void AddShow(Hall hall, Show show);
        Task<bool> Complete();
        void Update(Hall hall);
    }
}
