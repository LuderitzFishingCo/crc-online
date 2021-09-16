using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CRC_WebAPI.Models
{
  public class Announcement
  {
    [Key]
    public int Announcement_ID { get; set; }
    public int Course_Instance_ID { get; set; }
    public string Announcement_Text { get; set; }
    public DateTime Announcement_Date_Time { get; set; }
  }
}
