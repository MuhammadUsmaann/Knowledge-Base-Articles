using KBProject.DBAccess;
using KBProject.Models;
using KBProject.Repositories.Interfaces;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KBProject.TokenAuthentication
{
    public class TokenManager : ITokenManager
    {
        private IUserRepository _userRepository;
        private List<Token> _listTokens;

        public TokenManager(IDBService bService, IUserRepository userRepository)
        {
            _listTokens = new List<Token>();
            _userRepository = userRepository;
        }

        public async Task<User> Authenticate(string username, string password)
        {
            if (!string.IsNullOrEmpty(username) && !string.IsNullOrEmpty(password))
            {
                var result = await _userRepository.Authenticate(username, password);
                return result;
            }
            return null;
        }
        public Token NewToken(string username, string role)
        {

            var token = new Token()
            {
                Value = Guid.NewGuid().ToString(),
                ExpireDate = DateTime.Now.AddDays(1)
            };

            _listTokens.Add(token);
            return token;
        }
        public bool VerifyToken(string token)
        {

            if (!string.IsNullOrEmpty(token) && _listTokens.Any(x => x.Value == token && x.ExpireDate > DateTime.Now))
            {
                return true;
            }

            if (_listTokens.Any(x => x.Value == token))
            {
                _listTokens.Remove(_listTokens.Find(x => x.Value == token));
            }
            return false;
        }
    }
}
