using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CRC_WebAPI.Models;
using System.Dynamic;

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
      var courseinstances = db.Course_Instance.ToList();
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
        dynamicIns.Course_Instance_Start_Date = instance.Course_Instance_Start_Date;
        dynamicIns.Courses_Instance_End_Date = instance.Course_Instance_End_Date;
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
    [Route("GetLearnerLessons/{id}")]
    public List<dynamic> GetLearnerLessons(int id)
    {
      var lessoninstances = db.Lesson_Instance.Where(li=>li.Course_Instance_ID==id).FirstOrDefault();
      var lessons = db.Lesson.Where(l => l.Lesson_ID == lessoninstances.Lesson_ID).ToList();
      return GetDynamicLessons(lessons);
    }

    [HttpGet]
    [Route("GetLessonInstances")]
    public List<dynamic> GetLessonInstances()
    {
      var lessoninstances = db.Lesson_Instance.ToList();
      return GetDynamicLessonInstances(lessoninstances);
    }
    public List<dynamic> GetDynamicLessonInstances(List<Lesson_Instance> lessoninstances)
    {
      var dynamicInstances = new List<dynamic>();
      foreach (var instance in lessoninstances)
      {
        dynamic dynamicIns = new ExpandoObject();
        dynamicIns.Lesson_Instance_ID = instance.Lesson_Instance_ID;
        dynamicIns.Lesson_ID = instance.Lesson_ID;
        dynamicIns.Course_Instance_ID = instance.Course_Instance_ID;
        dynamicIns.Lesson_Instance_Date = instance.Lesson_Instance_Date;
        dynamicInstances.Add(dynamicIns);
      }
      return dynamicInstances;
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
