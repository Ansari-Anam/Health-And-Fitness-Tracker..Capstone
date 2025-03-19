using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace FitnessTrackerAppBackend.Model
{
    public class Workouts
    {
        
    [Key]
        public int WorkoutId { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public string ExerciseName { get; set; }

        [Required]
        public decimal Duration { get; set; } // Duration in minutes

        public decimal CaloriesBurned { get; set; }

        [Required]
        public DateTime Date { get; set; }

        // Foreign key relationship
        [ForeignKey("UserId")]
        public virtual Users Users { get; set; }
    }
}
