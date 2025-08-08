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
        [Required(ErrorMessage = "Brand is required.")]
        public string Brand { get; set; }
        [Required(ErrorMessage = "Model is required.")]
        public string Model { get; set; }
        [Required(ErrorMessage = "Plate Number is required.")]
        public string PlateNumber { get; set; }
        [Required(ErrorMessage = "Manufacture Year is required.")]
        [RegularExpression(@"^(18|19|20)\d{2}$", ErrorMessage = "Invalid year format.")]
        public int ManufactureYear { get; set; }
        [Required(ErrorMessage = "Fuel Type is required.")]
        public string FuelType { get; set; }
        public string Status { get; set; } = "Disponível";

        public ICollection<Contract> Contracts { get; } = new List<Contract>();
    }
}