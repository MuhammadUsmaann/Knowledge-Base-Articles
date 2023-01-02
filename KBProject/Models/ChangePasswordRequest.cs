using System.ComponentModel.DataAnnotations;

namespace KBProject.Models
{
    public class ChangePasswordRequest
    {
        [Required]
        public string Password { get; set; }

        [Required]
        [Compare("Password")]
        public string ConfirmPassword { get; set; }

        [Required]
        public string NewPassword { get; set; }

    }
}
