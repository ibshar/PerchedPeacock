using System;

namespace PerchedPeacock.Models
{
    public class ParkingInfo
    {
        public long Id { get; set; }
        public string VehicleNo { get; set; }
        public int VehicleWeight { get; set; }
        public int LotId { get; set; }
        public int ParkingLotId { get; set; }
        public int Duration { get; set; }
        public int Amount => Duration * 100;
    }
}
