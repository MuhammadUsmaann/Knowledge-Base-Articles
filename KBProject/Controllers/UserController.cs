using KBProject.Filters;
using KBProject.Models;
using KBProject.Repositories.Interfaces;

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

    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        IUserRepository _userRepository;
        public UserController(ILogger<UserController> logger, IUserRepository userRepository)
        {
            _logger = logger;
            _userRepository = userRepository;

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

            return new ResponseObject<User> { Message = "Successfully logged in.", Success = true, Result = users };

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
