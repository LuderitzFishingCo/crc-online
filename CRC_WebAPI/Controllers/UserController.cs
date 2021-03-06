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
using System.Net;
using System.Net.Mail;

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
        Password_ID = ur.Password_ID,
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
      return Ok();
    }/*
    [HttpGet]
    [Route("GetUser/{id}")]
    public ActionResult GetUser(int id)
    {
      using var db = new AppDBContext();
      User user = db.User.Where(u => u.User_ID == id).FirstOrDefault();
      return Ok(user);
    }*/
     [HttpPost]
     [Route("Update")]
     public ActionResult UpdateUser (User ur)
     {
       using var db = new AppDBContext();

       var updateUser = new User
       {
         Email_Address = ur.Email_Address,
         Password = ur.Password,
         Username = ur.Username,
         User_Role_ID = ur.User_Role_ID,
         Department_ID = ur.Department_ID,
         Password_ID = ur.Password_ID,
         Location_ID = ur.Location_ID,
         Gender_ID = ur.Gender_ID,
         Church_ID = ur.Church_ID,
         First_Name = ur.First_Name,
         Last_Name = ur.Last_Name,
         Date_of_Birth = ur.Date_of_Birth,
         Phone_Number = ur.Phone_Number
       };
       try
       {
         db.User.Add(updateUser);
         db.SaveChanges();
         return Ok();
       }
       catch (Exception e)
       {
         return BadRequest(e.Message);
       }
       return RedirectToAction("View");
     }

     [HttpPost]
     [Route("Delete")]
     public ActionResult DeleteUser(User ur)
     {
       using var db = new AppDBContext();
       try
       {
         db.User.Remove(ur);
         db.SaveChanges();
         return Ok();
       }
       catch (Exception e)
       {
         return BadRequest(e.Message);
       }
     }
     [HttpPost]
     [Route("Logout")]
     public ActionResult LogoutUser(User u)
     {
       return RedirectToAction("RegisterUser");
     }

     [HttpPost]
     [Route("ResetPassword")]
     public ActionResult ResetPassword(User u)
     {
       Random rand = new Random();
       if (this.UserExists(u.Email_Address))
       {
         int num = rand.Next(1000,9999);
        string code = num+u.Username; //here you will be getting an html string  
        Email(code, u.Email_Address);
      }
      else
      {
        return NotFound();
      }
       return Ok();
     }

    public static void Email(string code, string emailaddress)
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

     [HttpGet]
     [Route("GetSermons")]
     public List<dynamic> GetSermons()
     {
       using var db = new AppDBContext();
       var sermons = db.Sermon.ToList();
       return GetDynamicSermons(sermons);
     }
     public List<dynamic> GetDynamicSermons(List<Sermon> sermons)
     {
       var dynamicSermons = new List<dynamic>();
       foreach (var sermon in sermons)
       {
         dynamic dynamicSer = new ExpandoObject();
         dynamicSer.Sermon_ID = sermon.Sermon_ID;
         dynamicSer.Sermon_Topic_ID = sermon.Sermon_Topic_ID;
         dynamicSer.Sermon_Link = sermon.Sermon_Link;
         dynamicSer.Sermon_Date = sermon.Sermon_Date;
         dynamicSermons.Add(dynamicSer);
       }
       return dynamicSermons;
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



  }
}
