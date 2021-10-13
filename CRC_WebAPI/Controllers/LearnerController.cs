using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CRC_WebAPI.Models;
using System.Dynamic;
using Microsoft.EntityFrameworkCore;


namespace CRC_WebAPI.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class LearnerController : ControllerBase
  {
    AppDBContext db;
    public LearnerController(AppDBContext _db)
    {
      db = _db;
    }

    [HttpGet]
    [Route("GetAnnouncements")]
    public List<dynamic> GetAnnouncements()
    {
      var announcements = db.Announcement.ToList();
      return GetDynamicAnnouncements(announcements);
    }
    public List<dynamic> GetDynamicAnnouncements(List<Announcement> announcements)
    {
      var dynamicAnnouncements = new List<dynamic>();
      foreach (var announcement in announcements)
      {
        dynamic dynamicIns = new ExpandoObject();
        dynamicIns.Lesson_Instance_ID = announcement.Announcement_ID;
        dynamicIns.Course_Instance_ID = announcement.Course_Instance_ID;
        dynamicIns.Announcement_Text = announcement.Announcement_Text;
        dynamicIns.Announcement_Date_Time = announcement.Announcement_Date_Time;
        dynamicAnnouncements.Add(dynamicIns);
      }
      return dynamicAnnouncements;
    }
    [HttpGet]
    [Route("GetCourseTypes")]
    public List<dynamic> GetCourseTypes()
    {
      var course_Types = db.Course_Type.ToList();
      return GetDynamicCourseTypes(course_Types);
    }
    public List<dynamic> GetDynamicCourseTypes(List<Course_Type> course_Types)
    {
      var dynamicTypes = new List<dynamic>();
      foreach (var types in course_Types)
      {
        dynamic dynamicTyp = new ExpandoObject();
        dynamicTyp.Course_Type_ID = types.Course_Type_ID;
        dynamicTyp.Course_Type_Description = types.Course_Type_Description;
        dynamicTypes.Add(dynamicTyp);
      }
      return dynamicTypes;
    }

  

    [HttpGet]
    [Route("GetLearnerCourses/{id}")]
    public List<dynamic> GetLearnerCourses(int id)
    {
      var learner = db.Learner.Where(l => l.User_ID == id).FirstOrDefault();
      var courselearner = db.Course_Instance_Learner.Include(cl=>cl.Course_Instance.Course).Where(cl => cl.Learner_ID == learner.Learner_ID).ToList();
      return GetDynamicLearnerCourses(courselearner);
    }
    public List<dynamic> GetDynamicLearnerCourses(List<Course_Instance_Learner> courseinstances)
    {
      var dynamicInstances = new List<dynamic>();
      foreach (var instance in courseinstances)
      {
        dynamic dynamicIns = new ExpandoObject();
        dynamicIns.Course_ID = instance.Course_Instance.Course_ID;
        dynamicIns.Course_Instance_ID = instance.Course_Instance_ID;
        dynamicIns.Course_Instance_Start_Date = instance.Course_Instance.Course_Instance_Start_Date.ToShortDateString();
        dynamicIns.Courses_Instance_End_Date = instance.Course_Instance.Course_Instance_End_Date.ToShortDateString();
        dynamicIns.Course_Name = instance.Course_Instance.Course.Course_Name;
        dynamicInstances.Add(dynamicIns);
      }
      return dynamicInstances;
    }

    [HttpGet]
    [Route("GetCourseInstances")]
    public List<dynamic> GetCourseInstances()
    {
      var courseinstances = db.Course_Instance.Include(c=>c.Course).ToList();
      return GetDynamicCourseInstances(courseinstances);
    }
    public List<dynamic> GetDynamicCourseInstances(List<Course_Instance> courseinstances)
    {
      var dynamicInstances = new List<dynamic>();
      foreach (var instance in courseinstances)
      {
        dynamic dynamicIns = new ExpandoObject();
        dynamicIns.Course_ID = instance.Course_ID;
        dynamicIns.Course_Instance_ID = instance.Course_Instance_ID;
        dynamicIns.Course_Instance_Start_Date = instance.Course_Instance_Start_Date.ToShortDateString();
        dynamicIns.Courses_Instance_End_Date = instance.Course_Instance_End_Date.ToShortDateString();
        dynamicIns.Course_Name = instance.Course.Course_Name;
        dynamicInstances.Add(dynamicIns);
      }
      return dynamicInstances;
    }

    [Route("GetCourseInstanceLessons/{id}")]
    public List<dynamic> GetCourseInstanceLessons(int id)
    {
      var lessons = db.Lesson_Instance.Include(l=>l.Lesson).Include(l=>l.Lesson_Slot).Include(l => l.Course_Instance.Course).Where(l => l.Course_Instance_ID == id).ToList();
      return GetDynamicCourseInstanceLessons(lessons);
    }
    public List<dynamic> GetDynamicCourseInstanceLessons(List<Lesson_Instance> lessons)
    {
      var dynamicInstances = new List<dynamic>();
      foreach (var instance in lessons)
      {
        dynamic dynamicIns = new ExpandoObject();
        dynamicIns.Lesson_ID = instance.Lesson_ID;
        dynamicIns.Lesson_Name = instance.Lesson.Lesson_Name;
        dynamicIns.Lesson_Number = instance.Lesson.Lesson_Number;
        dynamicIns.Lesson_Date = instance.Lesson_Slot.Lesson_Start.ToShortDateString();
        dynamicIns.Lesson_Start = instance.Lesson_Slot.Lesson_Start.ToShortTimeString();
        dynamicIns.Lesson_End = instance.Lesson_Slot.Lesson_End.ToShortTimeString();
        dynamicIns.Course_Name = instance.Course_Instance.Course.Course_Name;
        dynamicInstances.Add(dynamicIns);
      }
      return dynamicInstances;
    }

    [HttpGet]
    [Route("GetCourseInstanceLearners")]
    public List<dynamic> GetCourseInstanceLearners()
    {
      var courseinstances = db.Course_Instance_Learner.ToList();
      return GetDynamicCourseInstanceLearners(courseinstances);
    }
    public List<dynamic> GetDynamicCourseInstanceLearners(List<Course_Instance_Learner> courseinstances)
    {
      var dynamicInstances = new List<dynamic>();
      foreach (var instance in courseinstances)
      {
        dynamic dynamicIns = new ExpandoObject();
        dynamicIns.Learner_ID = instance.Learner_ID;
        dynamicIns.Course_Instance_ID = instance.Course_Instance_ID;
        dynamicIns.Payment_Amount = instance.Payment_Amount;
        dynamicInstances.Add(dynamicIns);
      }
      return dynamicInstances;
    }
    
    [HttpGet]
    [Route("GetResourceTypes")]
    public List<dynamic> GetResourceTypes()
    {
      var resourcetypes = db.Resource_Type.ToList();
      return GetDynamicResourceTypes(resourcetypes);
    }
    public List<dynamic> GetDynamicResourceTypes(List<Resource_Type> resourcetypes)
    {
      var dynamicTypes = new List<dynamic>();
      foreach (var type in resourcetypes)
      {
        dynamic dynamicTyp = new ExpandoObject();
        dynamicTyp.Resouece_Type_ID = type.Resource_Type_ID;
        dynamicTyp.Resource_Type_Description = type.Resource_Type_Description;
        dynamicTypes.Add(dynamicTyp);
      }
      return dynamicTypes;
    }

    [HttpGet]
    [Route("GetResources")]
    public List<dynamic> GetResources()
    {
      var resources = db.Resource.ToList();
      return GetDynamicResources(resources);
    }
    public List<dynamic> GetDynamicResources(List<Resource> resources)
    {
      var dynamicResources = new List<dynamic>();
      foreach (var resource in resources)
      {
        dynamic dynamicTyp = new ExpandoObject();
        dynamicTyp.Resource_ID = resource.Resource_ID;
        dynamicTyp.Resouece_Type_ID = resource.Resource_Type_ID;
        dynamicTyp.Lesson_ID = resource.Lesson_ID;
        dynamicTyp.Resource_Name = resource.Resource_Name;
        dynamicResources.Add(dynamicTyp);
      }
      return dynamicResources;
    }


    
    [HttpGet]
    [Route("GetLessonQuizzes/{id}")]
    public List<dynamic> GetLessonQuizzes(int id)
    {
      var lesson_quizzes = db.Lesson_Instance_Quiz.Include(lq=>lq.Quiz).Include(lq=>lq.Lesson_Instance.Lesson).Where(lq=>lq.Lesson_Instance_ID == id).ToList();
      return GetDynamicLessonQuiz(lesson_quizzes);
    }
    [HttpGet]
    [Route("GetLessonQuiz/{id}")]
    public List<dynamic> GetLessonQuiz(int id)
    {
      var lesson_quizzes = db.Lesson_Instance_Quiz.Include(lq => lq.Quiz).Include(lq => lq.Lesson_Instance.Lesson).Where(lq => lq.Quiz_ID == id).ToList();
      return GetDynamicLessonQuiz(lesson_quizzes);
    }
    public List<dynamic> GetDynamicLessonQuiz(List<Lesson_Instance_Quiz> lesson_quizzes)
    {
      var dynamicResources = new List<dynamic>();
      foreach (var item in lesson_quizzes)
      {
        dynamic dynamicTyp = new ExpandoObject();
        dynamicTyp.Lesson_Instance_ID = item.Lesson_Instance_ID;
        dynamicTyp.Quiz_ID = item.Quiz_ID;
        dynamicTyp.Lesson_Name = item.Lesson_Instance.Lesson.Lesson_Name;
        dynamicTyp.Due_Date = item.Quiz.Due_Date.ToShortDateString();
        dynamicTyp.Quiz_Name = item.Quiz.Quiz_Name;
        dynamicTyp.Weight = item.Quiz.Weight;


        dynamicResources.Add(dynamicTyp);
      }
      return dynamicResources;
    }


    [HttpGet]
    [Route("GetQuizQuestions/{id}")]
    public List<dynamic> GetQuizQuestions(int id)
    {
      var questions = db.Quiz_Question.Include(lq => lq.Quiz).Include(lq => lq.Question).Where(lq => lq.Quiz_ID == id).ToList();
      return GetDynamicQuizQuestions(questions);
    }
    public List<dynamic> GetDynamicQuizQuestions(List<Quiz_Question> questions)
    {
      var dynamicResources = new List<dynamic>();
      foreach (var item in questions)
      {
        dynamic dynamicTyp = new ExpandoObject();
        dynamicTyp.Quiz_ID = item.Quiz_ID;
        dynamicTyp.Question_Asked = item.Question.Question_Asked;
        dynamicResources.Add(dynamicTyp);
      }
      return dynamicResources;
    }

    [HttpGet]
    [Route("GetLesson/{id}")]
    public List<dynamic> GetLesson(int id)
    {
      var lessons = db.Lesson.Where(l => l.Lesson_ID == id).ToList();
      return GetDynamicLesson(lessons);
    }
    public List<dynamic> GetDynamicLesson(List<Lesson> lessons)
    {
      var dynamicResources = new List<dynamic>();
      foreach (var item in lessons)
      {
        dynamic dynamicTyp = new ExpandoObject();
        dynamicTyp.Lesson_ID = item.Lesson_ID;
        dynamicTyp.Lesson_Name = item.Lesson_Name;
        dynamicTyp.Lesson_Number = item.Lesson_Number;
        dynamicTyp.Lesson_Description = item.Lesson_Description;

        dynamicResources.Add(dynamicTyp);
      }
      return dynamicResources;
    }

    [HttpGet]
    [Route("GetAnnouncments/{id}")]
    public List<dynamic> GetAnnouncments(int id)
    {
      var courses = db.Course_Instance_Learner.Where(cl => cl.Learner.User_ID == id).ToList();
      List<Announcement> announcements = new List<Announcement>();
        foreach (var course in courses)
        {
          announcements = db.Announcement.Where(a => a.Course_Instance_ID == course.Course_Instance_ID).ToList();
        }
      
      return GetDynamicAnnouncments(announcements);
    }
    public List<dynamic> GetDynamicAnnouncments(List<Announcement> announcements)
    {
      var dynamicResources = new List<dynamic>();
      foreach (var item in announcements)
      {
        dynamic dynamicTyp = new ExpandoObject();
        dynamicTyp.Announcement_ID = item.Announcement_ID;
        dynamicTyp.Announcement_Date_Time = item.Announcement_Date_Time;
        dynamicTyp.Announcement_Text = item.Announcement_Text;

        dynamicResources.Add(dynamicTyp);
      }
      return dynamicResources;
    }


    [HttpPost("SubmitLearnerQuestion")]
    [Produces("application/json")]
    public IActionResult SubmitLearnerQuestion([FromBody] Learner_Quiz_Question value)
    {
      db.Learner_Quiz_Question.Add(value);
      db.SaveChanges();
      return Ok(value);
    }
  }
}
