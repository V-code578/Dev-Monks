using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FHSquareLibrary.Models
{
    [Table("User")]
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        [StringLength(30)]
        public string UserName {  get; set; }

        [Required]
        [StringLength(15)]
        public string Password { get; set; }

        [Required]
        [StringLength(1)]
        public string Role { get; set; }

        public virtual ICollection<Cart> Carts { get; set; }
        public virtual ICollection<WishList> WishLists { get; set; }
        public virtual ICollection<Order> Orders { get; set; }

        public User()
        {
            Carts = new HashSet<Cart>();
            WishLists = new HashSet<WishList>();
            Orders = new HashSet<Order>();
        }
    }
}
