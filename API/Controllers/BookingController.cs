using API.Dtos;
using API.Extensions;
using API.Helpers;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        public IShowRepository _showRepository { get; set; }
        public IBookingRepository _bookingRepository { get; set; }
        public IUserRepository _userRepository { get; set; }
        public IMapper _mapper { get; set; }
        private readonly string AppDirectory = Path.Combine(Directory.GetCurrentDirectory(), "Resources");

        public BookingController(IBookingRepository bookingRepository, IUserRepository userRepository, IShowRepository showRepository, IMapper mapper)
        {
            _bookingRepository = bookingRepository;
            _userRepository = userRepository;
            _showRepository = showRepository;
            _mapper = mapper;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> CreateBooking(CreateBookingDto createBookingDto)
        {
            int userId = User.GetUserId();

            var user = await _userRepository.GetUserByIdAsync(userId);

            var hall = _showRepository.GetHallOfShowAsync(createBookingDto.ShowId);

            foreach (string seat in createBookingDto.Seats)
            {
                if (!BookingUtilityClass.IsValidSeat(hall.Result.Capacity, seat))
                {
                    return BadRequest("The selected seat (" + seat + ") has to be between 1 and " + hall.Result.Capacity);
                }
            }

            bool checkIfReserved = await _bookingRepository.CheckIfReserved(createBookingDto.ShowId, createBookingDto.DateOfShow, user);
            if (checkIfReserved) return BadRequest("User has already made a reservation for this show");

            var reserved = await _bookingRepository.GetReservedSeatsForShow(createBookingDto.ShowId, createBookingDto.DateOfShow);
            bool taken = BookingUtilityClass.CheckSeatsAvailability(createBookingDto.Seats, reserved);

            if (taken) return BadRequest("Some seats are already taken");

            int availbleSeats = hall.Result.Capacity - reserved.Length;

            if (BookingUtilityClass.NumOfRequestedSeatsMoreThanAvailable(availbleSeats, createBookingDto.Seats.Length)) return BadRequest("User has requested more seats (" + createBookingDto.Seats.Length + ") than available (" + availbleSeats + ")");

            var show = await _showRepository.GetShowByIdAsync(createBookingDto.ShowId);
            if (show is null) return NotFound("The show with id " + createBookingDto.ShowId + " was not found");

            Booking booking = new Booking
            {
                Show = show,
                DateOfShow = createBookingDto.DateOfShow,
                User = user,
                NumOfSeats = createBookingDto.Seats.Length
            };
            _bookingRepository.CreateBooking(booking);
            if (!await _bookingRepository.Complete()) return BadRequest("Failed to add the booking ");

            _bookingRepository.ReserveSeatsForBooking(booking, createBookingDto.Seats, user);
            if (await _bookingRepository.Complete()) return Ok(_mapper.Map<BookingDto>(booking));
            return BadRequest("Failed to add the booking ");
        }

        [Authorize]
        [HttpGet("GetBookingsForLoggedUser")]
        public async Task<ActionResult<IEnumerable<BookingDto>>> GetBookingsForLoggedUser()
        {
            int userId = User.GetUserId();

            var user = await _userRepository.GetUserByIdAsync(userId);
            var bookings = await _bookingRepository.GetBookingsForUserAync(user);
            return Ok(_mapper.Map<List<BookingDto>>(bookings));
        }

        [Authorize]
        [HttpGet("GetBookingsForShowAndDate")]
        public async Task<ActionResult<IEnumerable<BookingDto>>> GetBookingsForShowAndDate([FromQuery] int showId, [FromQuery] DateTime date)
        {
            var bookings = await _bookingRepository.GetBookingsForShowAndDate(showId, date);

            return Ok(_mapper.Map<List<BookingDto>>(bookings));
        }

        //[HttpPost("GetBookingForUserByEmail"), DisableRequestSizeLimit]
        //public async Task<ActionResult<BookingDto>> GetBookingForUserByEmail([FromForm] EntranceUserDto entr)
        //{
        //    //string userEmail = Request.Form["emailAddress"].ToString();
        //    //string firstName = Request.Form["firstName"].ToString();
        //    //string lastName = Request.Form["lastName"].ToString();
        //    var user = await _userRepository.GetUserByEmailAsync("");

        //    return null;
        //}

        [HttpPost("GetBookingForUserByEmail")]
        public async Task<ActionResult<BookingDto>> GetBookingForUserByEmail([FromForm] FileDto model)
        {
            var user = await _userRepository.GetUserByEmailAsync(model.EmailAddress);

            if (user == null) return Ok(null);
            var bookings = await _bookingRepository.GetBookingsForUserNotAppearedAync(user);
            bool result = SaveFileAsync(model.MyFile).Result;
            return Ok(_mapper.Map<List<BookingDto>>(bookings));
        }

        [HttpPatch("{id}")]
        public async Task UpdateBookingToAppeared(int id)
        {
            await _bookingRepository.SetAppearForBooking(id);
            await _bookingRepository.Complete();
        }

        private async Task<bool> SaveFileAsync(IFormFile file)
        {
            if(file != null)
            {
                if (!Directory.Exists(AppDirectory))
                    Directory.CreateDirectory(AppDirectory);

                var fileName = DateTime.Now.Ticks.ToString() + Path.GetExtension(file.FileName);
                var path = Path.Combine(AppDirectory, fileName);

                using (var stream = new FileStream(path, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
                return true;
            }
            return false;
        }
    }
}
