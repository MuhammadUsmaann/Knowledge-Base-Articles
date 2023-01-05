using KBProject.DBAccess;
using KBProject.Models;
using KBProject.Repositories.Interfaces;

using Microsoft.AspNetCore.Http;
using Microsoft.IdentityModel.Tokens;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using static System.Runtime.InteropServices.JavaScript.JSType;

namespace KBProject.Repositories
{
    public class ArticleRepository : IArticleRepository
    {
        IDBService _dBService;
        IUserRepository _userRepository;
        public ArticleRepository(IDBService dBService, IUserRepository userRepository)
        {
            _dBService = dBService;
            _userRepository = userRepository;
        }
        public async Task<List<Article>> GetArticles(SearchArticleRequest searchArticleRequest, int currentUser, string role)
        {
            var articles = new List<Article>();
            string sql = "select a.*, u.FirstName + ' ' + u.LastName CreatedByName from [Articles]  a  join [user] u on u.Id=a.CreatedBy where (a.Title like '%" + searchArticleRequest.SearchText + "%' " +
                        " OR a.[Description] like '%" + searchArticleRequest.SearchText + "%'  ";

            if(!string.IsNullOrEmpty(searchArticleRequest.Tags))
            {
                var tags = "";
                var ss  = searchArticleRequest.Tags.Split(',');
                foreach( var ss2 in ss)
                {
                    tags += "OR a.Tags like '%" + ss2 +"%' ";
                }
                sql += tags;
            }

            sql += " )";

            if (role == "SME")
            {
                sql += " and a.CreatedBy = " + currentUser;
            }
            else if (role == "USER")
            {
                var associatedUser = await _userRepository.GetAssociatedUsers(currentUser);
                if (associatedUser != null && associatedUser.Count > 0)
                {
                    var users = string.Join(", ", associatedUser.Select(a => a.Id).ToArray());

                    sql += " and a.CreatedBy in (" + users + ")";
                }
            }

            articles = await _dBService.ExecuteQuery<Article>(sql);

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
    }
}
