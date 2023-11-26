using FHSquareLibrary.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FHSquareLibrary.Repos
{
    public class EFOrderRepo:IOrderRepo
    {
        FHSquareContextDB ctx = new FHSquareContextDB();
        public async Task AddOrder(Order order)
        {
            ctx.Orders.Add(order);
            await ctx.SaveChangesAsync();
        }

        public async Task CancelOrder(int orderId)
        {
            Order order = await GetOrderById(orderId);
            ctx.Orders.Remove(order);
            await ctx.SaveChangesAsync();
        }

        public async Task<Order> GetOrderById(int orderId)
        {
            try
            {
                Order order = await (from o in ctx.Orders where o.OrderId == orderId select o).FirstAsync();
                return order;
            }
            catch (Exception)
            {
                throw new Exception("No Order found with this Id");
            }
        }

        public async Task<List<Order>> GetOrdersByUserName(string userName)
        {
            try
            {
                List<Order> order = await (from o in ctx.Orders where o.UserName == userName select o).ToListAsync();
                return order;
            }
            catch (Exception)
            {
                throw new Exception("No Order found with this Id");
            }
        }

        public async Task UpdateOrder(int OrderId, Order order)
        {
            Order order1 = await GetOrderById(OrderId);
            order1.OrderDate = order.OrderDate;
            order1.OrderedQuantity = order.OrderedQuantity;
            order1.TotalAmount = order.TotalAmount;
            await ctx.SaveChangesAsync();

        }
    }
}
