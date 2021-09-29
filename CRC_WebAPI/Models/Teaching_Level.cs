using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRC_WebAPI.Models
{
  public class Teaching_Level
  {
    public int Teaching_Level_ID { get; set; }
    public string Teaching_Level_Description { get; set; }

    public virtual ICollection<Teacher> Teacher { get; set; }
    public virtual ICollection <Teacher_Application> Teacher_Applications { get; set; }
  }
}
