using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRC_WebAPI.Models
{
  public class Learner_Quiz_Question
  {
    public int Learner_ID { get; set; }
    public int Quiz_ID { get; set; }
    public int Question_ID { get; set; }
    public string Learner_Answer { get; set; }

    public Learner Learner { get; set; }
    public Quiz Quiz { get; set; }
    public Question Question { get; set; }
  }
}
