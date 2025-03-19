using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FitnessTrackerAppBackend.DataContext;
using FitnessTrackerAppBackend.Model;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;

namespace FitnessTrackerAppBackend.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class FitnessInsightsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public FitnessInsightsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/FitnessInsights
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FitnessInsights>>> GetFitnessInsights()
        {
          if (_context.FitnessInsights == null)
          {
              return NotFound();
          }
            return await _context.FitnessInsights.ToListAsync();
        }

        // GET: api/FitnessInsights/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FitnessInsights>> GetFitnessInsights(int id)
        {
          if (_context.FitnessInsights == null)
          {
              return NotFound();
          }
            var fitnessInsights = await _context.FitnessInsights.FindAsync(id);

            if (fitnessInsights == null)
            {
                return NotFound();
            }

            return fitnessInsights;
        }

        // PUT: api/FitnessInsights/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFitnessInsights(int id, FitnessInsights fitnessInsights)
        {
            if (id != fitnessInsights.FitnessInsightId)
            {
                return BadRequest();
            }

            _context.Entry(fitnessInsights).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FitnessInsightsExists(id))
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

        [HttpGet("history")]
        public async Task<ActionResult<IEnumerable<FitnessInsights>>> GetUserFitnessHistory()
        {
            // Get User ID from Token
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
            {
                return Unauthorized("Invalid User Token");
            }

            if (!int.TryParse(userIdClaim.Value, out int userId))
            {
                return Unauthorized("Invalid User ID format in token.");
            }

            // Fetch user-specific BMI history
            var insights = await _context.FitnessInsights
                .Where(fi => fi.UserId == userId)
                .OrderByDescending(fi => fi.Date) // Show latest first
                .ToListAsync();

            if (!insights.Any())
            {
                return NotFound("No BMI records found for this user.");
            }

            return Ok(insights);
        }

        // GET: api/FitnessInsights/latest
        [HttpGet("latest")]
        public async Task<ActionResult<FitnessInsights>> GetLatestUserFitnessInsight()
        {
            // Get User ID from Token
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
            {
                return Unauthorized("Invalid User Token");
            }

            if (!int.TryParse(userIdClaim.Value, out int userId))
            {
                return Unauthorized("Invalid User ID format in token.");
            }

            // Get the most recent record for the user
            var latestInsight = await _context.FitnessInsights
                .Where(fi => fi.UserId == userId)
                .OrderByDescending(fi => fi.Date)
                .FirstOrDefaultAsync();

            if (latestInsight == null)
            {
                return NotFound("No fitness insights found for this user.");
            }

            return Ok(latestInsight);
        }

        // POST: api/FitnessInsights
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754


        [HttpPost]
        public async Task<ActionResult<FitnessInsights>> PostFitnessInsights(FitnessInsightsRequest request)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
            {
                return Unauthorized("Invalid User Token");
            }

            if (!int.TryParse(userIdClaim.Value, out int userId))
            {
                return Unauthorized("Invalid User ID format in token.");
            }

            // Validate height to avoid division by zero
            if (request.Height <= 0)
            {
                return BadRequest("Height must be greater than zero.");
            }

            // Calculate BMI
            decimal bmi = request.Weight / (request.Height * request.Height);

            // Create a new FitnessInsights object
            var fitnessInsights = new FitnessInsights
            {
                UserId = userId,  // Automatically set from JWT
                Weight = request.Weight,
                Height = request.Height,
                BMI = bmi,  // Calculated BMI
                ProgressNote = request.ProgressNote,
                Date = DateTime.UtcNow
            };

            // Save to database
            _context.FitnessInsights.Add(fitnessInsights);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFitnessInsights", new { id = fitnessInsights.FitnessInsightId }, fitnessInsights);
        }


        // DELETE: api/FitnessInsights/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFitnessInsights(int id)
        {
            if (_context.FitnessInsights == null)
            {
                return NotFound();
            }
            var fitnessInsights = await _context.FitnessInsights.FindAsync(id);
            if (fitnessInsights == null)
            {
                return NotFound();
            }

            _context.FitnessInsights.Remove(fitnessInsights);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FitnessInsightsExists(int id)
        {
            return (_context.FitnessInsights?.Any(e => e.FitnessInsightId == id)).GetValueOrDefault();
        }
    }
    public class FitnessInsightsRequest
    {
        public decimal Weight { get; set; }
        public decimal Height { get; set; }
        public string? ProgressNote { get; set; }
    }

}
