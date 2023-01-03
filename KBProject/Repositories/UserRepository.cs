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
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Http.HttpResults;

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
            var users = await _dBService.ExecuteQuery<User>("select * from [user]");
            return users;
        }

        public async Task<List<AssociatedUser>> GetAssociatedUsers(int id)
        {
            var users = await _dBService.ExecuteQuery<AssociatedUser>("select distinct ab.Id,ab.FirstName, ab.LastName, ab.Email, a.acount [count] " +
                "from [user] u " +
                "join [AssociatedUsers] au on au.UserId = u.Id " +
                "join [user] ab on ab.id = au.AssociatedUserId " +
                "left join(select createdBy, count(*) acount from Articles group by createdBy)a on a.createdBy = au.AssociatedUserId " +
                "where u.id=@id", new { id });

            return users;
        }

        public async Task<User> GetById(int id)
        {
            var users = await _dBService.ExecuteQuery<User>("select * from [user] where id = @id", new { id });
            return users.FirstOrDefault();
        }

        public async Task<bool> UpdateProfile(User user)
        {
            await _dBService.ExecuteQuery<bool>("update  [user] set FirstName =@FirstName, Lastname = @LastName, email= @Email, role=@role where Id = @Id", new { user.FirstName, user.LastName, user.Email, user.Role, user.Id });
            return true;
        }
        public async Task<bool> SaveUser(User user)
        {
            if (user.Id > 0)
            {
                await _dBService.ExecuteQuery<bool>("update  [user] set FirstName =@FirstName, Lastname = @LastName, email= @Email, role=@role where Id = @Id", new { user.FirstName, user.LastName, user.Email, user.Role, user.Id });
            }
            else
            {
                await _dBService.ExecuteQuery<bool>("insert into [user] (FirstName, Lastname , email , role)  values (@FirstName, @LastName,@Email, @role )", new { user.FirstName, user.LastName, user.Email, user.Role });
            }

            return true;
        }

        public async Task<bool> UpdatePassword(ChangePasswordRequest user)
        {
            await _dBService.ExecuteQuery<bool>("update  [user] set Password =@Password where Id = @Id", new { user.Password, user.NewPassword });
            return true;
        }

        public async Task<bool> DeleteUser(int id)
        {
            await _dBService.ExecuteQuery<bool>("delete from [user]  where Id = @id", new { id });
            return true;
        }

        public async Task<List<AssociatedUser>> GetSMEUser(int id)
        {
            var users = await _dBService.ExecuteQuery<AssociatedUser>("select distinct ab.Id,ab.FirstName, ab.LastName, ab.Email, a.acount [count]  " +
                " from [user] ab " +
                " left join ( select createdBy, count(*) acount " +
                " from Articles  " +
                " group by createdBy) a on a.createdBy = ab.Id " +
                " where ab.Role = 'SME'  and ab.id not in (select AssociatedUSerId from AssociatedUsers where userid = @id)", new { id });
            return users;
        }

        public async Task<bool> AssociateUser(int id, int userid)
        {
            await _dBService.ExecuteQuery<bool>("insert into [AssociatedUsers] (userid , AssociatedUSerId, createDate, createdBy ) values (@Id, @userid, GETDATE(), 1)", new { id, userid });
            return true;
        }
    }
}
