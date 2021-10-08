using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRC_WebAPI.Models
{
  public class Course_Price
  {
    public int Course_Price_ID { get; set; }
    public int? Course_ID { get; set; }
    public float Price { get; set; }
    public DateTime Course_Price_Date { get; set; }

    public Course Course { get; set; }
  }
}
