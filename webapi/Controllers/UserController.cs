using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FHSquareLibrary.Models;
using FHSquareLibrary.Repos;
using Microsoft.AspNetCore.Authorization;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class UserController : ControllerBase
    {
        IUserRepo userRepo;

        public UserController(IUserRepo repo)
        {
            userRepo = repo;
            
        }

        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            List<User> users = await userRepo.GetAllUsers();
            return Ok(users);
        }

        [HttpGet("{username}")]
        public async Task<ActionResult> GetOne(string username)
        {
            try
            {
                User user = await userRepo.GetUserByUsername(username);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult> RegisterUser(User user)
        {
            await userRepo.Register(user);
            return Created($"api/user/{user.UserName}", user);
        }

        [HttpPut]
        public async Task<ActionResult> ForgotPass(User user)
        {
            await userRepo.ForgotPassword(user);
            return Ok(user);
        }

        [HttpDelete]
        public async Task<ActionResult> Delete(string username)
        {
            await userRepo.DeleteUser(username);
            return Ok();
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login(User user)
        {
            try
            {
                await userRepo.Login(user);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return Unauthorized(ex.Message);
            }
        }
    }
}
