using API.Dtos;
using API.Extensions;
using AutoMapper;
using Core.Interfaces;
using Core.Params;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UsersController(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers([FromQuery]UserParams userParams)
        {
            var users = await _userRepository.GetUsersAsync(userParams);

            Response.AddPaginationHeader(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages);

            return Ok(_mapper.Map<List<UserDto>>(users));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetUserById(int id)
        {
            var user = await _userRepository.GetUserByIdAsync(id);
            if(user is null) return NotFound("User with id "+id+" was not found");
            return Ok(_mapper.Map<UserDto>(user));
        }

        [HttpGet("GetByUsername/{username}")]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetUserById(string username)
        {
            var user = await _userRepository.GetUserByUsernameAsync(username);
            if (user is null) return NotFound("User with username " + username + " was not found");
            return Ok(_mapper.Map<UserDto>(user));
        }
    }
}
