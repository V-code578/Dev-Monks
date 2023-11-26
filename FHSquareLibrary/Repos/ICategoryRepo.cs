using FHSquareLibrary.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FHSquareLibrary.Repos
{
    public interface ICategoryRepo
    {
        Task<Category> GetCategoryById(int categoryId);
        Task<Category> GetCategoryByName(string categoryName);
        Task<List<Category>> GetAllCategories();
        Task AddCategory(Category category);
        Task UpdateCategory(int categoryId, Category category);
        Task DeleteCategory(int categoryId);
    }
}
