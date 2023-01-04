using KBProject.Models;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace KBProject.Repositories.Interfaces
{
    public interface IArticleRepository
    {
        Task<Article> GetById(int id);
        Task<bool> SaveArticle(Article article, int userId);
        Task<List<Article>> GetArticles(SearchArticleRequest searchArticleRequest, int currentUser, string role);
        Task<List<Article>> GetArticlesByUserId(int userId);
        Task<bool> DeleteArticle(int id);
    }
}
