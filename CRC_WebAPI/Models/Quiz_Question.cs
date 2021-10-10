using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRC_WebAPI.Models
{
  public class Quiz_Question
  {
    public int? Quiz_ID { get; set; }
    public int? Question_ID { get; set; }

    public Quiz Quiz { get; set; }
    public Question Question { get; set; }
  }
}
