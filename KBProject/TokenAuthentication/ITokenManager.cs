using KBProject.Models;

using System.Threading.Tasks;

namespace KBProject.TokenAuthentication
{
    public interface ITokenManager
    {
        Task<User> Authenticate(string username, string password);
        Token NewToken(string username, string role);
        bool VerifyToken(string token);
    }
}