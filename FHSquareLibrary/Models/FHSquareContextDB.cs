using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FHSquareLibrary.Models
{
    public class FHSquareContextDB : DbContext
    {
        public FHSquareContextDB()
        {
            
        }

        public FHSquareContextDB(DbContextOptions<FHSquareContextDB> options) : base(options)
        {
            
        }

        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<Cart> Carts { get; set; }
        public virtual DbSet<WishList> WishLists { get; set; }
        public virtual DbSet<Coupon> Coupons { get; set; }
        public virtual DbSet<Order> Orders { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("data source=(localdb)\\MSSQLLocalDB; database=FHSquareDB; integrated security=true");
        }

    }
}
