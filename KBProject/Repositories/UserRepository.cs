using KBProject.DBAccess;
using KBProject.Models;
using KBProject.Repositories.Interfaces;
using KBProject.TokenAuthentication;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.Extensions.Options;
using System.Text;

namespace KBProject.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AppSettings _appSettings;

        IDBService _dBService;
        public UserRepository(IDBService dBService)
        {
            _dBService = dBService;
        }
        public async Task<User> Authenticate(string username, string password)
        {
            var user = await _dBService.ExecuteQuery<User>("select * from user where username = @username and password = @password",
                                                     new { username, password });
            return user.FirstOrDefault();
        }

        public async Task<List<User>> GetAllUser()
        {
            var users = await _dBService.ExecuteQuery<User>("select * from user");
            return users;
        }

        public User GetById(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> UpdateProfile(User user)
        {
            await _dBService.ExecuteQuery<bool>("update user set FirstName =@FirstName, Lastname =@LastName, email= @Email, role=@role where Id = @Id", new { user.FirstName, user.LastName, user.Email, user.Role, user.Id });
            return true;
        }

        public async Task<bool> UpdatePassword(ChangePasswordRequest user)
        {
            await _dBService.ExecuteQuery<bool>("update user set Password =@Password where Id = @Id", new { user.Password, user.NewPassword });
            return true;
        }
    }
}
