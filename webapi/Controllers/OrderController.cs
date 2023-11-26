using FHSquareLibrary.Models;
using FHSquareLibrary.Repos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        IOrderRepo orderRepo;
        public OrderController(IOrderRepo repo)
        {
            orderRepo = repo;
            
        }
        [HttpGet]
        public async Task<ActionResult> GetByUserName(string userName)
        {
            try
            {
                List<Order> orders = await orderRepo.GetOrdersByUserName(userName);
                return Ok(orders);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }
        [HttpGet("{orderId}")]
        public async Task<ActionResult> GetById(int orderId)
        {
            try
            {
               Order orders = await orderRepo.GetOrderById(orderId);
                return Ok(orders);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }

        }
        [HttpPost]
        public async Task<ActionResult> Insert(Order order)
        {
            await orderRepo.AddOrder(order);
            return Created($"api/order/{order.OrderId}", order);
        }

        [HttpPut]
        public async Task<ActionResult> Update(int OrderId, Order order)
        {
            await orderRepo.UpdateOrder(OrderId, order);
            return Ok(order);
        }

        [HttpDelete]
        public async Task<ActionResult> Delete(int orderId)
        {
            await orderRepo.CancelOrder(orderId);
            return Ok();
        }
    }
}
