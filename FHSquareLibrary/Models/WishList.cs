using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FHSquareLibrary.Models
{
    [Table("WishList")]
    public class WishList
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int WishListId { get; set; }

       
        [StringLength(30)]
        [ForeignKey("User")]
        public string UserName { get; set; }

        
        public virtual User? User { get; set; }

        [ForeignKey("Product")]
        public int ProductId { get; set; }

        
        public virtual Product? Product { get; set; }

        

    }
}
