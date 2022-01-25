using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShowController : ControllerBase
    {
        private readonly IShowRepository _showRepository;
        private readonly IHallRepository _hallRepository;
        private readonly IMapper _mapper;

        public ShowController(IShowRepository showRepository, IHallRepository hallRepository,IMapper mapper)
        {
            _showRepository = showRepository;
            _hallRepository = hallRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ShowDto>>> GetAllShows()
        {
            var shows = await _showRepository.GetAllShowsAsync();

            return Ok(shows);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetShowById(int id)
        {
            var show = await _showRepository.GetShowByIdAsync(id);

            if (show == null) return NotFound("The show with id " + id + " was not found");

            return Ok(_mapper.Map<ShowDto>(show));
        }

        [HttpPost("add")]
        public async Task<ActionResult<ShowDto>> Add(CreateShowDto createShowDto)
        {
            var hall = await _hallRepository.GetHallByIdAsync(createShowDto.HallId);

            if (hall == null) return NotFound("The hall with id " + createShowDto.HallId + " was not found");
            var show = _mapper.Map<Show>(createShowDto);

            _hallRepository.AddShow(hall,show);
            show.Hall = hall;
            _showRepository.Add(show);

            if (await _showRepository.Complete()) return Ok(_mapper.Map<ShowDto>(show));
            return BadRequest("Failed to add the show " + createShowDto.Title);
        }

        [HttpGet("GetHallOfShow/{id}")]
        public async Task<ActionResult<ShowHallDto>> GetHallOfShow(int id)
        {
            var hall = await _showRepository.GetHallOfShowAsync(id);

            if (hall == null) return NotFound("Could not find a hall for show with id " + id);
            return Ok(_mapper.Map<ShowHallDto>(hall));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateShow([FromBody] ShowUpdateDto showUpdateDto, int id)
        {
            var entityTochange = await _showRepository.GetShowByIdAsync(id);

            _mapper.Map(showUpdateDto, entityTochange);

            _showRepository.Update(entityTochange);

            if (await _showRepository.Complete()) return Ok();
            return BadRequest("Failed to update the show " + showUpdateDto.Title);
        }
    }
}
