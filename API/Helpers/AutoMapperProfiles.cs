using API.Dtos;
using AutoMapper;
using Core.Entities;
using System;
using System.Linq;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Hall, HallDto>();
            CreateMap<Hall, ShowHallDto>();
            CreateMap<HallUpdateDto, Hall>();
            CreateMap<ShowUpdateDto, Show>()
                .ForMember(dest => dest.Actors, opt => opt
                    .MapFrom(src => string.Join(", ", src.Actors)))
                .ForMember(dest => dest.Directors, opt => opt
                    .MapFrom(src => string.Join(", ", src.Directors))); 
            CreateMap<CreateShowDto, Show>()
                .ForMember(dest => dest.Actors, opt => opt
                    .MapFrom(src => string.Join(", ",src.Actors)))
                .ForMember(dest => dest.Directors, opt => opt
                    .MapFrom(src => string.Join(", ", src.Directors))); ;
            CreateMap<RegisterDto, AppUser>();
            CreateMap<AppUser, UserDto>();
            CreateMap<Booking, BookingDto>();
            CreateMap<Show, ShowDto>()
                .ForMember(dest => dest.HallName, opt => opt.MapFrom(src => src.Hall.Title))
                .ForMember(dest => dest.HallAddress, opt => opt.MapFrom(src => src.Hall.Address))
                .ForMember(dest => dest.HallDescription, opt => opt.MapFrom(src => src.Hall.Description))
                .ForMember(dest => dest.HallEmail, opt => opt.MapFrom(src => src.Hall.EmailAddress))
                .ForMember(dest => dest.HallPhone, opt => opt.MapFrom(src => src.Hall.Phone))
                .ForMember(dest => dest.Actors, opt => opt
                    .MapFrom(src => src.Actors.Split(",", StringSplitOptions.None).ToList()))
                .ForMember(dest => dest.Directors, opt => opt
                    .MapFrom(src => src.Directors.Split(", ", StringSplitOptions.None) ));
        }
    }
}
