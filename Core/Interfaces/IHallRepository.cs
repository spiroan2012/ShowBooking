using Core.Entities;
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
        Task<IReadOnlyList<Hall>> GetAllHallsAsync();
        Task<IReadOnlyList<Show>> GetShowsOfHallAsync(int id);
        void Add(Hall hall);
        void AddShow(Hall hall, Show show);
        Task<bool> Complete();
        void Update(Hall hall);
    }
}
