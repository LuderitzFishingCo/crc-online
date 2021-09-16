using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRC_WebAPI.Models
{
  public class Password_History
  {
    public int Password_ID { get; set; }
    public string Current_Password { get; set; }
    public string Previous_Password { get; set; }
  }
}
