using FHSquareLibrary.Models;
using FHSquareLibrary.Repos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        ICategoryRepo categoryRepo;
        public CategoryController(ICategoryRepo repo)
        {
            categoryRepo = repo;
        }
        [HttpGet]
        public async Task<ActionResult> GetAllCategory()
        {
            List<Category> categories = await categoryRepo.GetAllCategories();
            return Ok(categories);
        }
        [HttpGet("ById/{categoryId}")]
        public async Task<ActionResult> GetCategoryById(int categoryId)
        {
            try
            {
                Category category = await categoryRepo.GetCategoryById(categoryId);
                return Ok(category);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }

        }
        [HttpGet("ByName/{categoryName}")]
        public async Task<ActionResult> GetCategoryByName(string categoryName)
        {
            try
            {
                Category category = await categoryRepo.GetCategoryByName(categoryName);
                return Ok(category);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }
        [HttpPost]
        public async Task<ActionResult> Insert(Category category)
        {
            await categoryRepo.AddCategory(category);
            return Created($"api/category/{category.CategoryId}", category);
        }
        [HttpPut]
        public async Task<ActionResult> Update(int categoryId, Category category)
        {
               await categoryRepo.UpdateCategory(categoryId, category);
               return Ok();
        }
        [HttpDelete]
        public async Task<ActionResult> Delete(int categoryId)
        {
            await categoryRepo.DeleteCategory(categoryId);
            return Ok();
        }


    }
}
