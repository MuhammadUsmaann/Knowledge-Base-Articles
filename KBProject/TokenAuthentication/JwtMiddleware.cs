using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

using System.IdentityModel.Tokens.Jwt;
using System.Text;
using KBProject.TokenAuthentication;
using KBProject.Repositories.Interfaces;

namespace JWTTokenPOC.Helper
{
    public class JwtMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly AppSettings _appSettings;

        public JwtMiddleware(RequestDelegate next, IOptions<AppSettings> appSettings)
        {
            _next = next;
            _appSettings = appSettings.Value;
        }

        public async Task Invoke(HttpContext context, IUserRepository userService, IAuthenticationService authenticationService)
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            if (token != null)
                //Validate the token
                attachUserToContext(context, userService, authenticationService, token);
            await _next(context);

        }
        private void attachUserToContext(HttpContext context, IUserRepository userService, IAuthenticationService authenticationService, string token)
        {
            try
            {
                var userId = authenticationService.GetUserId(token);
                var Role = authenticationService.GetRoleType(token);

                context.Items["Role"] = Role;
                // attach user to context on successful jwt validation
                context.Items["User"] = userService.GetById(userId).Result;
            }
            catch (Exception)
            {
                // do nothing if jwt validation fails
                // user is not attached to context so request won't have access to secure routes
            }
        }
    }
}
