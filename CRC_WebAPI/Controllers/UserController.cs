using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CRC_WebAPI.Models;
using System.Dynamic;
using static CRC_WebAPI.ViewModels.Data;
using System.Security.Cryptography;
using System.Text;
using Microsoft.EntityFrameworkCore;
//using System.Net;
//using System.Net.Mail;
using MailKit.Net.Smtp;
using MimeKit;

namespace CRC_WebAPI.Controllers
{

  

  [Route("api/[controller]")]
  [ApiController]
  public class UserController : ControllerBase
  {
    AppDBContext db;
    public UserController(AppDBContext _appDBContext)
    {
      db = _appDBContext;
    }
    [HttpPost]
    [Route("Register")]
    public ActionResult Register( UserRegister ur)
    {
      if (this.UserExists(ur.Email_Address))
      {
        return Forbid();
      }

      var newUser = new User
      {
        Email_Address = ur.Email_Address,
        Password = ur.Password,
        Username = ur.Username,
        User_Role_ID = ur.User_Role_ID,
        Department_ID = ur.Department_ID,
        Location_ID = ur.Location_ID,
        Gender_ID = ur.Gender_ID,
        Church_ID = ur.Church_ID,
        First_Name = ur.First_Name,
        Last_Name = ur.Last_Name,
        Date_of_Birth = ur.Date_of_Birth.Date,
        Phone_Number = ur.Phone_Number,
      };
      /*
      try
      {*/
      db.User.Add(newUser);
      db.SaveChanges();

      return Ok();
      /*}
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }*/
    }
    [HttpPost]
    [Route("LoginUser")]
    public ActionResult LoginUser(UserLogin ul)
    {
      using var db = new AppDBContext();
      string password = ul.Password;
      var user = db.User.Where(zz => zz.Email_Address == ul.Email_Address && zz.Password == password).FirstOrDefault();
      if (user == null)
      {
        return NotFound();
      }
      if(user.User_Role_ID == 1)
      {
        Console.WriteLine("This is an admin"); 
      }
      else if (user.User_Role_ID == 2)
      {
        Console.WriteLine("This is an unregistered user");
      }
      else if (user.User_Role_ID == 3)
      {
        Console.WriteLine("This is a teacher");
      }
      else if (user.User_Role_ID == 4)
      {
        Console.WriteLine("This is a course coordinator");
      }
      else if (user.User_Role_ID == 5)
      {
        Console.WriteLine("This is a learner");
      }
      return Ok(user.User_ID);
    }
    [HttpPut("UpdateUser")]
    [Produces("application/json")]
    public IActionResult UpdateUser([FromBody] User value)
    {
      db.User.Update(value);
      db.SaveChanges();
      return Ok(value);
    }

    
    // DELETE api/<AppController>/5
    [HttpDelete("DeleteUser/{id}")]
    [Produces("application/json")]
    public IActionResult DeleteUser(int id)
    {
      db.User.Remove(db.User.Where(x => x.User_ID == id).FirstOrDefault());
      db.SaveChanges();
      return Ok();

    }
    [HttpPost]
     [Route("Logout")]
     public ActionResult LogoutUser(User u)
     {
       return RedirectToAction("RegisterUser");
     }
     

    [HttpPost("ResetPassword")]
    [Produces("application/json")]
    public IActionResult ResetPassword([FromBody] String value)
    {
      User resetUser = db.User.Where(u => u.Email_Address == value).FirstOrDefault();
      string code;
      Random rand = new Random();
      if (this.UserExists(value))
      {
        int num = rand.Next(1000, 9999);
         code = num + value; //here you will be getting an html string  
        //Email(code, value);
      }
      else
      {
        return NotFound();
      }
      MimeMessage message = new MimeMessage();

      MailboxAddress from = new MailboxAddress("Admin",
      "ndeshikali97@gmail.com");
      message.From.Add(from);

      MailboxAddress to = new MailboxAddress("User",
      value);
      message.To.Add(to);

      message.Subject = "This is email subject";
      BodyBuilder bodyBuilder = new BodyBuilder();
      bodyBuilder.HtmlBody = "Resetting Password for: "+resetUser.First_Name + " "+resetUser.Last_Name;
      bodyBuilder.TextBody = code;
      SmtpClient client = new SmtpClient();
      //client.Connect("smtp_address_here", port_here, true);
      client.Authenticate("user_name_here", "pwd_here");
      client.Send(message);
      client.Disconnect(true);
      client.Dispose();
      return Ok();
      }

    /*public static void Email(string code, string emailaddress)
    {
      try
      {
        MailMessage message = new MailMessage();
        SmtpClient smtp = new SmtpClient();
        message.From = new MailAddress("u17210021@tuks.co.za");
        message.To.Add(new MailAddress("ToMailAddress"));
        message.Subject = "Password Reset Code";
        message.IsBodyHtml = true; //to make message body as html  
        message.Body = code;
        smtp.Port = 587;
        smtp.Host = "smtp.gmail.com"; //for gmail host  
        smtp.EnableSsl = true;
        smtp.UseDefaultCredentials = false;
        smtp.Credentials = new NetworkCredential("FromMailAddress", "password");
        smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
        smtp.Send(message);
      }
      catch (Exception) { }
    }
    */
    [HttpGet]
    [Route("SearchCourses")]
    public List<dynamic> SearchCourses(string value)
    {
      using var db = new AppDBContext();
      var courses = db.Course.Where(c=>c.Course_Name.Contains(value)).ToList();
      return GetDynamicCourses(courses);
    }

