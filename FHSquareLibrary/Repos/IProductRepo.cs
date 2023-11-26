using FHSquareLibrary.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FHSquareLibrary.Repos
{
    public interface IProductRepo
    {
        Task<Product> GetProductById(int productId);
        Task<Product> GetProductByName(string productName);
        Task<List<Product>> GetAllProducts();
        Task<List<Product>> GetProductsByCategory(int categoryId);
        Task AddProduct(Product product);
        Task UpdateProduct(int productId,Product product);
        Task DeleteProduct(int productId);
    }
}
