using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRC_WebAPI.ViewModels
{
  public class Data
  {
    public class UserLogin
    {
      public string Email_Address { get; set; }
      public string Password { get; set; }
    }
    public class UserRegister
    {
      public int? User_Role_ID { get; set; }
      public int? Department_ID { get; set; }
      public int? Password_ID { get; set; }
      public int? Location_ID { get; set; }
      public int? Gender_ID { get; set; }
      public int? Church_ID { get; set; }
      public string First_Name { get; set; }
      public string Last_Name { get; set; }
      public DateTime Date_of_Birth { get; set; }
      public string Phone_Number { get; set; }
      public string Username { get; set; }
      public string Email_Address { get; set; }
      public string Password { get; set; }
    }
  }
}
