using KBProject.Models;

using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

using System.Linq;

using System;
using KBProject.Repositories.Interfaces;
using System.Threading.Tasks;
using KBProject.TokenAuthentication;

namespace KBProject.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ITokenManager _tokenManager;
        private IUserRepository _userRepository;
        public AuthController(IUserRepository userRepository, ITokenManager tokenManager ) {
            _userRepository = userRepository;
            _tokenManager = tokenManager;
            
        }


        [HttpGet]
        public async Task<ResponseObject<Token>> Autherize(string userName, string password)
        {
            var result = await _tokenManager.Authenticate(userName, password);
            if (result != null)
            {
                return new ResponseObject<Token> { Message = "Logged in successfully!", Result = _tokenManager.NewToken(result.Username, result.Role), Success = true };
            }
            else
            {
                return new ResponseObject<Token> { Message = "You are not unauthorized!", Result = null, Success = false };
            }
        }
    }
}
