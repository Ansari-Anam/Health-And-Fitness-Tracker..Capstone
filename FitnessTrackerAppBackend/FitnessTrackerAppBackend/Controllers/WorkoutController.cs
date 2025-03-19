using System.Security.Claims;
using FitnessTrackerAppBackend.DataContext;
using FitnessTrackerAppBackend.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FitnessTrackerAppBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] // Protect API with JWT Auth
    public class WorkoutController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public WorkoutController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/workout/{userId}
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUserWorkouts(int userId)
        {
            var workouts = await _context.Workouts
                .Where(w => w.UserId == userId)
                .OrderByDescending(w => w.Date)
                .ToListAsync();

            if (workouts == null || workouts.Count == 0)
                return NotFound("No workouts found for this user.");

            return Ok(workouts);
        }

        // POST: api/workout
        [HttpPost]
        public async Task<IActionResult> AddWorkout([FromBody] WorkoutDto workoutDto)
        {
            var userIdClaim = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            Console.WriteLine($"Received: {workoutDto?.ExerciseName}, Duration: {workoutDto?.Duration}");

            if (workoutDto == null || string.IsNullOrWhiteSpace(workoutDto.ExerciseName) || workoutDto.Duration <= 0)
            {
                Console.WriteLine("Invalid data received!");
                return BadRequest("Invalid workout data.");
            }

            var fitnessInsight = await _context.FitnessInsights
                .Where(f => f.UserId == userIdClaim)
                .OrderByDescending(f => f.Date)
                .FirstOrDefaultAsync();

            if (fitnessInsight == null)
            {
                return NotFound("User's fitness data not found.");
            }


            double weightInKg = (double)fitnessInsight.Weight;
            double metValue = GetMETValue(workoutDto.ExerciseName);
            double caloriesBurned = metValue * weightInKg * (workoutDto.Duration / 60.0);

            var workout = new Workouts
            {
                UserId = userIdClaim,
                ExerciseName = workoutDto.ExerciseName,
                Duration = workoutDto.Duration,
                CaloriesBurned = Math.Round((decimal) caloriesBurned, 2),
                Date = DateTime.UtcNow
            };

            _context.Workouts.Add(workout);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Workout logged successfully.", caloriesBurned = workout.CaloriesBurned });
        }

        private double GetMETValue(string exerciseName)
        {
            var metValues = new Dictionary<string, double>(StringComparer.OrdinalIgnoreCase)
    {
        { "Running", 9.8 },
        { "Cycling", 7.5 },
        { "Walking", 3.8 },
        { "Swimming", 8.0 },
        { "Yoga", 3.0 },
        { "Strength Training", 6.0 },
        { "Jumping Rope", 12.0 }
    };

            // Return MET value if found, otherwise return a default value
            return metValues.ContainsKey(exerciseName) ? metValues[exerciseName] : 5.0; 
        }



        // DELETE: api/workout/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWorkout(int id)
        {
            var workout = await _context.Workouts.FindAsync(id);
            if (workout == null)
                return NotFound("Workout not found.");

            _context.Workouts.Remove(workout);
            await _context.SaveChangesAsync();
            return Ok(new { Message = "Workout deleted successfully!" });
        }

        
        private decimal CalculateCalories(string exerciseName, int duration, decimal weight)
        {
      
            var metValues = new Dictionary<string, decimal>(StringComparer.OrdinalIgnoreCase)
            {
                { "Running", 9.8m },
                { "Cycling", 7.5m },
                { "Walking", 3.8m },
                { "Swimming", 8.0m },
                { "Yoga", 3.0m },
                { "Strength Training", 6.0m },
                { "Jumping Rope", 12.0m }
            };

            // Get MET value based on exercise name, default to 5 if not found
            decimal metValue = metValues.ContainsKey(exerciseName) ? metValues[exerciseName] : 5.0m;

           
            return metValue * weight * (duration / 60.0m);
        }

        // Helper method to get UserId from JWT token
        private int GetUserIdFromToken()
        {
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == "UserId");
            return userIdClaim != null ? int.Parse(userIdClaim.Value) : 0;
        }
    }
    public class WorkoutDto
    {
        public string ExerciseName { get; set; }
        public int Duration { get; set; }
    }
}
