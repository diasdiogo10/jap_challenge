using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JAPChallenge.Data;
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

        public ClientsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> AddClient(Client client)
        {
            var emailExists = await _context.Clients
                    .AnyAsync(c => c.Email == client.Email);

            if (emailExists)
            {
                return Conflict(new { message = "A client with this email already exists." });
            }

            _context.Clients.Add(client);
            await _context.SaveChangesAsync();

            return Ok(client);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClient(int id)
        {
            var existingClient = _context.Clients.FirstOrDefault(client => client.Id == id);

            if (existingClient == null)
            {
                return NotFound();
            }

            _context.Clients.Remove(existingClient);
            await _context.SaveChangesAsync();

            return Ok(existingClient);
        }

        [HttpGet]
        public async Task<IActionResult> GetClients()
        {
            var clients = await _context.Clients.ToListAsync();
            await _context.SaveChangesAsync();

            return Ok(clients);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateClient(int id, Client client)
        {
            var existingClient = _context.Clients.FirstOrDefault(client => client.Id == id);

            if (existingClient == null)
            {
                return NotFound();
            }

            var emailExists = await _context.Clients
                .AnyAsync(c => c.Email == client.Email);

            if (emailExists)
            {
                return Conflict(new { message = "A client with this email already exists." });
            }

            existingClient.FullName = client.FullName;
            existingClient.Email = client.Email;
            existingClient.Phone = client.Phone;
            existingClient.DrivingLicense = client.DrivingLicense;

            await _context.SaveChangesAsync();

            return Ok(existingClient);
        }
    }
}