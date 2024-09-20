using Microsoft.EntityFrameworkCore;
using StockCheckSystem.API.Models;

namespace StockCheckSystem.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }
    }
}
