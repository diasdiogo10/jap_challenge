using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using JAPChallenge.Data;
using JAPChallenge.Dtos;
using JAPChallenge.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JAPChallenge.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClientsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public ClientsController(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> AddClient(ClientDto clientDto)
        {
            var client = _mapper.Map<Client>(clientDto);
            
            var emailExists = await _context.Clients
                    .AnyAsync(c => c.Email == client.Email);

            if (emailExists)
            {
                return Conflict(new { message = "A client with this email already exists." });
            }

            _context.Clients.Add(client);
            await _context.SaveChangesAsync();

            var clientResponse = _mapper.Map<ClientDto>(client);

            return Ok(clientResponse);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClient(int id)
        {
            var existingClient = await _context.Clients
                .FirstOrDefaultAsync(client => client.Id == id);

            if (existingClient == null)
            {
                return NotFound("Client not found.");
            }

            var contractsExists = await _context.Contracts
                .AnyAsync(contract => contract.ClientId == id);

            if (contractsExists)
            {
                return Conflict(new { message = "There are active contracts for this client and they cannot be deleted." });
            }

            _context.Clients.Remove(existingClient);
            await _context.SaveChangesAsync();

            var clientResponse = _mapper.Map<ClientDto>(existingClient);

            return Ok(clientResponse);
        }


        [HttpGet]
        public async Task<IActionResult> GetClients()
        {
            var clients = await _context.Clients.ToListAsync();

            var clientResponse = _mapper.Map<List<ClientDto>>(clients);

            return Ok(clientResponse);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetClientById(int id)
        {
            var client = await _context.Clients.FindAsync(id);
            await _context.SaveChangesAsync();

            var clientResponse = _mapper.Map<ClientDto>(client);

            return Ok(clientResponse);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateClient(int id, ClientDto clientDto)
        {
            var client = _mapper.Map<Client>(clientDto);
            var existingClient = await _context.Clients.FirstOrDefaultAsync(client => client.Id == id);

            if (existingClient == null)
            {
                return NotFound("Client not found.");
            }

            var emailExists = await _context.Clients
                .AnyAsync(c => c.Email == client.Email);

            if (emailExists)
            {
                return Conflict(new { message = "A client with this email already exists." });
            }

            var contractsExists = await _context.Contracts.AnyAsync(contract => contract.ClientId == id);

            if (contractsExists)
            {
                return Conflict(new { message = "There are active contracts for this client and they cannot be updated." });
            }

            existingClient.FullName = client.FullName;
            existingClient.Email = client.Email;
            existingClient.Phone = client.Phone;
            existingClient.DrivingLicense = client.DrivingLicense;

            await _context.SaveChangesAsync();

            var clientResponse = _mapper.Map<ClientDto>(existingClient);

            return Ok(clientResponse);
        }
    }
}