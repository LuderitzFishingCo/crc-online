using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace CRC_WebAPI.Models
{
  public class User
  //public class User : IdentityUser
  {
    public int User_ID { get; set; }
    public int? User_Role_ID { get; set; }
    public int? Department_ID { get; set; }
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

    public Gender Gender { get; set; }
    public CRC_Church Church { get; set; }
    public Department Department { get; set; }
    public Location Location { get; set; }
    public User_Role User_Role { get; set; }

    public virtual Teacher Teacher { get; set; }
    public virtual ICollection<Teacher> Teachers { get; set; }
    public virtual ICollection<Teacher_Application> Teacher_Applications { get; set; }

  }
}