    [HttpGet]
    [Route("GetCourses")]
    public List<dynamic> GetCourses()
    {
      using var db = new AppDBContext();
      var courses = db.Course.ToList();
      return GetDynamicCourses(courses);
    } 
    public List<dynamic> GetDynamicCourses(List<Course> courses)
    {
      var dynamicCourses = new List<dynamic>();
      foreach (var course in courses)
      {
        dynamic dynamicCou = new ExpandoObject();
        dynamicCou.Course_ID = course.Course_ID;
        dynamicCou.Course_Type_ID = course.Course_Type_ID;
        dynamicCou.Course_Name = course.Course_Name;
        dynamicCou.Course_Description = course.Course_Description;
        dynamicCou.Course_Picture = course.Course_Picture;
        dynamicCou.Course_Code = course.Course_Code;
        dynamicCourses.Add(dynamicCou);
      }
      return dynamicCourses;
    }


    [HttpPost("RegisterCourse")]
    [Produces("application/json")]
    public IActionResult RegisterCourse([FromBody] Course_Instance_Learner value)
    {
      db.Course_Instance_Learner.Add(value);
      db.SaveChanges();
      return Ok(value);
    }

    private bool UserExists(string EmailAddress)
     {
       using var db = new AppDBContext();
       var user = db.User.Where(zz => zz.Email_Address == EmailAddress).FirstOrDefault();

       return user != null;
     }


    [HttpPost("AddLocation")]
    [Produces("application/json")]
    public IActionResult AddLocation([FromBody] Location value)
    {
      db.Location.Add(value);
      db.SaveChanges();
      return Ok(value);
    }

    [HttpPost("ApplyAsTeacher")]
    [Produces("application/json")]
    public IActionResult ApplyAsTeacher([FromBody] Teacher_Application value)
    {
      db.Teacher_Application.Add(value);
      db.SaveChanges();
      return Ok(value);
    }

    [HttpPost("RegisterCourse")]
    [Produces("application/json")]
    public IActionResult AcceptTeacher([FromBody] int id, int course_id)
    {
      User user = db.User.Where(u => u.User_ID == id).FirstOrDefault();
      user.User_Role_ID = 5;
      db.User.Update(user);

      Learner newLearner = new Learner();
      newLearner.User_ID = user.User_ID;
      db.Learner.Add(newLearner);

      Course_Price course_Price = db.Course_Price.Where(cp => cp.Course_ID == course_id).FirstOrDefault();
      //Course_Price course_Price = db.Course_Price.Where(cp => cp.Course_Instance_ID == course_id).FirstOrDefault();

      Course_Instance_Learner course_Instance_Learner = new Course_Instance_Learner();
      course_Instance_Learner.Learner_ID = newLearner.Learner_ID;
      course_Instance_Learner.Course_Instance_ID = course_id;
      course_Instance_Learner.Payment_Amount = course_Price.Price;
      db.Course_Instance_Learner.Add(course_Instance_Learner);

      db.SaveChanges();
      return Ok();
    }


    [HttpGet]
    [Route("GetUser/{id}")]
    public List<dynamic> GetUser(int id)
    {
      var users = db.User.Include(l => l.Gender).Include(l => l.Location).Include(l => l.Department).Include(l=>l.Church).Where(l => l.User_ID == id).ToList();
     return GetDynamicUser(users);
    }
    public List<dynamic> GetDynamicUser(List<User> users)
    {

      var dynamicUsers = new List<dynamic>();
      foreach (var user in users)
      {
        dynamic dynamicIns = new ExpandoObject();
        dynamicIns.User_ID = user.User_ID;
        dynamicIns.First_Name = user.First_Name;
        dynamicIns.Last_Name = user.Last_Name;
        dynamicIns.Phone_Number = user.Phone_Number;
        dynamicIns.User_Role_ID = user.User_Role_ID;
        dynamicIns.Gender = user.Gender.Gender_Name;
        dynamicIns.Department = user.Department.Department_Name;
        dynamicIns.City = user.Location.City;
        dynamicIns.Country = user.Location.Country;
        dynamicIns.Church = user.Church.Congregation_Name;
        dynamicIns.Email_Address = user.Email_Address;
        dynamicIns.Phone_Number = user.Phone_Number;
        dynamicIns.Date_of_Birth = user.Date_of_Birth.ToShortDateString();

        dynamicUsers.Add(dynamicIns);
      }
      return dynamicUsers;
    }

    [HttpGet]
    [Route("GetCourse/{id}")]
    public List<dynamic> GetCourse(int id)
    {
      var courses = db.Course_Instance.Include(l => l.Course).Where(l => l.Course_ID == id).ToList();
      return GetDynamicCourse(courses);
    }
    public List<dynamic> GetDynamicCourse(List<Course_Instance> courses)
    {

      var dynamicUsers = new List<dynamic>();
      foreach (var course in courses)
      {
        dynamic dynamicIns = new ExpandoObject();
        dynamicIns.Course_ID = course.Course_ID;
        dynamicIns.Course_Name = course.Course.Course_Name;
        dynamicIns.Course_Description = course.Course.Course_Description;
        dynamicIns.Course_Code = course.Course.Course_Code;
        dynamicIns.Start_Date = course.Course_Instance_Start_Date.ToShortDateString();
        dynamicIns.End_Date = course.Course_Instance_End_Date.ToShortDateString();

        dynamicUsers.Add(dynamicIns);
      }
      return dynamicUsers;
    }


    [HttpGet]
    [Route("GetUserRole/{id}")]
    public dynamic GetUserRole(int id)
    {
      var user = db.User.Include(l => l.Gender).Include(l => l.Location).Include(l => l.Department).Where(l => l.User_ID == id).FirstOrDefault();
      return GetDynamicUserRole(user);
    }
    public dynamic GetDynamicUserRole(User user)
    {
      var user_role = user.User_Role_ID;
      return user_role;
    }
  }
}

