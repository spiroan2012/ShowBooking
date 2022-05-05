using API.Dtos;
using API.Extensions;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Params;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HallsController : ControllerBase
    {
        private readonly IHallRepository _hallsRepository;
        private readonly IMapper _mapper;

        public HallsController(IHallRepository hallsRepository, IMapper mapper)
        {
            _hallsRepository = hallsRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<HallDto>>> GetHalls([FromQuery]HallParams hallParams)
        {
            var halls = await _hallsRepository.GetAllHallsAsync(hallParams);

            Response.AddPaginationHeader(halls.CurrentPage, halls.PageSize, halls.TotalCount, halls.TotalPages);

            return Ok(_mapper.Map<IEnumerable<HallDto>>(halls));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<HallDto>> GetHallById(int id)
        {
            var hall = await _hallsRepository.GetHallByIdAsync(id);

            if (hall == null) return NotFound("The hall with id " + id + " was not found");

            return Ok(_mapper.Map<HallDto>(hall));
        }

        [HttpGet("GetShowsOfHall/{id}")]
        public async Task<ActionResult<IEnumerable<ShowDto>>> GetShowsOfHall(int id, [FromQuery]HallParams hallParams)
        {
            var shows = await _hallsRepository.GetShowsOfHallAsync(id, hallParams);

            //if (shows == null) return NotFound("We could not found any show for hall " + id);

            return Ok(_mapper.Map<IEnumerable<ShowDto>>(shows));
        }

        [HttpGet("GetWithoutPagination")]
        public async Task<ActionResult<IEnumerable<HallDto>>> GetWithoutPagination()
        {
            var halls = await _hallsRepository.GetHallsWithoutPaginationAsync();

            return Ok(_mapper.Map<IEnumerable<HallDto>>(halls));
        }

        [HttpPost("add")]
        public async Task<ActionResult> AddHall(HallDto hallDto)
        {
            var hall = new Hall()
            {
                Title = hallDto.Title,
                Description = hallDto.Description,
                Address = hallDto.Address,
                Capacity = hallDto.Capacity,
                Phone = hallDto.Phone,
                EmailAddress = hallDto.EmailAddress
            };

            _hallsRepository.Add(hall);

            if (await _hallsRepository.Complete()) return Ok();
            return BadRequest("Failed to add the hall "+hallDto.Title);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateHall([FromBody]HallUpdateDto hallUpdateDto, int id)
        {
            var entityTochange = await _hallsRepository.GetHallByIdAsync(id);

            _mapper.Map(hallUpdateDto, entityTochange);

            _hallsRepository.Update(entityTochange);

            if (await _hallsRepository.Complete()) return Ok();
            return BadRequest("Failed to update the hall " + hallUpdateDto.Title);
        }
    }
}
