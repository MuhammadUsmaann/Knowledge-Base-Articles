using KBProject.Models;
using KBProject.TokenAuthentication;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace KBProject.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task<User> GetById(int id);
        Task<User> Authenticate(string username, string password);
        Task<List<User>> GetAllUser();
        Task<bool> UpdateProfile(User user);
        Task<bool> UpdatePassword(ChangePasswordRequest user);
        Task<bool> SaveUser(User user);
    }
}
