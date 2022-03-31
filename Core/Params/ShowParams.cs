using System;

namespace Core.Params
{
    public class ShowParams : PaginationParams
    {
        public string SearchTitle { get; set; }
        public DateTime SearchDate { get; set; } = DateTime.Now;
        public string OrderBy { get; set; }
    }
}
