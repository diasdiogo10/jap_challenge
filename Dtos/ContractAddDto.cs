using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace JAPChallenge.Dtos
{
    public class ContractAddDto
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Start date is required.")]
        [DataType(DataType.Date)]
        public DateTime StartDate { get; set; }
        [Required(ErrorMessage = "End date is required.")]
        [DataType(DataType.Date)]
        public DateTime EndDate { get; set; }
        [Required(ErrorMessage = "Initial mileage is required.")]
        [Range(0, int.MaxValue, ErrorMessage = "Mileage must be a positive number.")]
        public int InitialMileage { get; set; }

        [Required(ErrorMessage = "Client is required.")]
        public int ClientId { get; set; }

        [Required(ErrorMessage = "Vehicle is required.")]
        public int VehicleId { get; set; }
    }
}