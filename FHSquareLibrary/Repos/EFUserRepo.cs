using FHSquareLibrary.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FHSquareLibrary.Repos
{
    public class EFUserRepo : IUserRepo
    {
        FHSquareContextDB ctx = new FHSquareContextDB();
        public async Task DeleteUser(string username)
        {
             User user = await GetUserByUsername(username);
            ctx.Users.Remove(user);
            await ctx.SaveChangesAsync();
        }

        public async Task ForgotPassword(User user)
        {
            User usr = await GetUserByUsername(user.UserName);
            usr.Password = user.Password;
            await ctx.SaveChangesAsync();
        }

        public async Task<List<User>> GetAllUsers()
        {
            List<User> users = await ctx.Users.ToListAsync();
            return users;
        }

        public async Task<User> GetUserByUsername(string username)
        {
            try
            {
                User user = await (from u in ctx.Users where u.UserName == username select u).FirstAsync();
                return user;
            }
            catch(Exception) {
                throw new Exception("No such user");
            }
            
        }

        public async Task Login(User user)
        {
            try
            {
                User usr = await GetUserByUsername(user.UserName);
                if (!user.Password.Equals(usr.Password))
                    throw new Exception();

                if(!user.Role.Equals(usr.Role))
                    throw new Exception();
            }
            catch (Exception)
            {
                throw new Exception("Invalid UserName or Password");
            }
        }

        public Task Logout(User user)
        {
            throw new NotImplementedException();
        }

        public async Task Register(User user)
        {
            ctx.Users.Add(user);
            await ctx.SaveChangesAsync();
        }
    }
}
