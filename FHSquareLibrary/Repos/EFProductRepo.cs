using FHSquareLibrary.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FHSquareLibrary.Repos
{
    public class EFProductRepo : IProductRepo
    {
        FHSquareContextDB ctx = new FHSquareContextDB();
        public async Task AddProduct(Product product)
        {
            ctx.Products.Add(product);
            await ctx.SaveChangesAsync();

        }

        public async Task DeleteProduct(int productId)
        {
            Product product = await GetProductById(productId);
            ctx.Products.Remove(product);
            await ctx.SaveChangesAsync();
        }

        public async Task<List<Product>> GetAllProducts()
        {
            List<Product> products = await ctx.Products.ToListAsync();
            return products;
        }

        public async Task<Product> GetProductById(int productId)
        {
            try
            {
                Product product = await (from p in ctx.Products where p.ProductId == productId select p).FirstAsync();
                return product;
            }
            catch (Exception)
            {
                throw new Exception("Product Not Found");
            }

        }

        public async Task<Product> GetProductByName(string productName)
        {
            try
            {
                Product product = await (from p in ctx.Products where p.ProductName == productName select p).FirstAsync();
                return product;
            }
            catch (Exception)
            {
                throw new Exception(" No Such Product Found With Such Name");
            }
        }

        public async Task<List<Product>> GetProductsByCategory(int categoryId)
        {
            try
            {
                List<Product> product = await (from p in ctx.Products where p.CategoryId == categoryId select p).ToListAsync();
                return product;
            }
            catch (Exception)
            {
                throw new Exception("No Such Product Found in Such category");
            }
        }

        public async Task UpdateProduct(int productId, Product product)
        {
            Product product1 = await GetProductById(productId);
            product1.ProductName = product.ProductName;
            product1.Description = product.Description;
            product1.Price = product.Price;
            product1.CategoryId = product.CategoryId;
            product1.StockQuantity = product.StockQuantity;
            await ctx.SaveChangesAsync();

        }
    }
}
