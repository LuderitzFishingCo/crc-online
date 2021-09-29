using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRC_WebAPI.Models
{
  public class Lesson_Instance
  {
    public int Lesson_Instance_ID { get; set; }
    public int? Lesson_ID { get; set; }
    public int? Course_Instance_ID { get; set; }
    public int? Lesson_Slot_ID { get; set; }
    //public int? Learner_ID { get; set; }

    public Lesson Lesson { get; set; }
    public Course_Instance Course_Instance { get; set; }
    public Lesson_Slot Lesson_Slot { get; set; }
  }
}
