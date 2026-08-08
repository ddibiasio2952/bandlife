using BandLife.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace BandLife.Data
{
    public class BandLifeDbContext : DbContext
    {
        public BandLifeDbContext(DbContextOptions<BandLifeDbContext> options) : base(options) 
        { 
        }
        
        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Event> Events {  get; set; } = null!;

    }
}
