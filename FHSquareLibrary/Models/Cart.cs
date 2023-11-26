using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace FHSquareLibrary.Models
{
    [Table("Cart")]
    [PrimaryKey("UserName", "ProductId")]
    public class Cart
    {
        
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [StringLength(30)]
        [ForeignKey("User")]
        public string UserName { get; set; }

        
        public virtual User? User { get; set; }

        [ForeignKey("Product")]
        public int ProductId { get; set; }

        
        public virtual Product? Product { get; set; }

        [Required]
        public int Quantity { get; set; }

        // Add other properties or navigation properties as needed...

    }
}
