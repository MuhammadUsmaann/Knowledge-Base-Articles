using KBProject.Models;

using Microsoft.AspNetCore.Mvc;

namespace KBProject.Controllers
{
    public class ControllerBaseAPI : ControllerBase
    {
        public int CurrentUserID
        {
            get
            {
                var user = HttpContext.Items["User"] as User;
                if(user == null)
                    return 0;

                return user.Id;
            }
        }
        public string CurrentUserRole
        {
            get
            {
                var user = HttpContext.Items["User"] as User;
                if (user == null)
                    return "";

                return user.Role;
            }
        }
    }
}
