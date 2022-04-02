using API.Extensions;
using Core.Entities;
using Core.Params;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
		private readonly UserManager<AppUser> _userManager;

		public AdminController(UserManager<AppUser> userManager)
		{
			_userManager = userManager;
		}

		[Authorize(Policy = "RequireAdminRole")]
		[HttpGet("users-with-roles")]
		public async Task<ActionResult> GetUsersWithRoles([FromQuery]UserParams userParams)
		{
			var query = _userManager.Users.Include(r => r.UserRoles)
				.ThenInclude(r => r.Role)
				.OrderBy(u => u.UserName)
				.Where(u => u.UserName != "admin")
				.AsQueryable();

			if (!string.IsNullOrWhiteSpace(userParams.SearchUsername))
			{
				query = query.Where(x => x.UserName.Contains(userParams.SearchUsername));
			}

			query = userParams.OrderBy switch
			{
				"username" => query.OrderByDescending(s => s.UserName),
				_ => query.OrderByDescending(s => s.CreationDate)
			};

			var users = await PagedList<AppUser>.CreateAsync(query, userParams.PageNumber, userParams.PageSize);

			Response.AddPaginationHeader(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages);

			var newData = users.Select(u => new
			{
				u.Id,
				Username = u.UserName,
				FirstName = u.FirstName,
				LastName = u.LastName,
				Email = u.Email,
				DateOfBirth = u.DateOfBirth.ToString("dd/MM/yyyy"),
				CreationDate = u.CreationDate.ToString("dd/MM/yyyy HH:mm:ss"),
				IsDisabled = u.IsDisabled,
				Roles = u.UserRoles.Select(r => r.Role.Name).ToList()
			});
			return Ok(newData.ToList());
		}

		[Authorize(Policy = "RequireAdminRole")]
		[HttpPost("change-status/{username}")] 
		public async Task<ActionResult> ChangeUserStatus(string username)
        {
			var user = await _userManager.FindByNameAsync(username);

			if (user == null) return NotFound("Δεν ήταν δυνατή η εύρεση του χρήστη");

			user.IsDisabled = !user.IsDisabled;

			var result = await _userManager.UpdateAsync(user);

			if (!result.Succeeded) return BadRequest("Δεν ήταν δυνατή η αλλαγή του στατούς του χρήστη");

			return Ok(user.IsDisabled);
		}

		[HttpPost("edit-roles/{username}")]
		public async Task<ActionResult> EditRoles(string username, [FromQuery] string roles)
		{
			var selectedRoles = roles.Split(",").ToArray();

			var user = await _userManager.FindByNameAsync(username);

			if (user == null) return NotFound("Δεν ήταν δυνατή η εύρεση του χρήστη");

			var userRoles = await _userManager.GetRolesAsync(user);

			var result = await _userManager.AddToRolesAsync(user, selectedRoles.Except(userRoles));

			if (!result.Succeeded) return BadRequest("Δεν ήταν δυνατή η προσθήκη του ρόλου");

			result = await _userManager.RemoveFromRolesAsync(user, userRoles.Except(selectedRoles));

			if (!result.Succeeded) return BadRequest("Δεν ήταν δυνατή η αφαίρεση του ρόλου");

			return Ok(await _userManager.GetRolesAsync(user));
		}
	}
}
