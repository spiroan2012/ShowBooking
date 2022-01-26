using API.Dtos;
using AutoMapper;
using Core.Entities;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Hall, HallDto>();
            CreateMap<Hall, ShowHallDto>();
            CreateMap<HallUpdateDto, Hall>();
            CreateMap<ShowUpdateDto, Show>();
            CreateMap<CreateShowDto, Show>();
            CreateMap<RegisterDto, AppUser>();
            CreateMap<Show, ShowDto>()
                .ForMember(dest => dest.HallName, opt => opt.MapFrom(src => src.Hall.Title));
        }
    }
}
