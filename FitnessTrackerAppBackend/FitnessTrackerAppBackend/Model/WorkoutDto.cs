using System.ComponentModel.DataAnnotations;

namespace FitnessTrackerAppBackend.Model
{
    public class WorkoutDto
    {
        
            public string ExerciseName { get; set; }
            public decimal Duration { get; set; } // Duration in minutes
        

    }
}
