using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FHSquareLibrary.Models
{
    [Table("Order")]
    public class Order
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int OrderId { get; set; }

        [StringLength(30)]
        [ForeignKey("User")]
        public string UserName { get; set; }

        public virtual User? User { get; set; }

        [ForeignKey("Product")]
        public int ProductId { get; set; }

        public virtual Product? Product { get; set; }

        [Required]
        public DateTime OrderDate { get; set; }

        [Required]
        public int OrderedQuantity { get; set; }

        [Required]
        [Column(TypeName = "decimal(18, 2)")] // Adjust precision and scale as needed
        public decimal TotalAmount { get; set; }

        [ForeignKey("Coupon")]
        public int? CouponId { get; set; } // Nullable foreign key

        
        public virtual Coupon? Coupon { get; set; }

        // Add other properties or navigation properties as needed...

    }
}
