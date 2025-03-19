using FitnessTrackerAppBackend.Model;
using Microsoft.EntityFrameworkCore;

namespace FitnessTrackerAppBackend.DataContext
{
    public class ApplicationDbContext:DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options): base(options) { }
        public DbSet<Users> Users { get; set; }
        public DbSet<FitnessTrackerAppBackend.Model.FitnessInsights>? FitnessInsights { get; set; }
        public DbSet<Workouts> Workouts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<FitnessInsights>()
                .HasOne(fi => fi.Users)  // Each FitnessInsights has one User
                .WithMany(u => u.FitnessInsights) // One user has many FitnessInsights records
                .HasForeignKey(fi => fi.UserId) 
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Workouts>()
                .HasOne(w => w.Users)
                .WithMany(u => u.Workouts)
                .HasForeignKey(w => w.UserId)
                .OnDelete(DeleteBehavior.Cascade);


            base.OnModelCreating(modelBuilder);
        }
         

      

    }

}
