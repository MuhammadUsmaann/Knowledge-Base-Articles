using KBProject.Filters;
using KBProject.Models;
using KBProject.Repositories;
using KBProject.Repositories.Interfaces;
using KBProject.TokenAuthentication;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KBProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize("ADMIN")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        IUserRepository _userRepository;
        public UserController(ILogger<UserController> logger, IUserRepository userRepository)
        {
            _logger = logger;
            _userRepository = userRepository;

        }
        [Route("DeleteUser")]
        public async Task<ResponseObject<bool>> DeleteUser(int id)
        {
            var article = await _userRepository.DeleteUser(id);

            if (article == false)
                return new ResponseObject<bool> { Message = "No article Found!", Result = false, Success = false };
            return new ResponseObject<bool> { Message = "Successfully logged in.", Success = true, Result = article };
        }
        [HttpGet]
        [Route("GetAllUser")]
        public async Task<ResponseObject<List<User>>> GetAllUser()
        {
            var users = await _userRepository.GetAllUser();

            if (users == null && users.Count == 0)
                return new ResponseObject<List<User>> { Message = "No User Found!", Result = null, Success = false };

            return new ResponseObject<List<User>> { Message = "Successfully logged in.", Success = true, Result = users };

        }

        [HttpGet]
        [Route("GetUser")]
        public async Task<ResponseObject<User>> GetUser(int id)
        {
            var users = await _userRepository.GetById(id);

            if (users == null)
                return new ResponseObject<User> { Message = "No User Found!", Result = null, Success = false };

            if(users.Role == "user")
            {
                users.AssociatedUsers = await _userRepository.GetAssociatedUsers(id);
            }
            return new ResponseObject<User> { Message = "Successfully logged in.", Success = true, Result = users };

        }

        [HttpGet]
        [Route("AssociateUser")]
        public async Task<ResponseObject<bool>> AssociateUser(int id, int userid)
        {
            var users = await _userRepository.AssociateUser(id, userid);

            if (users == true)
                return new ResponseObject<bool> { Message = "No User Found!", Result = true, Success = false };

            return new ResponseObject<bool> { Message = "Successfully logged in.", Success = true, Result = users };

        }
        [HttpGet]
        [Route("GetSMEUser")]
        public async Task<ResponseObject<List<AssociatedUser>>> GetSMEUser(int id)
        {
            var users = await _userRepository.GetSMEUser(id);

            if (users == null)
                return new ResponseObject<List<AssociatedUser>> { Message = "No User Found!", Result = null, Success = false };

            return new ResponseObject<List<AssociatedUser>> { Message = "Successfully logged in.", Success = true, Result = users };

        }

        [HttpPost]
        public async Task<bool> UpdateProfile(User user)
        {
            return await _userRepository.UpdateProfile(user);
        }
        [HttpPost]
        public async Task<bool> UpdatePassword(string OldPassword, string NewPassword)
        {
            //return await _userRepository.UpdateProfile(user);

            return true;
        }
        [HttpPost]
        [Route("SaveUser")]
        public async Task<bool> SaveUser(User user)
        {
            return await _userRepository.SaveUser(user);
        }

    }
}
