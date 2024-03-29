﻿using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;

        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, ITokenService tokenService, IMapper mapper)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
            _mapper = mapper;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await UserExists(registerDto.Username)) return BadRequest("Το όνομα χρήστη " + registerDto.Username + " χρησιμοποιείται");

            var user = _mapper.Map<AppUser>(registerDto);

            user.UserName = registerDto.Username.ToLower();

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if(!result.Succeeded) return BadRequest(result.Errors);

            var roleResult = await _userManager.AddToRoleAsync(user, "Member");

            if(!roleResult.Succeeded) return BadRequest(roleResult.Errors);

            return new UserDto
            {
                Username = registerDto.Username,
                Token = await _tokenService.CreateToken(user),
                Gender = registerDto.Gender
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.Users
                .SingleOrDefaultAsync(x => x.UserName == loginDto.UserName.ToLower());
            if (user == null) return BadRequest("Invalid Username");

            var result = await _signInManager
                .CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded) return BadRequest("Λάθος κωδικός πρόσβασης");

            return new UserDto
            {
                Username = user.UserName,
                Token = await _tokenService.CreateToken(user),
                FirstName = user.FirstName,
                LastName = user.LastName,
                Gender = user.Gender,
                IsDisabled = user.IsDisabled
            };
        }

        [HttpPost("facebook-login")]
        public async Task<ActionResult<UserDto>> FacebookLogin(ExternalAuthDto externalAuthDto)
        {
            var user = await _userManager.FindByEmailAsync(externalAuthDto.Email); 
            if(user == null)
            {
                var appUser = new AppUser
                {
                    UserName = externalAuthDto.Email,
                    FirstName = externalAuthDto.FirstName,
                    LastName = externalAuthDto.LastName,
                    Email = externalAuthDto.Email
                };

                var result = await _userManager.CreateAsync(appUser);

                if (!result.Succeeded) return Unauthorized();

                var roleResult = await _userManager.AddToRoleAsync(appUser, "Member");

                if (!roleResult.Succeeded) return BadRequest(roleResult.Errors);

                return new UserDto
                {
                    Username = appUser.UserName,
                    Token = await _tokenService.CreateToken(appUser)
                };
            }
            else
            {
                return new UserDto
                {
                    Username = user.UserName,
                    Token = await _tokenService.CreateToken(user),
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Gender = user.Gender,
                    IsDisabled = user.IsDisabled
                };
            }
        }

        private async Task<bool> UserExists(string username)
        {
            return await _userManager.Users.AnyAsync(x => x.UserName == username.ToLower());
        }
    }
}
