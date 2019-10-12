using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PerchedPeacock.Models;

namespace PerchedPeacock.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ParkingInfoController : ControllerBase
    {
        private readonly PerchedPeacockContext _context;

        public ParkingInfoController(PerchedPeacockContext context)
        {
            _context = context;
        }

        // GET: api/ParkingInfo
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ParkingInfo>>> GetParkingInfos()
        {
            return await _context.ParkingInfos.ToListAsync();
        }

        // GET: api/ParkingInfo/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ParkingInfo>> GetParkingInfo(long id)
        {
            var parkingInfo = await _context.ParkingInfos.FindAsync(id);

            if (parkingInfo == null)
            {
                return NotFound();
            }

            return parkingInfo;
        }

        // PUT: api/ParkingInfo/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutParkingInfo(long id, ParkingInfo parkingInfo)
        {
            if (id != parkingInfo.Id)
            {
                return BadRequest();
            }

            _context.Entry(parkingInfo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ParkingInfoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/ParkingInfo
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<ParkingInfo>> PostParkingInfo(ParkingInfo parkingInfo)
        {
            _context.ParkingInfos.Add(parkingInfo);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetParkingInfo", new { id = parkingInfo.Id }, parkingInfo);
        }

        // DELETE: api/ParkingInfo/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ParkingInfo>> DeleteParkingInfo(long id)
        {
            var parkingInfo = await _context.ParkingInfos.FindAsync(id);
            if (parkingInfo == null)
            {
                return NotFound();
            }

            _context.ParkingInfos.Remove(parkingInfo);
            await _context.SaveChangesAsync();

            return parkingInfo;
        }

        private bool ParkingInfoExists(long id)
        {
            return _context.ParkingInfos.Any(e => e.Id == id);
        }
    }
}
