using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRC_WebAPI.Models
{
  public class Teacher_Application
  {
    public int Teacher_Application_ID { get; set; }
    public int? Teacher_Application_Status_ID { get; set; }
    public int? User_ID { get; set; }
    public DateTime Application_Date { get; set; }
    public string Application_Result { get; set; }
  }
}
