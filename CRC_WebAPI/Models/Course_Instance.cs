using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRC_WebAPI.Models
{
  public class Course_Instance
  {
    public int Course_Instance_ID { get; set; }
    public int? Course_ID { get; set; }
    public DateTime Course_Instance_Start_Date { get; set; }
    public DateTime Course_Instance_End_Date { get; set; }

    public Course Course { get; set; }

    public virtual ICollection<Lesson_Instance> Lesson_Instances { get; set; }
    public Course_Instance_Learner Course_Instance_Learner;

  }
}
