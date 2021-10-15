using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CRC_WebAPI.Models;
using CRC_WebAPI.ViewModels;
using System.Dynamic;
using System.Security.Cryptography;
using System.Text;
using Microsoft.EntityFrameworkCore;

namespace CRC_WebAPI.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class AdminController : ControllerBase
  {
    AppDBContext appDBContext;
    AppDBContext db;
    public AdminController(AppDBContext _appDBContext)
    {
      appDBContext = _appDBContext;
      db = _appDBContext;
    }
    [HttpPost("CreateCourse")]
    [Produces("application/json")]
    public IActionResult CreateCourse([FromBody] Course value)
    {
      var course = value;
      appDBContext.Course.Add(value);
      appDBContext.SaveChanges();
      return Ok(value);
    }


    // PUT api/<AppController>/5
    [HttpPost("UpdateCourse")]
    [Produces("application/json")]
    public IActionResult UpdateCourse([FromBody] Course value)
    {
      appDBContext.Course.Update(value);
      appDBContext.SaveChanges();
      return Ok(value);
    }

    // DELETE api/<AppController>/5
    [HttpDelete("DeleteCourse/{id}")]
    [Produces("application/json")]
    public IActionResult DeleteCourse(int id)
    {
      Course deletedCourse = appDBContext.Course.Where(x => x.Course_ID == id).FirstOrDefault();
      appDBContext.Course.Remove(deletedCourse);
      appDBContext.SaveChanges();
      return Ok();

    }

   /* [HttpGet("GetCourseInstances")]
    [Produces("application/json")]
    public IEnumerable<Course_Instance> GetCourseInstances()
    {
      return appDBContext.Course_Instance;
    }*/

    [HttpGet]
    [Route("GetCourseInstances")]
    public List<dynamic> GetCourseInstances()
    {
      using var db = new AppDBContext();
      var course_Instances = db.Course_Instance.Include(d => d.Course).ToList();
      return GetDynamicCourseInstances(course_Instances);
    }
    public List<dynamic> GetDynamicCourseInstances(List<Course_Instance> questions)
    {
      var dynamicTypes = new List<dynamic>();
      foreach (var item in questions)
      {
        dynamic dynamicTyp = new ExpandoObject();
        dynamicTyp.Course_Instance_ID = item.Course_Instance_ID;
        dynamicTyp.Course_Instance_Start_Date = item.Course_Instance_Start_Date;
        dynamicTyp.Course_Instance_End_Date = item.Course_Instance_End_Date.Date;
        dynamicTyp.Course_Name = item.Course.Course_Name;
        dynamicTypes.Add(dynamicTyp);
      }
      return dynamicTypes;
    }

    [HttpPost("CreateCourseInstance")]
    [Produces("application/json")]
    public IActionResult CreateCourseInstance([FromBody] Course_Instance value)
    {
      appDBContext.Course_Instance.Add(value);
      appDBContext.SaveChanges();
      return Ok(value);
    }

    [HttpDelete("DeleteCourseInstance/{id}")]
    [Produces("application/json")]
    public IActionResult DeleteCourseInstance(int id)
    {
      Course_Instance deletedCourse = appDBContext.Course_Instance.Where(x => x.Course_Instance_ID == id).FirstOrDefault();
      appDBContext.Course_Instance.Remove(appDBContext.Course_Instance.Where(x => x.Course_Instance_ID == id).FirstOrDefault());
      appDBContext.SaveChanges();
      return Ok();

    }

    [HttpGet]
    [Route("GetUsers")]
    public List<dynamic> GetUsers()
    {
      var users = db.User.Include(l => l.Gender).Include(l => l.Location).Include(l => l.Department).Include(l => l.User_Role).ToList(); ;
      return GetDynamicUsers(users);
    }
    [HttpGet]
    [Route("GetTeachers")]
    public List<dynamic> GetTeachers()
    {
      var teachers = db.Teacher.Include(l=>l.User.Gender).Include(l=>l.User.Location).Include(l=>l.User.Department).Include(l=>l.Teaching_Level).Include(l=>l.User.Church).ToList();
      return GetDynamicTeachers(teachers);
    }
    [HttpGet]
    [Route("GetLearners")]
    public List<dynamic> GetLearners()
    {
      var learners = db.User.Include(l => l.Gender).Include(l => l.Location).Include(l => l.Department).Where(l => l.User_Role_ID == 5).ToList();
      return GetDynamicUsers(learners);
    }

    public List<dynamic> GetDynamicUsers(List<User> users)
    {
      var dynamicTypes = new List<dynamic>();
      foreach (var item in users)
      {
        dynamic dynamicTyp = new ExpandoObject();
        dynamicTyp.User_ID = item.User_ID;
        dynamicTyp.First_Name = item.First_Name;
        dynamicTyp.Last_Name = item.Last_Name;
        dynamicTyp.Phone_Number = item.Phone_Number;
        dynamicTyp.Gender = item.Gender.Gender_Name;
        dynamicTyp.Department = item.Department.Department_Name;
        dynamicTyp.Location = item.Location.City;
        dynamicTyp.Country = item.Location.Country;
        dynamicTyp.User_Role = item.User_Role.User_Role_Name;
        
        dynamicTypes.Add(dynamicTyp);
      }
      return dynamicTypes;
    }

    public List<dynamic> GetDynamicTeachers(List<Teacher> teachers)
    {
      var dynamicTeachers = new List<dynamic>();
      foreach (var user in teachers)
      {
        dynamic dynamicIns = new ExpandoObject();
        dynamicIns.Teacher_ID = user.Teacher_ID;
        dynamicIns.Teaching_Level = user.Teaching_Level.Teaching_Level_Description;
        dynamicIns.First_Name = user.User.First_Name;
        dynamicIns.Last_Name = user.User.Last_Name;
        dynamicIns.Phone_Number = user.User.Phone_Number;
        dynamicIns.Email_Address = user.User.Email_Address;
        dynamicIns.Department = user.User.Department.Department_Name;
        dynamicIns.Gender = user.User.Gender.Gender_Name;
        dynamicIns.User_ID = user.User.User_ID;
        dynamicIns.Congregation = user.User.Church.Congregation_Name;

        dynamicTeachers.Add(dynamicIns);
      }
      return dynamicTeachers;
    }

    [HttpPost("AssignTeacher")]
    [Produces("application/json")]
    public IActionResult AssignTeacher([FromBody] Course_Instance_Teacher value)
    {
      appDBContext.Course_Instance_Teacher.Add(value);
      appDBContext.SaveChanges();
      return Ok(value);
    }
    
    [HttpGet]
    [Route("GetTeacherApplications")]
    public List<dynamic> GetTeacherApplications()
    {
      using var db = new AppDBContext();
      var userteachers = db.Teacher_Application.Include(t => t.Teacher_Application_Status).Include(t=>t.User).Include(t => t.Teaching_Level).ToList();
      return GetDynamicTeacherApplications(userteachers);

    }
    [HttpGet]
    [Route("GetPendingTeacherApplications")]
    public List<dynamic> GetPendingTeacherApplications()
    {
      using var db = new AppDBContext();
      var userteachers = db.Teacher_Application.Include(t => t.Teacher_Application_Status).Include(t => t.User).Include(t=>t.Teaching_Level).Where(t=>t.Teacher_Application_Status_ID == 3).ToList();
      return GetDynamicTeacherApplications(userteachers);

    }
    public List<dynamic> GetDynamicTeacherApplications(List<Teacher_Application> teachers)
    {
      var dynamicTeachers = new List<dynamic>();
      foreach (var user in teachers)
      {
        dynamic dynamicIns = new ExpandoObject();
        dynamicIns.Teacher_Application_ID = user.Teacher_Application_ID;
        dynamicIns.Application_Status = user.Teacher_Application_Status.Status_Description;
        dynamicIns.First_Name = user.User.First_Name;
        dynamicIns.Last_Name = user.User.Last_Name;
        dynamicIns.Application_Date = user.Application_Date.ToShortDateString();
        dynamicIns.Application_Message = user.Application_Message;
        dynamicIns.User_ID = user.User_ID;
        dynamicIns.Teaching_Level = user.Teaching_Level.Teaching_Level_Description;
        dynamicTeachers.Add(dynamicIns);
      }
      return dynamicTeachers;
    }


    [HttpPost("AcceptTeacher")]
    [Produces("application/json")]
    public IActionResult AcceptTeacher([FromBody]int id)
    {
      Teacher_Application application = appDBContext.Teacher_Application.Where(u => u.User_ID == id).FirstOrDefault();
      application.Teacher_Application_Status_ID = 1;
      appDBContext.Teacher_Application.Update(application);

      User teacher = appDBContext.User.Where(u => u.User_ID == id).FirstOrDefault();
      teacher.User_Role_ID = 3;
      appDBContext.User.Update(teacher);

      Teacher newTeacher = new Teacher();
      newTeacher.User_ID = application.User_ID;
      newTeacher.Teaching_Level_ID = application.Teaching_Level_ID;
      appDBContext.Teacher.Add(newTeacher);

      appDBContext.SaveChanges();
      return Ok(teacher);
    }

    [HttpPost("DeclineTeacher")]
    [Produces("application/json")]
    public IActionResult DeclineTeacher([FromBody]int id)
    {
      Teacher_Application teacher = appDBContext.Teacher_Application.Where(u => u.User_ID == id).FirstOrDefault();
      teacher.Teacher_Application_Status_ID = 2;
      appDBContext.Teacher_Application.Update(teacher);
      appDBContext.SaveChanges();
      return Ok(teacher);
    }

  }
}
