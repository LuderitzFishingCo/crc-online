using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRC_WebAPI.Models
{
  public class Teacher
  {
    public int Teacher_ID { get; set; }
    public int? Teaching_Level_ID { get; set; }
    public int User_ID { get; set; }

    public User User { get; set; }
    public Teaching_Level Teaching_Level { get; set; }
  }
}
