using KBProject.Models;
using KBProject.TokenAuthentication;
using System.Threading.Tasks;

namespace KBProject.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task<User> Authenticate(string username, string password);
    }
}
