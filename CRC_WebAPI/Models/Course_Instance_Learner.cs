using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRC_WebAPI.Models
{
  public class Course_Instance_Learner
  {
    public int? Learner_ID { get; set; }
    public int? Course_Instance_ID { get; set; }
    public float Payment_Amount { get; set; }

    public Learner Learner { get; set; }

    public Course_Instance Course_Instance { get; set; }
  }
}
