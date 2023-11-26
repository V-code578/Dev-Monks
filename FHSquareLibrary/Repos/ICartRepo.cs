using FHSquareLibrary.Models;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FHSquareLibrary.Repos
{
    public interface ICartRepo
    {
        Task<List<Cart>> GetCartByUserName(string userName);
        Task<List<Cart>> GetAllCarts();
        Task AddToCart(Cart cart);
        Task UpdateCart(string userName, int prodId, Cart cart);
        Task RemoveFromCart(string userName, int prodId );
        Task ClearCart(string userName);

        Task<Cart> GetCartByUserNameAndProductId(string userName, int productId); 
    }
}
