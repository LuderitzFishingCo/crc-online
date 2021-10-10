using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRC_WebAPI.Models
{
  public class Teacher_Application_Status
  {
    public int Teacher_Application_Status_ID { get; set; }
    public string Status_Description { get; set; }

    public virtual ICollection<Teacher_Application> Teacher_Applications { get; set; }
  }
}
