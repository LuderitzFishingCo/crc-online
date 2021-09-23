using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRC_WebAPI.Models
{
  public class Learner
  {
    public int Learner_ID { get; set; }
    public int? User_ID { get; set; }

    public virtual ICollection<Course_Instance_Learner> Course_Instance_Learners { get; set; }
    //public virtual ICollection<Learner_Quiz> Learner_Quizzes { get; set; }

  }
}
