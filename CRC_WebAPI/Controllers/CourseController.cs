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
  public class CourseController : ControllerBase
  {
    AppDBContext db;
    public CourseController(AppDBContext _appDBContext)
    {
      db = _appDBContext;
    }

    [HttpGet]
    [Route("GetCourses")]
    public List<dynamic> GetCourses()
    {
      var courses = db.Course.Include(d => d.Course_Type).ToList();
      return GetDynamicCourses(courses);
    }
    public List<dynamic> GetDynamicCourses(List<Course> courses)
    {
      var dynamicTypes = new List<dynamic>();
      foreach (var course in courses)
      {
        dynamic dynamicTyp = new ExpandoObject();
        dynamicTyp.Course_ID = course.Course_ID;
        dynamicTyp.Course_Type_ID = course.Course_Type_ID;
        dynamicTyp.Course_Name = course.Course_Name;
        dynamicTyp.Course_Description = course.Course_Description;
        dynamicTyp.Course_Code = course.Course_Code;
        dynamicTyp.Course_Picture = course.Course_Picture;
        dynamicTyp.Course_Type = course.Course_Type.Course_Type_Description;
        dynamicTypes.Add(dynamicTyp);
      }
      return dynamicTypes;
    }

    [HttpGet]
    [Route("GetCourseInstances")]
    public List<dynamic> GetCourseInstances()
    {
      var courses = db.Course_Instance.Include(d => d.Course).ToList();
      return GetDynamicCourseInstances(courses);
    }
    public List<dynamic> GetDynamicCourseInstances(List<Course_Instance> courses)
    {
      var dynamicTypes = new List<dynamic>();
      foreach (var course in courses)
      {
        dynamic dynamicTyp = new ExpandoObject();
        dynamicTyp.Course_Instance_ID = course.Course_Instance_ID;
        dynamicTyp.Course_Name = course.Course.Course_Name;
        dynamicTyp.Course_Instance_Start_Date = course.Course_Instance_Start_Date;
        dynamicTyp.Course_Instance_End_Date = course.Course_Instance_End_Date;
        dynamicTypes.Add(dynamicTyp);
      }
      return dynamicTypes;
    }

    [HttpGet]
    [Route("GetLessonInstances")]
    public List<dynamic> GetLessonInstances()
    {
      var lessons = db.Lesson_Instance.Include(d => d.Course_Instance).Include(d=>d.Lesson).ToList();
      return GetDynamicLessonInstances(lessons);
    }
    public List<dynamic> GetDynamicLessonInstances(List<Lesson_Instance> lessons)
    {
      var dynamicTypes = new List<dynamic>();
      foreach (var item in lessons)
      {
        dynamic dynamicTyp = new ExpandoObject();
        dynamicTyp.Lesson_Instance_ID = item.Lesson_Instance_ID;
        dynamicTyp.Lesson_Name = item.Lesson.Lesson_Name;
        //dynamicTyp.Lesson_Instance_Date = item.Lesson_Instance_Date;
        dynamicTypes.Add(dynamicTyp);
      }
      return dynamicTypes;
    }

  }
}
