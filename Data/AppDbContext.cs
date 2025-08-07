using JAPChallenge.Models;
using Microsoft.EntityFrameworkCore;

namespace JAPChallenge.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options) { }

        public DbSet<Client> Clients { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<Contract> Contracts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Client>()
                .HasIndex(c => c.Email)
                    .IsUnique();

            modelBuilder.Entity<Client>()
                .HasMany(c => c.Contracts)
                .WithOne(c => c.Client)
                .HasForeignKey(c => c.ClientId)
                .HasPrincipalKey(c => c.Id);

            modelBuilder.Entity<Vehicle>()
                .HasIndex(v => v.PlateNumber)
                    .IsUnique();

            modelBuilder.Entity<Vehicle>()
                .HasMany(v => v.Contracts)
                .WithOne(c => c.Vehicle)
                .HasForeignKey(c => c.VehicleId)
                .HasPrincipalKey(c => c.Id);
        }
    }
}