using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JAPChallenge.Models;

namespace JAPChallenge.Dtos
{
    public class ContractResponseDto
    {
        public int Id { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int InitialMileage { get; set; }
        public decimal Total { get; set; }
    }
}