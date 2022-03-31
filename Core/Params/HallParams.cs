using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Params
{
    public class HallParams : PaginationParams
    {
        public string SearchTitle { get; set; }
        public int MinCapacity { get; set; }
        public int MaxCapacity { get; set; }
        public string OrderBy { get; set; }
    }
}
