using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace CRC_WebAPI.Models
{
  public class Lesson
  {
    public int Lesson_ID { get; set; }
    public string Lesson_Name { get; set; }
    public string Lesson_Description { get; set; }
    public int Lesson_Number { get; set; }

    public virtual ICollection <Lesson_Instance> Lesson_Instances { get; set; }
    public virtual ICollection <Quiz> Quizzes { get; set; }
  }
}
