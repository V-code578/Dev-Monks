using FHSquareLibrary.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FHSquareLibrary.Repos
{
    public class EFCartRepo : ICartRepo
    {
        FHSquareContextDB ctx = new FHSquareContextDB();
        public async Task AddToCart(Cart cart)
        {
            ctx.Carts.Add(cart);
            await ctx.SaveChangesAsync();
        }

        public async Task ClearCart(string userName)
        {
            List<Cart> carts = await GetCartByUserName(userName);
            ctx.Carts.RemoveRange(carts);
            await ctx.SaveChangesAsync();
        }

        public async Task<List<Cart>> GetCartByUserName(string userName)
        {
            try
            {
                List<Cart> carts = await (from cr in ctx.Carts where cr.UserName == userName select cr).ToListAsync();
                return carts;
            }
            catch(Exception) 
            {
                throw new Exception("No cart for this ID");
            }
        }

        public async Task<List<Cart>> GetAllCarts()
        {
            List<Cart> carts = await ctx.Carts.ToListAsync();
            return carts;
        }

        public async Task RemoveFromCart(string userName,int prodId)
        {
            Cart cart = await GetCartByUserNameAndProductId(userName, prodId);
            ctx.Carts.Remove(cart);
            await ctx.SaveChangesAsync();
        }

        public async Task UpdateCart(string userName, int prodId, Cart cart)
        {
             Cart cr = await GetCartByUserNameAndProductId(userName, prodId);
             cr.Quantity = cart.Quantity;
             await ctx.SaveChangesAsync();
        }

        public async Task<Cart> GetCartByUserNameAndProductId(string userName, int productId)
        {
            try
            {
                Cart cart = await (from ct in ctx.Carts where ct.UserName == userName &&  ct.ProductId == productId select ct).FirstAsync();
                return cart;
            }
            catch(Exception)
            {
                throw new Exception("Not Found");
            }
           
        }
    }
}
