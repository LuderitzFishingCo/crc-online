using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRC_WebAPI.Models
{
  public class Question
  {

    public int Question_ID { get; set; }
    public int? Question_Bank_ID { get; set; }
    public string Question_Asked { get; set; }
    public string Answer { get; set; }

    public Question_Bank Question_Bank { get; set; }
  }
}
