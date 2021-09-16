using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRC_WebAPI.Models
{
  public class Resource_Video
  {
    public int Resource_Video_ID { get; set; }
    public int Resource_ID { get; set; }
    public int Video_Duration { get; set; }
    public int Video_Format { get; set; }
  }
}
