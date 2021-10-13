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
using CRC_WebAPI.ViewModels;
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
        Title_ID = ur.Title_ID,
        First_Name = ur.First_Name,
        Last_Name = ur.Last_Name,
        Date_of_Birth = ur.Date_of_Birth.Date,
        Phone_Number = ur.Phone_Number,
        User_Join_Date = ur.User_Join_Date 
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
     

    [HttpGet("ResetPassword")]
    [Produces("application/json")]
    public IActionResult ResetPassword()
    {
      string value = "ndeshi.kali.1234@gmail.com";
      var resonse = ResetEmail.Execute(value, "Testing");
      /*
     User resetUser = db.User.Where(u => u.Email_Address == value).FirstOrDefault();
      string code;
      Random rand = new Random();
      if (this.UserExists(value))
      {
        code = "CRC"+rand.Next(1000, 9999);
        resetUser.Password = code;
        db.User.Update(resetUser);
        var resonse = ResetEmail.Execute(resetUser.Email_Address, code);
        //Email(code, value);
      }
      else
      {
        return NotFound();
      }*/
      return Ok();
      }

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

    [HttpGet]
    [Route("GetLearner/{id}")]
    public List<dynamic> GetLearner(int id)
    {
      var learners = db.Learner.Where(l => l.User_ID == id).ToList();
      return GetDynamicLearner(learners);
    }
    public List<dynamic> GetDynamicLearner(List<Learner> learners)
    {
      var dynamicLearners = new List<dynamic>();
      foreach (var item in learners)
      {
        dynamic dynamicCou = new ExpandoObject();
        dynamicCou.Learner_ID = item.Learner_ID;
        dynamicCou.User_ID = item.User_ID;
        dynamicLearners.Add(dynamicCou);
      }
      return dynamicLearners;
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

    [HttpPost("AddLearner")]
    [Produces("application/json")]
    public IActionResult AddLearner([FromBody] Learner value)
    {
      User learner = db.User.Where(u => u.User_ID == value.User_ID).FirstOrDefault();
      learner.User_Role_ID = 5;
      db.User.Update(learner);

      db.Learner.Add(value);
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


    [HttpGet]
    [Route("GetUser/{id}")]
    public List<dynamic> GetUser(int id)
    {
      var users = db.User.Include(l => l.Gender).Include(l => l.Location).Include(l => l.Department).Include(l=>l.Church).Include(l=>l.User_Role).Where(l => l.User_ID == id).ToList();
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
        dynamicIns.User_Role = user.User_Role.User_Role_Name;
        dynamicIns.User_Role_ID = user.User_Role_ID;
        dynamicIns.Gender_ID = user.Gender_ID;
        dynamicIns.Gender = user.Gender.Gender_Name;
        dynamicIns.Department_ID = user.Department_ID;
        dynamicIns.Department = user.Department.Department_Name;
        dynamicIns.Location_ID = user.Location_ID;
        dynamicIns.City = user.Location.City;
        dynamicIns.Country = user.Location.Country;
        dynamicIns.Church_ID = user.Church_ID;
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

