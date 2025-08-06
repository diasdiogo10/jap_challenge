using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JAPChallenge.Data;
using Microsoft.AspNetCore.Mvc;

namespace JAPChallenge.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VehiclesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public VehiclesController(AppDbContext context)
        {
            _context = context;
        }
    }
}