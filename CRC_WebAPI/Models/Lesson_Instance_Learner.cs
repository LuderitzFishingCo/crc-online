using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRC_WebAPI.Models
{
  public class Lesson_Instance_Learner
  {
    public int? Lesson_Instance_ID { get; set; }
    public int? Learner_ID { get; set; }

    public Lesson_Instance Lesson_Instance { get; set; }
    public Learner Learner { get; set; }

  }
}
