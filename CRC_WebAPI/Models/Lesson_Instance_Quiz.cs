using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRC_WebAPI.Models
{
  public class Lesson_Instance_Quiz
  {
    public int? Lesson_Instance_ID { get; set; }
    public int? Quiz_ID { get; set; }
    public int Result { get; set; }
  }
}
