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
    public class HallsController : ControllerBase
    {
        private readonly IHallRepository _hallsRepository;

        public HallsController(IHallRepository hallsRepository)
        {
            _hallsRepository = hallsRepository;
        }

        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<HallDto>>> GetHalls()
        {
            var halls = await _hallsRepository.GetAllHallsAsync();

            return Ok(halls);
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

            _hallsRepository.AddHall(hall);

            if (await _hallsRepository.Complete()) return Ok();
            return BadRequest("Failed to add the hall "+hallDto.Title);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<HallDto>> GetHallById(int id)
        {
            var hall = await _hallsRepository.GetHallByIdAsync(id);

            if (hall == null) return NotFound("The hall with id " + id + " was not found");

            return Ok(new HallDto()
            {
                Id = hall.Id,
                Title = hall.Title,
                Description= hall.Description,
                Address= hall.Address,
                Capacity= hall.Capacity,
                Phone= hall.Phone,
                EmailAddress= hall.EmailAddress
            });
        }
    }
}
