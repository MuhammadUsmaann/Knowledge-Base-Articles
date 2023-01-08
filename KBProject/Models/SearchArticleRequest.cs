namespace KBProject.Models
{
    public class SearchArticleRequest
    {
        public string SearchText { get; set; }
        public string Tags{ get; set; }
        public int UserId { get; set; }
        public string Title { get; set; }
    }
}
