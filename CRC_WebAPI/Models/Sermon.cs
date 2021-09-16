using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRC_WebAPI.Models
{
  public class Sermon
  {
    public int Sermon_ID { get; set; }
    public int Sermon_Topic_ID { get; set; }
    public DateTime Sermon_Date { get; set; }
    public string Sermon_Link { get; set; }
  }
}
