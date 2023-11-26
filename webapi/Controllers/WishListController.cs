using FHSquareLibrary.Models;
using FHSquareLibrary.Repos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WishListController : ControllerBase
    {
        IWishListRepo wishlistRepo;
        public WishListController(IWishListRepo repo)
        {
            wishlistRepo = repo;
        }


        [HttpGet("ById/{wishListId}")]
        public async Task<ActionResult> GetWishListById(int wishListId)
        {
            try
            {
                WishList wishlist = await wishlistRepo.GetWishListById(wishListId);
                return Ok(wishlist);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("ByUserName/{userName}")]
        public async Task<ActionResult> GetWishListByUserName(string userName)
        {
            try
            {
                List<WishList> wishLists = await wishlistRepo.GetWishListByUserName(userName);
                return Ok(wishLists);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult> AddToWishList(WishList wishList)
        {
            await wishlistRepo.AddToWishList(wishList);
            return Created($"api/wishlist/{wishList.WishListId}", wishList);
        }

        [HttpDelete("DeleteById/{wishListId}")]
        public async Task<ActionResult> RemoveFromWishList(int wishListId)
        {
            await wishlistRepo.RemoveFromWishList(wishListId);
            return Ok();

        }

        [HttpDelete("Clear/{userName}")]
        public async Task<ActionResult> ClearWishList(string userName)
        {
            await wishlistRepo.ClearWishList(userName);
            return Ok();
        }
    }
}
