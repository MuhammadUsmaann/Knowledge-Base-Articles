using System;

namespace KBProject.Models
{
    public class Article
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Tags { get; set; }
        public string Description { get; set; }
        public int CreatedBy { get; set; }
        public string CreatedByName { get; set; }
        public DateTime  CreateDate { get; set; } = DateTime.Now;
    }
}
