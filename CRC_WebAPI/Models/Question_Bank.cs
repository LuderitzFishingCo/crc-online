using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRC_WebAPI.Models
{
  public class Question_Bank
  {
    public int Question_Bank_ID { get; set; }
    public int? Question_Bank_Category_ID { get; set; }
    public string Question_Bank_Name { get; set; }
  }
}
