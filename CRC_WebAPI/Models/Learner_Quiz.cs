using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRC_WebAPI.Models
{
  public class Learner_Quiz
  {
    public int Quiz_ID { get; set; }
    public int Learner_ID { get; set; }
    public float Result { get; set; }
    /*
    public Learner Learner { get; set; }
    public Quiz Quiz { get; set; }*/
  }
}
