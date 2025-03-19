using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FitnessTrackerAppBackend.DataContext;
using FitnessTrackerAppBackend.Model;
using FitnessTrackerAppBackend.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration.UserSecrets;

namespace FitnessTrackerAppBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly AuthService _authService;

        public UsersController(ApplicationDbContext context, AuthService authService)
        {
            _context = context;
            _authService = authService;

        }

        // GET: api/Users
        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Users>>> GetUsers()
        {
          if (_context.Users == null)
          {
              return NotFound();
          }
            return await _context.Users.ToListAsync();
        }

        // GET: api/Users
        [HttpGet("{id}")]
        public async Task<ActionResult<Users>> GetUsers(int id)
        {
          if (_context.Users == null)
          {
              return NotFound();
          }
            var users = await _context.Users.FindAsync(id);

            if (users == null)
            {
                return NotFound();
            }

            return users;
        }

        // PUT: api/Users
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsers(int id, Users users)
        {
            if (id != users.UserId)
            {
                return BadRequest();
            }

            _context.Entry(users).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsersExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Users
        [HttpPost("signup")]
        public async Task<ActionResult<Users>> SignUp([FromBody] SignupPost signupPost)
        {
            if (await _context.Users.AnyAsync(u => u.Email == signupPost.Email))
            {
                return BadRequest(new { message = "Email Already Exists." });
            }

            // ✅ Map SignupPost to Users entity before saving
            var newUser = new Users
            {
                Username = signupPost.FullName, 
                Email = signupPost.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(signupPost.UserPassword),
                Role = "Customer"
            };

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUsers), new { id = newUser.UserId }, newUser);
        }

        [HttpPost("login")]
        public async Task<ActionResult<object>> Login([FromBody] LoginRequest loginRequest)
        {
            var dbUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == loginRequest.Email);
            if (dbUser == null || !BCrypt.Net.BCrypt.Verify(loginRequest.UserPassword, dbUser.PasswordHash))
            {
                return Unauthorized(new { message = "Invalid credentials" });
            }

            var token = _authService.GenerateJwtToken(dbUser);
            return Ok(new { token, userId = dbUser.UserId, role = dbUser.Role });
        }


        // DELETE: api/Users
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsers(int id)
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            var users = await _context.Users.FindAsync(id);
            if (users == null)
            {
                return NotFound();
            }

            _context.Users.Remove(users);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UsersExists(int id)
        {
            return (_context.Users?.Any(e => e.UserId == id)).GetValueOrDefault();
        }
    }
    public class LoginRequest
    {
        public string? Email {get; set;}
        public string? UserPassword {get; set;}
    }
    public class SignupPost
    {
        public string? FullName { get; set; }
        public string? Email { get; set; }
        public string? UserPassword { get; set; }

    }
}
