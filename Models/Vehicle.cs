using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace JAPChallenge.Models
{
    public class Vehicle
    {
        public int Id { get; set; }
        [Required]
        public string Brand { get; set; }
        [Required]
        public string Model { get; set; }
        [Required]
        public string PlateNumber { get; set; }
        [Required]
        public int ManufactureYear { get; set; }
        [Required]
        public string FuelType { get; set; }
        public bool Status { get; set; }

        public ICollection<Contract> Contracts { get; } = new List<Contract>();
    }
}