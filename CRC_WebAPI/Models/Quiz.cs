using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRC_WebAPI.Models
{
  public class Quiz
  {
    public int Quiz_ID { get; set; }
    public int? Lesson_ID { get; set; }
    public DateTime Due_Date { get; set; }
    public int Weight { get; set; }
  }
}
