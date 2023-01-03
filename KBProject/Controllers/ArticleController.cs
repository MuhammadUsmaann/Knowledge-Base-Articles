using KBProject.Models;
using KBProject.Repositories;
using KBProject.Repositories.Interfaces;

using Microsoft.AspNetCore.Mvc;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace KBProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ArticleController : ControllerBase
    {
        private IArticleRepository _articleRepository;
        public ArticleController(IArticleRepository articleRepository)
        {
            _articleRepository = articleRepository;
        }
        [Route("GetById")]
        public async Task<ResponseObject<Article>> GetById(int id)
        {
            var article = await _articleRepository.GetById(id);

            if (article == null)
                return new ResponseObject<Article> { Message = "No article Found!", Result = null, Success = false };

            return new ResponseObject<Article> { Message = "Successfully logged in.", Success = true, Result = article };
        }
        [Route("DeleteArticle")]
        public async Task<ResponseObject<bool>> DeleteArticle(int id)
        {
            var article = await _articleRepository.DeleteArticle(id);

            if (article == false)
                return new ResponseObject<bool> { Message = "No article Found!", Result = false, Success = false };
            return new ResponseObject<bool> { Message = "Successfully logged in.", Success = true, Result = article };
        }
        [HttpPost]
        [Route("SaveArticle")]
        public async Task<ResponseObject<bool>> SaveArticle(Article article)
        {
            var result = await _articleRepository.SaveArticle(article, 3);

            if (!result)
                return new ResponseObject<bool> { Message = "No article Found!", Result = result, Success = false };

            return new ResponseObject<bool> { Message = "Successfully logged in.", Success = true, Result = result };
        }
        [Route("GetArticles")]
        public async Task<ResponseObject<List<Article>>> GetArticles()
        {
            var article = await _articleRepository.GetArticles();

            if (article == null)
                return new ResponseObject<List<Article>> { Message = "No article Found!", Result = null, Success = false };

            return new ResponseObject<List<Article>> { Message = "Successfully logged in.", Success = true, Result = article };
        }
        [Route("GetArticlesByUserId")]
        public async Task<ResponseObject<List<Article>>> GetArticlesByUserId(int userId)
        {
            var article = await _articleRepository.GetArticlesByUserId(userId);

            if (article == null)
                return new ResponseObject<List<Article>> { Message = "No article Found!", Result = null, Success = false };

            return new ResponseObject<List<Article>> { Message = "Successfully logged in.", Success = true, Result = article };
        }
        [Route("SearchArticle")]
        public async Task<ResponseObject<List<Article>>> SearchArticle(SearchArticleRequest searchArticleRequest)
        {
            var article = await _articleRepository.SearchArticle(searchArticleRequest);

            if (article == null)
                return new ResponseObject<List<Article>> { Message = "No article Found!", Result = null, Success = false };

            return new ResponseObject<List<Article>> { Message = "Successfully logged in.", Success = true, Result = article };
        }
    }
}
