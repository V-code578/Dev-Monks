using FHSquareLibrary.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FHSquareLibrary.Repos
{
    public interface IWishListRepo
    {
        Task<WishList> GetWishListById(int wishListId);
        Task<List<WishList>> GetWishListByUserName(string userName);
        Task AddToWishList(WishList wishList);
        Task RemoveFromWishList(int wishListId);
        Task ClearWishList(string userName);
    }
}
