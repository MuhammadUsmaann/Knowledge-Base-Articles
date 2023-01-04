using KBProject.Models;
using KBProject.Repositories.Interfaces;
using KBProject.TokenAuthentication;

using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

using System.Threading.Tasks;

namespace KBProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize("ADMIN,SME,USER")]
    public class HomeController : ControllerBase
    {
        private IArticleRepository _articleRepository;
        public HomeController(IArticleRepository articleRepository)
        {
            _articleRepository = articleRepository;
        }

        [HttpPost]
        [Route("GetArticles")]
        public async Task<ResponseObject<List<Article>>> GetArticles(SearchArticleRequest searchArticleRequest)
        {
            var article = await _articleRepository.GetArticles(searchArticleRequest);

            if (article == null)
                return new ResponseObject<List<Article>> { Message = "No article Found!", Result = null, Success = false };

            return new ResponseObject<List<Article>> { Message = "Successfully logged in.", Success = true, Result = article };
        }
    }
}
