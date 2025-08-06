using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace JAPChallenge.Models
{
    public class Contract
    {
    public int Id { get; set; }
    [Required]
    public DateTime StartDate { get; set; }
    [Required]
    public DateTime EndDate { get; set; }

    [Required]
    public int ClientId { get; set; }
    [Required]
    public Client Client { get; set; }

    [Required]
    public int VehicleId { get; set; }
    [Required]
    public Vehicle Vehicle { get; set; }
    }
}