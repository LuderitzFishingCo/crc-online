using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRC_WebAPI.Models
{
  public class Lesson_Slot
  {
    public int Lesson_Slot_ID { get; set; }
    public DateTime Lesson_Start { get; set; }
    public DateTime Lesson_End { get; set; }
  }
}
