using FHSquareLibrary.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FHSquareLibrary.Repos
{
    public class EFWishListRepo  : IWishListRepo
    {
        FHSquareContextDB ctx = new FHSquareContextDB();
        public async Task AddToWishList(WishList wishList)
        {
            ctx.WishLists.Add(wishList);
            await ctx.SaveChangesAsync();
        }

        public async Task ClearWishList(string userName)
        {
            List<WishList> wishList = await GetWishListByUserName(userName);
            ctx.WishLists.RemoveRange(wishList);
            await ctx.SaveChangesAsync();
        }

        public async Task<WishList> GetWishListById(int wishListId)
        {
            try
            {
                WishList wishList = await (from w in ctx.WishLists where w.WishListId == wishListId select w).FirstAsync();
                return wishList;
            }
            catch (Exception)
            {
                throw new Exception("No Such WishList Found with given Id");
            }
        }

        public async Task<List<WishList>> GetWishListByUserName(string userName)
        {
            try
            {
                List<WishList> wishList = await (from w in ctx.WishLists where w.UserName == userName select w).ToListAsync();
                return wishList;
            }
            catch (Exception)
            {
                throw new Exception("No Such WishList Found with given Id");
            }
        }

        public async Task RemoveFromWishList(int wishListId)
        {
            WishList wishList = await GetWishListById(wishListId);
            ctx.WishLists.Remove(wishList);
            await ctx.SaveChangesAsync();
        }
    }
}

