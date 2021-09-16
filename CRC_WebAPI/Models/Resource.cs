using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRC_WebAPI.Models
{
  public class Resource
  {
    public int Resource_ID { get; set; }
    public int? Resource_Type_ID { get; set; }
    public int? Lesson_ID { get; set; }
    public string Resource_Name { get; set; }
  }
}
