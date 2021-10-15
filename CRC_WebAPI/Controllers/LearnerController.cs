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
      var user = db.Learner.Where(l => l.User_ID == id).FirstOrDefault();
      var courselearner = db.Course_Instance_Learner.Where(cl => cl.Learner_ID == user.Learner_ID).FirstOrDefault();
      var courses = db.Course_Instance.Where(c=>c.Course_Instance_ID == courselearner.Course_Instance_ID).ToList();
      return GetDynamicCourseInstances(courses);
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
    [Route("GetLearnerQuiz/{id}")]
    public List<dynamic> GetLearnerQuiz(int id)
    {
      var learner = db.Learner.Where(l => l.User_ID == id).FirstOrDefault();
      var learnerlesson = db.Lesson_Instance_Learner.Where(ll => ll.Learner_ID == learner.Learner_ID).FirstOrDefault();
      var lesson = db.Lesson_Instance.Where(li => li.Lesson_Instance_ID == learnerlesson.Lesson_Instance_ID).FirstOrDefault();
      var quizquestions = db.Quiz_Question.Include(q=>q.Question).Include(q=>q.Quiz).Where(q=>q.Quiz.Lesson_ID == lesson.Lesson_ID).ToList();
      return GetDynamicLearnerQuiz(quizquestions);
    }
    public List<dynamic> GetDynamicLearnerQuiz(List<Quiz_Question> quizquestions)
    {
      var dynamicQs = new List<dynamic>();
      foreach (var qq in quizquestions)
      {
        dynamic dynamicQ = new ExpandoObject();
        dynamicQ.Quiz_ID = qq.Quiz_ID;
        dynamicQ.Question_ID = qq.Question_ID;
        dynamicQ.Question_Asked = qq.Question.Question_Asked;
        dynamicQ.Answer = qq.Question.Answer;
        dynamicQ.Quiz_Name = qq.Quiz.Quiz_Name;
        dynamicQ.Quiz_Weight = qq.Quiz.Weight;
        dynamicQ.Due_Date = qq.Quiz.Due_Date;
        dynamicQs.Add(dynamicQ);
      }
      return dynamicQs;
    }

    [HttpGet]
    [Route("GetLessonInstanceQuiz/{id}")]
    public List<dynamic> GetLessonInstanceQuiz(int id)
    {
      var lesson_quizzes = db.Lesson_Instance_Quiz.Include(l=>l.Quiz).Include(l=>l.Lesson_Instance.Lesson).Where(l=>l.Lesson_Instance_ID == id).ToList();
      return GetDynamicLessonInstanceQuiz(lesson_quizzes);
    }
    public List<dynamic> GetDynamicLessonInstanceQuiz(List<Lesson_Instance_Quiz> lesson_quizzes)
    {
      var dynamicResources = new List<dynamic>();
      foreach (var item in lesson_quizzes)
      {
        dynamic dynamicTyp = new ExpandoObject();
        dynamicTyp.Lesson_Instance_ID = item.Lesson_Instance_ID;
        dynamicTyp.Quiz_ID = item.Quiz_ID;
        dynamicTyp.Lesson_Name = item.Lesson_Instance.Lesson.Lesson_Name;
        dynamicTyp.Resouece_Type_ID = item.Quiz.Due_Date ;
        
        dynamicResources.Add(dynamicTyp);
      }
      return dynamicResources;
    }

    


    /*[HttpGet]
    [Route("GetLearnerGrades/{id}")]
    public dynamic GetLearnerGrades(int id)
    {
      var learneraverage = db.Learner_Quiz.Where(lq => lq.Learner_ID == id).Average(l => l.Result);
      //var lessoninstances = db.Lesson_Instance.Where(li => li.Course_Instance_ID == id).FirstOrDefault();
      //var lessons = db.Lesson.Where(l => l.Lesson_ID == lessoninstances.Lesson_ID).ToList();
      return learneraverage;
    }*/
  }
}
