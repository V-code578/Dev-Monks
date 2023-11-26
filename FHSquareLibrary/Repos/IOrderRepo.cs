using FHSquareLibrary.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FHSquareLibrary.Repos
{
    public interface IOrderRepo
    {
        Task<Order> GetOrderById(int orderId);
        Task<List<Order>> GetOrdersByUserName(string userName);
        Task AddOrder(Order order);
        Task UpdateOrder(int OrderId,Order order);
        Task CancelOrder(int orderId);
    }
}
