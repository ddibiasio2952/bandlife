using BandLife.Models.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace BandLife.Data
{
    public class BandLifeDbContext : IdentityDbContext<ApplicationUser>
    {
        public BandLifeDbContext(
            DbContextOptions<BandLifeDbContext> options) 
            : base(options) 
        { 
        }
        
        public DbSet<Event> Events {  get; set; }
        public DbSet<EventOption> EventOptions { get; set; }

    }
}
