using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRC_WebAPI.Models
{
  public class Course
  {
    public int Course_ID { get; set; }
    public int? Course_Type_ID { get; set; }
    public string Course_Name { get; set; }
    public string Course_Description { get; set; }
    public string Course_Code { get; set; }
    public string Course_Picture { get; set; }
  }
}
