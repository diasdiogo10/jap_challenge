using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using JAPChallenge.Data;
using JAPChallenge.Dtos;
using JAPChallenge.Models;
using Microsoft.AspNetCore.Mvc;


namespace JAPChallenge.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContractsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public ContractsController(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> addContract(ContractAddDto contractAddDto)
        {
            var contract = _mapper.Map<Contract>(contractAddDto);
            var existingClient = _context.Clients.FirstOrDefault(client => client.Id == contractAddDto.ClientId);

            if (existingClient == null)
            {
                return NotFound();
            }

            var existingVehicle = _context.Vehicles.FirstOrDefault(vehicle => vehicle.Id == contractAddDto.VehicleId);

            if (existingVehicle == null)
            {
                return NotFound();
            }

            if (existingVehicle.Status == "Alugado")
            {
                return Conflict(new { message = "The vehicle is already rented." });
            }
            
            var CurrentDate = DateTime.Today;

            if (CurrentDate > contractAddDto.StartDate)
            {
                return Conflict(new { message = "The start date must be later than or equal to today's date." });
            }

            if (contractAddDto.StartDate >= contractAddDto.EndDate)
            {
                return Conflict(new { message = "The end date must be later than the start date." });
            }

            existingVehicle.Status = "Alugado";

            _context.Vehicles.Update(existingVehicle);
            _context.Contracts.Add(contract);
            await _context.SaveChangesAsync();

            var contractResponse = _mapper.Map<ContractResponseDto>(contract);

            return Ok(contractResponse);
        }
    }
}