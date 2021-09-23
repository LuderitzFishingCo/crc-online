using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRC_WebAPI.ViewModels
{
  public class TeacherInformation
  {

    public int User_ID { get; set; }
    public string User_Role { get; set; }
    public string Department { get; set; }
    public string Location { get; set; }
    public string Gender { get; set; }
    public string Church { get; set; }
    public string First_Name { get; set; }
    public string Last_Name { get; set; }
    public DateTime Date_of_Birth { get; set; }
    public string Phone_Number { get; set; }
    public string Username { get; set; }
    public string Email_Address { get; set; }
    public string Teaching_Level { get; set; }

  }
}
