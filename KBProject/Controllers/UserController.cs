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
        public async Task<List<User>> GetAllUser()
        {
            var users  = await _userRepository.GetAllUser();
            return users;
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
    }
}
