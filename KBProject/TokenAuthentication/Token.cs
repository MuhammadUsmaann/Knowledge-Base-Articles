using System;

namespace KBProject.TokenAuthentication
{
    public class Token
    {
        public string Value { get; set; }
        public DateTime ExpireDate { get; set; }
        public string Username { get; set; }
        public string Role { get; set; }
    }
}
