using FHSquareLibrary.Models;
using FHSquareLibrary.Repos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        ICartRepo cartRepo;
        public CartController(ICartRepo repo)
        {
            cartRepo = repo;
        }


        [HttpGet("CartByUserName/{userName}")]
        public async Task<ActionResult> GetByUserName(string userName)
        {
            try
            {
                List<Cart> carts = await cartRepo.GetCartByUserName(userName);
                return Ok(carts);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }

        }

        [HttpGet("CartByUserNameandProductId/{userName}/{productId}")]
        public async Task<ActionResult> GetByUserNameAndProductId(string userName, int productId)
        {
            try
            {
                Cart cart = await cartRepo.GetCartByUserNameAndProductId(userName, productId);
                return Ok(cart);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }


        [HttpGet("GetAllCarts")]
        public async Task<ActionResult> GetAll()
        {
            try
            {
                List<Cart> carts = await cartRepo.GetAllCarts();
                return Ok(carts);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }


        [HttpPost("Add")]
        public async Task<ActionResult> Add(Cart cart)
        {
            await cartRepo.AddToCart(cart);
            return Created($"api/cart/{cart.UserName}", cart);
        }

        [HttpPut]
        public async Task<ActionResult> Update(string userName, int productId, Cart cart)
        {
            await cartRepo.UpdateCart(userName, productId, cart);
            return Ok(cart);
        }

        [HttpDelete]
        public async Task<ActionResult> Remove(string userName, int productId)
        {
            await cartRepo.RemoveFromCart(userName, productId);
            return Ok();
        }

        [HttpDelete("Clear/{userName}")]
        public async Task<ActionResult> Clear(string userName)
        {
            await cartRepo.ClearCart(userName);
            return Ok();
        }

    }
}
