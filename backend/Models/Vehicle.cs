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
        [Required(ErrorMessage = "Capacity is required.")]
        [Range(1, 9, ErrorMessage = "Capacity must be between 1 and 9.")]
        public int Capacity { get; set; }
        [Required(ErrorMessage = "Transmission type is required.")]
        public string TransmissionType { get; set; }
        [Required(ErrorMessage = "Plate Number is required.")]
        public string PlateNumber { get; set; }
        [Required(ErrorMessage = "Manufacture Year is required.")]
        [RegularExpression(@"^(18|19|20)\d{2}$", ErrorMessage = "Invalid year format.")]
        public int ManufactureYear { get; set; }
        [Required(ErrorMessage = "Fuel Type is required.")]
        public string FuelType { get; set; }
        [Required(ErrorMessage = "Price per day is required.")]
        [Range(0.01, double.MaxValue, ErrorMessage = "Price per day must be greater than 0.")]
        public decimal PricePerDay { get; set; }
        public string Status { get; set; } = "Disponível";

        public ICollection<Contract> Contracts { get; } = new List<Contract>();
    }
}