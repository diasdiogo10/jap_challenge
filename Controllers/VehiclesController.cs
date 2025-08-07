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

            _context.Vehicles.Remove(existingVehicle);
            await _context.SaveChangesAsync();

            var vehicleResponse = _mapper.Map<VehicleResponseDto>(existingVehicle);

            return Ok(vehicleResponse);
        }

        [HttpGet]
        public async Task<IActionResult> GetVehicles()
        {
            var vehicles = await _context.Vehicles.ToListAsync();
            await _context.SaveChangesAsync();

            var vehicleResponse = _mapper.Map<List<VehicleResponseDto>>(vehicles);

            return Ok(vehicleResponse);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetVehicleById(int id)
        {
            var vehicle = await _context.Vehicles.FindAsync(id);
            await _context.SaveChangesAsync();

            var vehicleResponse = _mapper.Map<VehicleResponseDto>(vehicle);

            return Ok(vehicleResponse);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVehicle(int id, VehicleAddDto vehicleAddDto)
        {
            var vehicle = _mapper.Map<Vehicle>(vehicleAddDto);
            var existingVehicle = _context.Vehicles.FirstOrDefault(vehicle => vehicle.Id == id);

            if (existingVehicle == null)
            {
                return NotFound();
            }

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

            existingVehicle.Brand = vehicle.Brand;
            existingVehicle.Model = vehicle.Model;
            existingVehicle.PlateNumber = vehicle.PlateNumber;
            existingVehicle.ManufactureYear = vehicle.ManufactureYear;
            existingVehicle.FuelType = vehicle.FuelType;
            existingVehicle.Status = "Disponível";

            await _context.SaveChangesAsync();

            var vehicleResponse = _mapper.Map<VehicleResponseDto>(existingVehicle);

            return Ok(vehicleResponse);
        }
    }
}