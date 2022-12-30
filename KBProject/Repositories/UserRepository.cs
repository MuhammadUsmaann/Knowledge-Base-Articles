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
using System.Threading.Tasks;

namespace KBProject.Repositories
{
    public class UserRepository : IUserRepository
    {
        IDBService _dBService;
        public UserRepository(IDBService dBService) {
            _dBService = dBService;
        }
        public async Task<User> Authenticate(string username, string password)
        {
            var user = await _dBService.ExecuteQuery<User>("select * from user where username = @username and password = @password",
                                                     new { username, password });
            return user.FirstOrDefault();
        }

    }
}
