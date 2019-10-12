using Microsoft.EntityFrameworkCore;

namespace PerchedPeacock.Models
{
    public class PerchedPeacockContext : DbContext
    {
        public PerchedPeacockContext(DbContextOptions<PerchedPeacockContext> options) : base(options)
        { }

        public DbSet<ParkingInfo> ParkingInfos { get; set; }
    }
}
