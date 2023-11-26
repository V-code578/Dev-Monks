using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FHSquareLibrary.Models
{
    [Table("Product")]
    public class Product
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ProductId { get; set; }

        [Required]
        [StringLength(30)] // Adjust the length as needed
        public string ProductName { get; set; }
        [Required]
        [StringLength(50)]
        public string Description { get; set; }

        [Required]
        [Column(TypeName = "decimal(18, 2)")] // Adjust precision and scale as needed
        public decimal Price { get; set; }

        [ForeignKey("Category")]
        public int CategoryId { get; set; }

        
        public virtual Category? Category { get; set; }

        [Required]
        public int StockQuantity { get; set; }

        public virtual ICollection<Cart> Carts { get; set; }
        public virtual ICollection<WishList> WishLists { get; set; }
        public virtual ICollection<Order> Orders { get; set; }

        public Product()
        {
            Carts = new HashSet<Cart>();
            WishLists = new HashSet<WishList>();
            Orders = new HashSet<Order>();
        }

    }
}
