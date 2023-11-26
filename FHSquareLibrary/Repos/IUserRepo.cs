using FHSquareLibrary.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FHSquareLibrary.Repos
{
    public interface IUserRepo
    {
        Task<User> GetUserByUsername(string username);
        Task Register(User user);
        Task Login(User user);
        Task ForgotPassword(User user);
        Task DeleteUser(string username);
        Task<List<User>> GetAllUsers();
        Task Logout(User user);

    }
}
