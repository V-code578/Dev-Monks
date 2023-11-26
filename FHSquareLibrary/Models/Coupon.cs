using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FHSquareLibrary.Models
{
    [Table("Coupon")]
    public class Coupon
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CouponId { get; set; }

        [Required]
        [StringLength(20)] // Adjust the length as needed
        public string CouponCode { get; set; }

        [Required]
        [Range(0, 100)] // Assuming the discount percentage is between 0 and 100
        public int DiscountPercentage { get; set; }

        [Required]
        public DateTime ValidFrom { get; set; }

        [Required]
        public DateTime ValidTill { get; set; }

        public virtual ICollection<Order> Orders { get; set; }

        public Coupon()
        {
            Orders = new HashSet<Order>();
        }

    }
}
