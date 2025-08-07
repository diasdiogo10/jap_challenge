using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace JAPChallenge.Dtos
{
    public class ClientDto
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Full Name is required.")]
        public string FullName { get; set; }
        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid email format.")]
        public string Email { get; set; }
        [Required(ErrorMessage = "Phone is required.")]
        [DataType(DataType.PhoneNumber)]
        [RegularExpression(@"^(2\d{8}|9[1236]\d{7})$", ErrorMessage = "Invalid phone number format.")]
        public string Phone { get; set; }
        [Required(ErrorMessage = "DrivingLicense is required.")]
        public string DrivingLicense { get; set; }
    }
}