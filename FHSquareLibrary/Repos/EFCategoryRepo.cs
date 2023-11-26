using FHSquareLibrary.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FHSquareLibrary.Repos
{
    public class EFCategoryRepo : ICategoryRepo
    {
        FHSquareContextDB ctx = new FHSquareContextDB();
        public async Task AddCategory(Category category)
        {
            ctx.Categories.Add(category);
            await ctx.SaveChangesAsync();
        }

        public async Task DeleteCategory(int categoryId)
        {
            Category category = await GetCategoryById(categoryId);
            ctx.Categories.Remove(category);
            await ctx.SaveChangesAsync();
        }

        public async Task<List<Category>> GetAllCategories()
        {
            List<Category> categories = await ctx.Categories.ToListAsync();
            return categories;
        }

        public async Task<Category> GetCategoryById(int categoryId)
        {
            try
            {
                Category category = await (from ct in ctx.Categories where ct.CategoryId == categoryId select ct).FirstAsync();
                return category;
            }
            catch (Exception) 
            {
                throw new Exception("No Category found on this ID");
            }
        }

        public async Task<Category> GetCategoryByName(string categoryName)
        {
            try
            {
                Category category = await (from ct in ctx.Categories where ct.CategoryName == categoryName select ct).FirstAsync();
                return category;
            }
            catch(Exception)
            {
                throw new Exception("No Category by this Name");
            }
        }

        public async Task UpdateCategory(int categoryId, Category category)
        {
            Category ctg = await GetCategoryById(categoryId);
            ctg.CategoryName = category.CategoryName;
            await ctx.SaveChangesAsync();
        }
    }
}
