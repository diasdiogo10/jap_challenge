using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using JAPChallenge.Data;
using JAPChallenge.Dtos;
using JAPChallenge.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


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

            bool isOverlapping = await _context.Contracts.AnyAsync(c =>
                c.VehicleId == contractAddDto.VehicleId &&
                c.StartDate < contractAddDto.EndDate &&
                c.EndDate > contractAddDto.StartDate
            );

            if (isOverlapping)
            {
                return Conflict(new { message = "The vehicle is already rented in the selected period." });
            }

            var contractDays = (contract.EndDate - contract.StartDate).TotalDays;
            contract.Total = existingVehicle.PricePerDay * (decimal)contractDays;

            _context.Contracts.Add(contract);
            await _context.SaveChangesAsync();

            var contractResponse = _mapper.Map<ContractResponseDto>(contract);

            return Ok(contractResponse);
        }

        [HttpGet]
        public async Task<IActionResult> GetContracts()
        {
            var contracts = await _context.Contracts.ToListAsync();
            await _context.SaveChangesAsync();

            var contractResponse = _mapper.Map<List<ContractResponseDto>>(contracts);

            return Ok(contractResponse);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetContractById(int id)
        {
            var contract = await _context.Contracts.FindAsync(id);
            await _context.SaveChangesAsync();

            var contractResponse = _mapper.Map<ContractResponseDto>(contract);

            return Ok(contractResponse);
        }
    }
    
    
}