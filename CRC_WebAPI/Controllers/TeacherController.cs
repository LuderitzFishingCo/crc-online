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
    [HttpGet]
    [Route("GetLesson/{id}")]
    public List<dynamic> GetLesson(int id)
    {
      var lessons = db.Lesson.Where(li=>li.Lesson_ID == id).ToList();
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
    [HttpGet]
    [Route("GetQuestionBank/{id}")]
    public List<dynamic> GetQuestionBank(int id)
    {
      using var db = new AppDBContext();
      var questionbanks = db.Question_Bank.Include(d => d.Question_Bank_Category).Where(d=>d.Question_Bank_ID == id).ToList();
      return GetDynamicQuestionBanks(questionbanks);
    }
    public List<dynamic> GetDynamicQuestionBanks(List<Question_Bank> questionbank)
    {
      var dynamicTypes = new List<dynamic>();
      foreach (var item in questionbank)
      {
        dynamic dynamicTyp = new ExpandoObject();
        dynamicTyp.Question_Bank_ID = item.Question_Bank_ID;
        dynamicTyp.Question_Bank_Name = item.Question_Bank_Name;
        dynamicTyp.Question_Bank_Category = item.Question_Bank_Category.Question_Bank_Category_Name;
        dynamicTyp.Question_Bank_Category_ID = item.Question_Bank_Category_ID;
        dynamicTypes.Add(dynamicTyp);
      }
      return dynamicTypes;
    }

    [HttpGet]
    [Route("GetQuestionBankQuestions/{id}")]
    public List<dynamic> GetQuestionBankQuestions(int id)
    {
      using var db = new AppDBContext();
      var questions = db.Question.Include(q=>q.Question_Bank).Where(q=>q.Question_Bank_ID == id).ToList();
      return GetDynamicQuestionBankQuestions(questions);
    }
    public List<dynamic> GetDynamicQuestionBankQuestions(List<Question> questionbank)
    {
      var dynamicTypes = new List<dynamic>();
      foreach (var item in questionbank)
      {
        dynamic dynamicTyp = new ExpandoObject();
        dynamicTyp.Question_ID = item.Question_ID;
        dynamicTyp.Question = item.Question_Asked;
        dynamicTyp.Answer = item.Answer;
        dynamicTyp.Question_Bank = item.Question_Bank.Question_Bank_Name;
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
    [HttpGet]
    [Route("GetQuestion/{id}")]
    public List<dynamic> GetQuestion(int id)
    {
      using var db = new AppDBContext();
      var questions = db.Question.Include(d => d.Question_Bank).Where(d=>d.Question_ID == id).ToList();
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
      var quizzes = db.Quiz.ToList();
      return GetDynamicQuizzes(quizzes);
    }
    [HttpGet]
    [Route("GetQuiz/{id}")]
    public List<dynamic> GetQuiz(int id)
    {
      var quizzes = db.Quiz.Where(d=>d.Quiz_ID == id).ToList();
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
        dynamicTyp.Due_Date = item.Due_Date.ToShortDateString();
        dynamicTyp.Quiz_Due_Date = item.Due_Date;
        dynamicTyp.Lesson = item.Lesson_ID;
        dynamicTypes.Add(dynamicTyp);
      }
      return dynamicTypes;
    }

    [HttpGet]
    [Route("GetLearnerResult/{id}")]
    public List<dynamic> GetLearnerResult(int id)
    {
      var learner_results = db.Learner_Quiz.Include(d => d.Learner).Include(d=>d.Quiz).Where(d=>d.Learner.User_ID == id ).ToList();
      return GetDynamicLearnerResult(learner_results);
    }
    public List<dynamic> GetDynamicLearnerResult(List<Learner_Quiz> learner_results)
    {
      var dynamicTypes = new List<dynamic>();
      foreach (var item in learner_results)
      {
        dynamic dynamicTyp = new ExpandoObject();
        dynamicTyp.Quiz_ID = item.Quiz_ID;
        dynamicTyp.Quiz_Name = item.Quiz.Quiz_Name;
        dynamicTyp.Result = item.Result;
        dynamicTyp.Due_Date = item.Quiz.Due_Date.ToShortDateString();
        dynamicTyp.First_Name = item.Learner.User.First_Name;
        dynamicTyp.Last_Name = item.Learner.User.Last_Name;
        dynamicTypes.Add(dynamicTyp);
      }
      return dynamicTypes;
    }

    [HttpGet]
    [Route("GetLearnersResultByQuiz/{id}")]
    public List<dynamic> GetLearnersResultByQuiz(int id)
    {
      var learner_results = db.Learner_Quiz.Include(d => d.Learner).Include(d => d.Quiz).Where(d=>d.Quiz_ID == id).ToList();
      return GetDynamicLearnerResult(learner_results);
    }

   
    [HttpGet]
    [Route("GetLearnerAverage/{id}")]
    public double GetLearnerAverage(int id)
    {
      var learner_results = db.Learner_Quiz.Include(d => d.Learner).Include(d => d.Quiz).Where(d => d.Learner.User_ID == id).ToList();
      var learner_average = Math.Round(learner_results.Average(x => x.Result));
      return learner_average;
    }

    [HttpGet]
    [Route("GetLearnersAverage/{id}")]
    public double GetLearnersAverage(int id)
    {
      var learner_results = db.Learner_Quiz.Include(d => d.Learner).Include(d => d.Quiz).ToList();
      var learner_average = Math.Round(learner_results.Average(x => x.Result));
      return learner_average;
    }


    [HttpGet]
    [Route("GetQuizQuestions/{id}")]
    public List<dynamic> GetQuizQuestions(int id)
    {
      var quizzes = db.Quiz_Question.Include(d => d.Question).Include(d => d.Quiz).Where(d => d.Quiz_ID == id).ToList();
      return GetDynamicQuizQuestions(quizzes);
    }
    public List<dynamic> GetDynamicQuizQuestions(List<Quiz_Question> quizzes)
    {
      var dynamicTypes = new List<dynamic>();
      foreach (var item in quizzes)
      {
        dynamic dynamicTyp = new ExpandoObject();
        dynamicTyp.Quiz_ID = item.Quiz_ID;
        dynamicTyp.Quiz_Name = item.Quiz.Quiz_Name;
        dynamicTyp.Weight = item.Quiz.Weight;
        dynamicTyp.Due_Date = item.Quiz.Due_Date.ToShortDateString();
        dynamicTyp.Question = item.Question.Question_Asked;
        dynamicTyp.Answer = item.Question.Answer;
        dynamicTypes.Add(dynamicTyp);
      }
      return dynamicTypes;
    }

    [HttpPost("CreateQuestionBank")]
    [Produces("application/json")]
    public IActionResult CreateQuestionBank([FromBody] Question_Bank value)
    {
      db.Question_Bank.Add(value);
      db.SaveChanges();
      return Ok(value);
    }

    [HttpPost("MarkLearnerQuiz")]
    [Produces("application/json")]
    public IActionResult MarkLearnerQuiz([FromBody] Learner_Quiz value)
    {
      db.Learner_Quiz.Add(value);
      db.SaveChanges();
      return Ok(value);
    }


    [HttpPost("CreateQuiz")]
    [Produces("application/json")]
    public IActionResult CreateQuiz([FromBody] Quiz value)
    {
      db.Quiz.Add(value);
      db.SaveChanges();
      return Ok(value);
    }

    [HttpPost("CreateAnnouncment")]
    [Produces("application/json")]
    public IActionResult CreateAnnouncement([FromBody] Announcement value)
    {
      db.Announcement.Add(value);
      db.SaveChanges();
      return Ok(value);
    }

    [HttpPost("DeleteAnnouncment/{id}")]
    [Produces("application/json")]
    public IActionResult DeleteAnnouncment(int id)
    {
      db.Announcement.Remove(db.Announcement.Where(x => x.Announcement_ID == id).FirstOrDefault());
      db.SaveChanges();
      return Ok();
    }

    [HttpPost("CreateQuizQuestion")]
    [Produces("application/json")]
    public IActionResult CreateQuizQuestion([FromBody] Quiz_Question value)
    {
      db.Quiz_Question.Add(value);
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

    [HttpPost("CreateLessonInstanceQuiz")]
    [Produces("application/json")]
    public IActionResult CreateLessonInstanceQuiz([FromBody] Lesson_Instance_Quiz value)
    {
      db.Lesson_Instance_Quiz.Add(value);
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
      var user = db.Teacher.Where(l => l.User_ID == id).FirstOrDefault();
      var coursteacher = db.Course_Instance_Teacher.Where(cl => cl.Teacher_ID == user.Teacher_ID).FirstOrDefault();
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
        dynamicTyp.Course_Instance_Start_Date = course.Course_Instance_Start_Date.ToShortDateString();
        dynamicTyp.Course_Instance_End_Date = course.Course_Instance_End_Date.ToShortDateString();
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
    [Route("GetTeacherLearners/{id}")]
    public List<dynamic> GetTeacherLearners(int id)
    {
      var teacher = db.Teacher.Where(t => t.User_ID == id).FirstOrDefault();
      var teachercourse = db.Course_Instance_Teacher.Where(ct => ct.Teacher_ID == teacher.Teacher_ID).FirstOrDefault();
       var courseinstancelearner = db.Course_Instance_Learner.Where(cl => cl.Course_Instance_ID == teachercourse.Course_Instance_ID).ToList();
      return GetDynamicLearners(courseinstancelearner);
    }

    public List<dynamic> GetDynamicLearners(List<Course_Instance_Learner> users)
    {
      var dynamicTypes = new List<dynamic>();
      foreach (var item in users)
      {
        dynamic dynamicTyp = new ExpandoObject();
        dynamicTyp.Learner_ID = item.Learner_ID;/*
        dynamicTyp.First_Name = item.Learner.User.First_Name;
        dynamicTyp.Last_Name = item.Learner.User.Last_Name;
        dynamicTyp.Phone_Number = item.Learner.User.Phone_Number;
        dynamicTyp.Email_Address = item.Learner.User.Email_Address;
        dynamicTyp.Course_Name = item.Course_Instance.Course.Course_Name;*/
        dynamicTypes.Add(dynamicTyp);
      }
      return dynamicTypes;
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
        dynamicIns.Lesson_Instance_ID = lesson.Lesson_Instance_ID;
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

    [HttpPost("CreateLessonSlot")]
    [Produces("application/json")]
    public IActionResult CreateLessonSlot([FromBody] Lesson_Slot value)
    {
      Lesson_Slot newSlot = value;
      newSlot.Lesson_Start.AddHours(2);
      newSlot.Lesson_End.AddHours(2);
      db.Lesson_Slot.Add(newSlot);
      db.SaveChanges();
      return Ok(value);
    }
    [HttpGet]
    [Route("GetLessonSlot/{id}")]
    public List<dynamic> GetLessonSlot(int id)
    {
      var lessons = db.Lesson_Slot.Where(li => li.Lesson_Slot_ID == id).ToList();
      return GetDynamicLessonSlot(lessons);
    }
    public List<dynamic> GetDynamicLessonSlot(List<Lesson_Slot> lessonslots)
    {
      var dynamicLessons = new List<dynamic>();
      foreach (var item in lessonslots)
      {
        dynamic dynamicIns = new ExpandoObject();
        dynamicIns.Lesson_Slot_ID = item.Lesson_Slot_ID;
        dynamicIns.Lesson_Date = item.Lesson_Start;
        dynamicIns.Lesson_Start = item.Lesson_Start.ToShortTimeString();
        dynamicIns.Lesson_End = item.Lesson_End.ToShortTimeString();
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
        dynamicIns.Lesson_Date = item.Lesson_Start.ToLongDateString();
        dynamicIns.Lesson_Start = item.Lesson_Start.ToShortTimeString();
        dynamicIns.Lesson_End = item.Lesson_End.ToShortTimeString();
        dynamicLessons.Add(dynamicIns);
      }
      return dynamicLessons;
    }
    [HttpGet]
    [Route("GetLearnerAnswers/{id}")]
    public List<dynamic> GetLearnerAnswers(int id)
    {
      var learneranswers = db.Learner_Quiz_Question.Include(la=>la.Learner.User).Include(la=>la.Quiz).Include(la=>la.Question).Where(la=>la.Learner.User_ID == id).ToList();
      return GetDynamicLearnerAnswers(learneranswers);
    }
    public List<dynamic> GetDynamicLearnerAnswers(List<Learner_Quiz_Question> learneranswers)
    {
      var dynamicAnswers = new List<dynamic>();
      foreach (var item in learneranswers)
      {
        dynamic dynamicIns = new ExpandoObject();
        dynamicIns.Name = item.Learner.User.First_Name + " "+ item.Learner.User.Last_Name;
        dynamicIns.Quiz_ID = item.Quiz_ID;
        dynamicIns.Quiz_Name = item.Quiz.Quiz_Name;
        dynamicIns.Question_Asked = item.Question.Question_Asked;
        dynamicIns.Answer = item.Question.Answer;
        dynamicIns.Learner_Answer = item.Learner_Answer;
        dynamicAnswers.Add(dynamicIns);
      }
      return dynamicAnswers;
    }


  }
}
