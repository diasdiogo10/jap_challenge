using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace JAPChallenge.Dtos
{
    public class VehicleResponseDto
    {
        public int Id { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public int Capacity { get; set; }
        public string TransmissionType { get; set; }
        public string PlateNumber { get; set; }
        public int ManufactureYear { get; set; }
        public string FuelType { get; set; }
        public decimal PricePerDay { get; set; }
        public string Status { get; set; } = "Disponível";
    }
}