using FHSquareLibrary.Models;
using FHSquareLibrary.Repos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        IProductRepo productRepo;

        public ProductController(IProductRepo repo)
        {
            productRepo = repo;
        }

        [HttpGet("AllProducts")]
        public async Task<ActionResult> GetAllProducts()
        {
            List<Product> products = await productRepo.GetAllProducts();
            return Ok(products);
        }

        [HttpGet("ProductById/{productId}")]
        public async Task<ActionResult> GetProductById(int productId)
        {
            try
            {
                Product product = await productRepo.GetProductById(productId);
                return Ok(product);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("ProductByName/{productName}")]
        public async Task<ActionResult> GetProductByName(string productName)
        {
            try
            {
                Product product = await productRepo.GetProductByName(productName);
                return Ok(product);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("ProductByCategory/{categoryId}")]
        public async Task<ActionResult> GetProductsByCategory(int categoryId)
        {
            try
            {
                List<Product> product = await productRepo.GetProductsByCategory(categoryId);
                return Ok(product);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult> AddProduct(Product product)
        {
            await productRepo.AddProduct(product);
            return Created($"api/product/{product.ProductId}", product);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateProduct(int productId, Product product)
        {
            await productRepo.UpdateProduct(productId, product);
            return Ok(product);
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteProduct(int productId)
        {
            await productRepo.DeleteProduct(productId);
            return Ok();
        }

    }
}
