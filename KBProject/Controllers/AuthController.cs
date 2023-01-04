using KBProject.Models;

using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

using System.Linq;

using System;
using KBProject.Repositories.Interfaces;
using System.Threading.Tasks;
using KBProject.TokenAuthentication;
using System.Reflection;

namespace KBProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthenticationService _authenticationService;
        public AuthController(IAuthenticationService authenticationService)
        {
            _authenticationService = authenticationService;
        }


        [HttpPost]
        public async Task<ResponseObject<AuthenticateResponse>> Autherize([FromBody] AuthenticateRequest authenticate)
        {
            var response = await _authenticationService.Authenticate(authenticate);

            if (response == null)
                return new ResponseObject<AuthenticateResponse> { Message = "Username or Password is invalid", Result = null, Success = false };

            return new ResponseObject<AuthenticateResponse> { Message = "Successfully logged in.", Success = true, Result = response };
        }
    }
}
