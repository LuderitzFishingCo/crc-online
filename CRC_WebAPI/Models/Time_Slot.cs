using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRC_WebAPI.Models
{
  public class Time_Slot
  {
    public int Time_Slot_ID { get; set; }
    public DateTime Start_Time { get; set; }
    public DateTime End_Time { get; set; }
  }
}
