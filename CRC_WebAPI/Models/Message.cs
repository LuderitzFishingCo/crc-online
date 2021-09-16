using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRC_WebAPI.Models
{
  public class Message
  {
    public int Message_ID { get; set; }
    public int? Chat_ID { get; set; }
    public int? Learner_ID { get; set; }
    public int? Teacher_ID { get; set; }
    public string Message_Text { get; set; }
    public DateTime Sent_Time { get; set; }
    public DateTime Sent_Date { get; set; }
  }
}
