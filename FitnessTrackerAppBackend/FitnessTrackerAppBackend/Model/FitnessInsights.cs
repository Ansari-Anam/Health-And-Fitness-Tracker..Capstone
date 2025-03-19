using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FitnessTrackerAppBackend.Model
{
    public class FitnessInsights
    {
        [Key]
        public int FitnessInsightId { get; set;}
        [ForeignKey("UserId")]
        public int UserId { get; set;}
        public decimal Weight { get; set; }
        public decimal Height { get; set; }
        public decimal BMI { get; set;}
        public string? ProgressNote { get; set; }
        public DateTime Date { get; set; } = DateTime.UtcNow;

        public Users? Users { get; set; }


    }
}
