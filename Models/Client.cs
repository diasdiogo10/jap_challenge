using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace JAPChallenge.Models
{
    public class Client
    {
        public int Id { get; set; }
        [Required]
        public string FullName { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Phone { get; set; }
        [Required]
        public string DrivingLicense { get; set; }

        public ICollection<Contract> Contracts { get; } = new List<Contract>();
    }
}