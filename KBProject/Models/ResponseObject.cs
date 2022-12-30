namespace KBProject.Models
{
    public class ResponseObject<T>
    {
        public T Result { get; set; }
        public bool Success { get; set; }
        public string Message { get; set; }
    }
}
