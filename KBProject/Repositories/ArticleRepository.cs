using KBProject.DBAccess;
using KBProject.Models;
using KBProject.Repositories.Interfaces;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KBProject.Repositories
{
    public class ArticleRepository : IArticleRepository
    {
        IDBService _dBService;
        public ArticleRepository(IDBService dBService)
        {
            _dBService = dBService;
        }
        public async Task<List<Article>> GetArticles()
        {
            var articles = await _dBService.ExecuteQuery<Article>("select a.*, u.FirstName + ' ' + u.LastName CreatedByName from [Articles]  a  join [user] u on u.Id=a.CreatedBy");
            return articles;
        }

        public async Task<List<Article>> GetArticlesByUserId(int userId)
        {
            var articles = await _dBService.ExecuteQuery<Article>("select a.*, u.FirstName + ' ' + u.LastName CreatedByName from [Articles]  a  join [user] u on u.Id=a.CreatedBy where  a.createdBy=@id", new { id = userId });
            return articles;
        }

        public async Task<Article> GetById(int id)
        {
            var articles = await _dBService.ExecuteQuery<Article>("select a.*, u.FirstName + ' ' + u.LastName CreatedByName from [Articles] a   join [user] u on u.Id=a.CreatedBy where a.id=@id", new { id });
            return articles.FirstOrDefault();
        }

        public async Task<bool> DeleteArticle(int id)
        {
            await _dBService.ExecuteQuery<bool>("delete from [Articles] where id=@id", new { id });
            return true;
        }

        public async Task<bool> SaveArticle(Article article, int userId)
        {
            if (article.Id > 0)
            {
                await _dBService.ExecuteQuery<bool>("update article set Title =@Title, Tags =@Tags, Description= @Description where Id = @Id", new { article.Title, article.Tags, article.Description, article.Id });
            }
            else
            {
                await _dBService.ExecuteQuery<bool>("insert into [Articles] (Title, Tags , Description , CreateDate, CreatedBy)  values (@Title, @Tags,@Description, @CreateDate,@CreatedBy )", new { article.Title, article.Tags, article.Description, CreateDate = DateTime.Now.ToString(), CreatedBy = userId });
            }

            return true;
        }

        public async Task<List<Article>> SearchArticle(SearchArticleRequest searchArticleRequest)
        {
            var articles = await _dBService.ExecuteQuery<Article>("select a.*, u.FirstName + ' ' + u.LastName CreatedByName from [Articles]  a  join [user] u on u.Id=a.CreatedBy");
            return articles;
        }
    }
}
