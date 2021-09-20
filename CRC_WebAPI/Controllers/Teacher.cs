using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CRC_WebAPI.Models;
using CRC_WebAPI.ViewModels;
using System.Dynamic;

namespace CRC_WebAPI.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class Teacher : ControllerBase
  {
    AppDBContext db;
    public Teacher(AppDBContext _db)
    {
      db = _db;
    }

    [HttpGet]
    [Route("GetLessons")]
    public List<dynamic> GetLessons()
    {
      var lessons = db.Lesson.ToList();
      return GetDynamicLessons(lessons);
    }
    public List<dynamic> GetDynamicLessons(List<Lesson> lessons)
    {
      var dynamicLessons = new List<dynamic>();
      foreach (var lesson in lessons)
      {
        dynamic dynamicIns = new ExpandoObject();
        dynamicIns.Lesson_ID = lesson.Lesson_ID;
        dynamicIns.Lesson_Name = lesson.Lesson_Name;
        dynamicIns.Lesson_Description = lesson.Lesson_Description;
        dynamicIns.Lesson_Number = lesson.Lesson_Number;
        dynamicLessons.Add(dynamicIns);
      }
      return dynamicLessons;
    }

    [HttpGet("GetQuizzes")]
    [Produces("application/json")]
    public IEnumerable<Quiz> GetQuizzes()
    {
      return db.Quiz;
    }

    [HttpPost("CreateQuiz")]
    [Produces("application/json")]
    public IActionResult CreateQuiz([FromBody] Quiz value)
    {
      db.Quiz.Add(value);
      db  .SaveChanges();
      return Ok(value);
    }

    [HttpPost("AssignQuiz")]
    [Produces("application/json")]
    public IActionResult AssignQuiz([FromBody] Lesson_Instance_Quiz value)
    {
      db.Lesson_Instance_Quiz.Add(value);
      db.SaveChanges();
      return Ok(value);
    }
  }
}
