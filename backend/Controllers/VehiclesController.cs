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
    public class VehiclesController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public VehiclesController(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> AddVehicle(VehicleAddDto vehicleAddDto)
        {
            var vehicle = _mapper.Map<Vehicle>(vehicleAddDto);
            var PlateNumberExists = await _context.Vehicles.AnyAsync(v => v.PlateNumber == vehicle.PlateNumber);

            if (PlateNumberExists)
            {
                return Conflict(new { message = "A vehicle with this plate number already exists." });
            }

            int CurrentYear = DateTime.Now.Year;

            if (CurrentYear < vehicle.ManufactureYear)
            {
                return Conflict(new { message = "The manufacture year cannot be in the future." });
            }

            vehicle.Status = "Disponível";

            _context.Vehicles.Add(vehicle);
            await _context.SaveChangesAsync();

            var vehicleResponse = _mapper.Map<VehicleResponseDto>(vehicle);

            return Ok(vehicleResponse);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVehicle(int id)
        {
            var existingVehicle = _context.Vehicles.FirstOrDefault(vehicle => vehicle.Id == id);

            if (existingVehicle == null)
            {
                return NotFound();
            }

            if (existingVehicle.Status == "Alugado")
            {
                return Conflict(new { message = "The vehicle is currently rented and cannot be deleted." });
            }

            var today = DateTime.Today;

            var contractsExists = _context.Contracts.Any(contract => contract.VehicleId == id && contract.EndDate >= today);

            if (contractsExists)
            {
                return Conflict(new { message = "Vehicle has active contracts and cannot be deleted." });
            }

            _context.Vehicles.Remove(existingVehicle);
            await _context.SaveChangesAsync();

            var vehicleResponse = _mapper.Map<VehicleResponseDto>(existingVehicle);

            return Ok(vehicleResponse);
        }

        [HttpGet]
        public async Task<IActionResult> GetVehicles()
        {
            var today = DateTime.Today;

            var vehicles = await _context.Vehicles.ToListAsync();

            foreach (var vehicle in vehicles)
            {
                bool isRented = vehicle.Contracts.Any(c => c.StartDate <= today && c.EndDate >= today);
                vehicle.Status = isRented ? "Alugado" : "Disponível";
            }

            await _context.SaveChangesAsync();

            var vehicleResponse = _mapper.Map<List<VehicleResponseDto>>(vehicles);

            return Ok(vehicleResponse);
        }



       [HttpGet("{id}")]
        public async Task<IActionResult> GetVehicleById(int id)
        {
            var today = DateTime.Today;

            var vehicle = await _context.Vehicles.FirstOrDefaultAsync(v => v.Id == id);

            if (vehicle == null)
                return NotFound();

            bool isRented = vehicle.Contracts.Any(c => c.StartDate <= today && c.EndDate >= today);
            vehicle.Status = isRented ? "Alugado" : "Disponível";

            await _context.SaveChangesAsync();

            var vehicleResponse = _mapper.Map<VehicleResponseDto>(vehicle);

            return Ok(vehicleResponse);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVehicle(int id, VehicleAddDto vehicleAddDto)
        {
            var vehicle = _mapper.Map<Vehicle>(vehicleAddDto);
            var existingVehicle = await _context.Vehicles.FirstOrDefaultAsync(v => v.Id == id);

            if (existingVehicle == null)
            {
                return NotFound();
            }

            var plateNumberExists = await _context.Vehicles.AnyAsync(v => v.PlateNumber == vehicle.PlateNumber && v.Id != id);

            if (plateNumberExists)
            {
                return Conflict(new { message = "A vehicle with this plate number already exists." });
            }

            var CurrentDate = DateTime.Today;

            if (CurrentDate.Year < vehicle.ManufactureYear)
            {
                return Conflict(new { message = "The manufacture year cannot be in the future." });
            }

            var contractsExists = _context.Contracts.Any(contract => contract.VehicleId == id && contract.EndDate >= CurrentDate);

            if (contractsExists)
            {
                return Conflict(new { message = "Vehicle has active contracts and cannot be deleted." });
            }

            existingVehicle.Brand = vehicle.Brand;
            existingVehicle.Model = vehicle.Model;
            existingVehicle.PlateNumber = vehicle.PlateNumber;
            existingVehicle.ManufactureYear = vehicle.ManufactureYear;
            existingVehicle.FuelType = vehicle.FuelType;

            var today = DateTime.Today;
            
            bool isRented = existingVehicle.Contracts.Any(c => c.StartDate <= today && c.EndDate >= today);
            existingVehicle.Status = isRented ? "Alugado" : "Disponível";

            await _context.SaveChangesAsync();

            var vehicleResponse = _mapper.Map<VehicleResponseDto>(existingVehicle);

            return Ok(vehicleResponse);
        }
    }
}