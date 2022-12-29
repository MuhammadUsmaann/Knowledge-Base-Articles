using Microsoft.AspNetCore.Mvc;

namespace KBProject.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
