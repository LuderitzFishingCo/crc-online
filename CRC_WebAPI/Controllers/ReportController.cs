using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Microsoft.AspNetCore.Mvc;
using CRC_WebAPI.Models;
using CRC_WebAPI.ViewModels;
using System.Dynamic;
using System.Security.Cryptography;
using System.Text;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CRC_WebAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace CRC_WebAPI.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class ReportController : ControllerBase
  {
    AppDBContext appDBContext;
    AppDBContext db;
    public ReportController(AppDBContext _appDBContext)
    {
      appDBContext = _appDBContext;
      db = _appDBContext;
    }

    

    [HttpGet]
    [Route("GetLearnerQuizes/{id}")]
    public List<dynamic> GetLearnerQuizes(int id)
    {
      using var db = new AppDBContext();
      var learnerQuizes = db.Learner_Quiz.Where(i => i.Learner.User_ID==id).ToList();
      return GetDynamicLearnerQuizes(learnerQuizes);
    }
    public List<dynamic> GetDynamicLearnerQuizes(List<Learner_Quiz> learner_Quizzes)
    {
      var dynamicTypes = new List<dynamic>();
      foreach (var item in learner_Quizzes)
      {
        dynamic dynamicTyp = new ExpandoObject();
        dynamicTyp.Quiz_Name = item.Quiz.Quiz_Name;
        dynamicTyp.Weight = item.Quiz.Weight;
        dynamicTyp.Result = item.Result;
        //dynamicTyp.CourseName = item.Quiz.Lesson_Instance_Quizzes.Where()
        dynamicTypes.Add(dynamicTyp);
      }
      return dynamicTypes;
    }

    [HttpGet]
    [Route("GetLearnerCourses/{id}")]
    public List<dynamic> GetLearnerCourses(int id)
    {
      var learner = db.Course_Instance_Learner.Where(l => l.Learner.User_ID == id).FirstOrDefault();
      var courses = db.Course_Instance.Include(l => l.Course).Where(l => l.Course_Instance_ID == learner.Course_Instance_ID).ToList();
      return GetDynamicCourses(courses);
    }

    public List<dynamic> GetDynamicCourses(List<Course_Instance> courses)
    {
      var dynamicTypes = new List<dynamic>();
      foreach (var item in courses)
      {
        dynamic dynamicTyp = new ExpandoObject();
        dynamicTyp.Course_ID = item.Course_ID;
        dynamicTyp.Course_Name = item.Course.Course_Name;
        dynamicTyp.Course_Instance_Start_Date = item.Course_Instance_Start_Date;
        dynamicTyp.Course_Instance_End_Date = item.Course_Instance_End_Date;

        dynamicTypes.Add(dynamicTyp);
      }
      return dynamicTypes;
    }
  }
}
