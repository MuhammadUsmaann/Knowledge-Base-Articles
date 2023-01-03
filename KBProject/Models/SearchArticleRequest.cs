namespace KBProject.Models
{
    public class SearchArticleRequest
    {
        public string Title { get; set; }
        public string Tags{ get; set; }
        public int UserId { get; set; }
    }
}
