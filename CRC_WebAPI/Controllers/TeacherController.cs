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
  public class TeacherController : ControllerBase
  {
    AppDBContext db;
    public TeacherController(AppDBContext _db)
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

    
    [HttpGet]
    [Route("GetQuestionBanks")]
    public List<dynamic> GetQuestionBanks()
    {
      using var db = new AppDBContext();
      var questionbanks = db.Question_Bank.Include(d => d.Question_Bank_Category).ToList();
      return GetDynamicQuestionBanks(questionbanks);
    }
    public List<dynamic> GetDynamicQuestionBanks(List<Question_Bank> questionbank)
    {
      var dynamicTypes = new List<dynamic>();
      foreach (var item in questionbank)
      {
        dynamic dynamicTyp = new ExpandoObject();
        dynamicTyp.Course_ID = item.Question_Bank_ID;
        dynamicTyp.Question_Bank_Name = item.Question_Bank_Name;
        dynamicTyp.Question_Bank_Category = item.Question_Bank_Category.Question_Bank_Category_Name;
        dynamicTypes.Add(dynamicTyp);
      }
      return dynamicTypes;
    }


    [HttpGet]
    [Route("GetQuestions")]
    public List<dynamic> GetQuestions()
    {
      using var db = new AppDBContext();
      var questions = db.Question.Include(d => d.Question_Bank).ToList();
      return GetDynamicQuestions(questions);
    }
    public List<dynamic> GetDynamicQuestions(List<Question> questions)
    {
      var dynamicTypes = new List<dynamic>();
      foreach (var item in questions)
      {
        dynamic dynamicTyp = new ExpandoObject();
        dynamicTyp.Question_ID = item.Question_ID;
        dynamicTyp.Question_Asked = item.Question_Asked;
        dynamicTyp.Answer = item.Answer;
        dynamicTyp.Question_Bank_Name = item.Question_Bank.Question_Bank_Name;
        dynamicTypes.Add(dynamicTyp);
      }
      return dynamicTypes;
    }

    [HttpGet]
    [Route("GetQuestionsByBank/{id}")]
    public List<dynamic> GetQuestionsByBank(int id)
    {
      using var db = new AppDBContext();
      var questions = db.Question.Include(d => d.Question_Bank).Where(d=>d.Question_Bank_ID == id).ToList();
      return GetDynamicQuestions(questions);
    }

    [HttpGet]
    [Route("GetQuizzes")]
    public List<dynamic> GetQuizzes()
    {
      var quizzes = db.Quiz.Include(d => d.Lesson).ToList();
      return GetDynamicQuizzes(quizzes);
    }
    public List<dynamic> GetDynamicQuizzes(List<Quiz> quizzes)
    {
      var dynamicTypes = new List<dynamic>();
      foreach (var item in quizzes)
      {
        dynamic dynamicTyp = new ExpandoObject();
        dynamicTyp.Quiz_ID = item.Quiz_ID;
        dynamicTyp.Quiz_Name = item.Quiz_Name;
        dynamicTyp.Weight = item.Weight;
        dynamicTyp.Due_Date = item.Due_Date;
        dynamicTyp.Lesson = item.Lesson.Lesson_Name;
        dynamicTypes.Add(dynamicTyp);
      }
      return dynamicTypes;
    }


    [HttpPost("CreateQuiz")]
    [Produces("application/json")]
    public IActionResult CreateQuiz([FromBody] Quiz value)
    {
      db.Quiz.Add(value);
      db.SaveChanges();
      return Ok(value);
    }

    [HttpPost("CreateLessonInstance")]
    [Produces("application/json")]
    public IActionResult CreateLessonInstance([FromBody] Lesson_Instance value)
    {
      db.Lesson_Instance.Add(value);
      db.SaveChanges();
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


    [HttpGet]
    [Route("GetTeacherCourses/{id}")]
    public List<dynamic> GetTeacherCourses(int id)
    {
      //var user = db.Teacher.Where(l => l.User_ID == id).FirstOrDefault();
      var coursteacher = db.Course_Instance_Teacher.Where(cl => cl.Teacher_ID == 0).FirstOrDefault();
      var courses = db.Course_Instance.Where(c => c.Course_Instance_ID == coursteacher.Course_Instance_ID).ToList();
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
    [Route("GetTeacherLessons/{id}")]
    public List<dynamic> GetTeacherLessons(int id)
    {
      var lessoninstances = db.Lesson_Instance.Where(li => li.Course_Instance_ID == id).FirstOrDefault();
      var lessons = db.Lesson.Where(l => l.Lesson_ID == lessoninstances.Lesson_ID).ToList();
      return GetDynamicLessons(lessons);
    }

    [HttpGet]
    [Route("GetTeacherLearners")]
    public List<dynamic> GetTeacherLearners(int courseid)
    {
      var courseinstancelearner = db.Course_Instance_Learner.Where(cl => cl.Course_Instance_ID == courseid).ToList();
      var teacherlearners = db.User.Include(l => l.Gender).Include(l => l.Location).Include(l => l.Department).Where(l => l.User_ID == 5).ToList();
      return GetDynamicUsers(teacherlearners);
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
        dynamicTypes.Add(dynamicTyp);
      }
      return dynamicTypes;
    }

    [HttpGet]
    [Route("GetLessonInstances")]
    public List<dynamic> GetLessonInstances()
    {
      var lessons = db.Lesson_Instance.Include(u=>u.Lesson).Include(u=>u.Lesson_Slot).Include(u=>u.Course_Instance.Course).ToList();
      return GetDynamicLessonInstances(lessons);
    }
    public List<dynamic> GetDynamicLessonInstances(List<Lesson_Instance> lessons)
    {
      var dynamicLessons = new List<dynamic>();
      foreach (var lesson in lessons)
      {
        dynamic dynamicIns = new ExpandoObject();
        dynamicIns.Lesson_ID = lesson.Lesson_ID;
        dynamicIns.Lesson_Name = lesson.Lesson.Lesson_Name;
        dynamicIns.Lesson_Description = lesson.Lesson.Lesson_Description;
        dynamicIns.Lesson_Number = lesson.Lesson.Lesson_Number;
        dynamicIns.Lesson_Date = lesson.Lesson_Slot.Lesson_Start.ToShortDateString();
        dynamicIns.Lesson_Start = lesson.Lesson_Slot.Lesson_Start.ToShortTimeString();
        dynamicIns.Lesson_End = lesson.Lesson_Slot.Lesson_End.ToShortTimeString();
        dynamicIns.Course = lesson.Course_Instance.Course.Course_Name;
        dynamicLessons.Add(dynamicIns);
      }
      return dynamicLessons;
    }

    [HttpGet]
    [Route("GetLessonSlots")]
    public List<dynamic> GetLessonSlots()
    {
      var lessonslots = db.Lesson_Slot.ToList();
      return GetDynamicLessonSlots(lessonslots);
    }
    public List<dynamic> GetDynamicLessonSlots(List<Lesson_Slot> lessonslots)
    {
      var dynamicLessons = new List<dynamic>();
      foreach (var item in lessonslots)
      {
        dynamic dynamicIns = new ExpandoObject();
        dynamicIns.Lesson_Slot_ID = item.Lesson_Slot_ID;
        dynamicIns.Lesson_Date = item.Lesson_Start.ToShortDateString();
        dynamicIns.Lesson_Start = item.Lesson_Start.ToShortTimeString();
        dynamicIns.Lesson_End = item.Lesson_End.ToShortTimeString();
        dynamicLessons.Add(dynamicIns);
      }
      return dynamicLessons;
    }

  }
}
