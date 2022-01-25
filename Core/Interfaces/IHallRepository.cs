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
        void AddHall(Hall hall);
        Task<bool> Complete();
    }
}
