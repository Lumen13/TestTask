using Microsoft.EntityFrameworkCore;
using TestTask.Data;

namespace TestTask.EF
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(string connectionString) : base(_getContextOptions(connectionString))
        {

        }

        private static DbContextOptions<ApplicationContext> _getContextOptions(string connectionString)
        {
            var optionsBuilder = new DbContextOptionsBuilder<ApplicationContext>();
            optionsBuilder.UseNpgsql(connectionString);

            return optionsBuilder.Options;
        }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(builder =>
            {
                builder.HasKey(x => x.Id);
                builder.Property(x => x.Name).HasMaxLength(100);
            });
        }
    }
}
