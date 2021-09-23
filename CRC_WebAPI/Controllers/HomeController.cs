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
  public class HomeController : ControllerBase
  {
    AppDBContext appDBContext;
    public HomeController(AppDBContext _appDBContext)
    {
      appDBContext = _appDBContext;
    }


    [HttpGet]
    [Route("GetGenders")]
    public List<dynamic> GetGenders()
    {
      using var db = new AppDBContext();
      var genders = db.Gender.ToList();
      return GetDynamicGenders(genders);
    }
    public List<dynamic> GetDynamicGenders(List<Gender> genders)
    {
      var dynamicGenders = new List<dynamic>();
      foreach (var gender in genders)
      {
        dynamic dynamicGen = new ExpandoObject();
        dynamicGen.Gender_Id = gender.Gender_Id;
        dynamicGen.Gender_Name = gender.Gender_Name;

         dynamicGenders.Add(dynamicGen);
       }
       return dynamicGenders;
     }

     [HttpGet]
     [Route("GetChurches")]
     public List<dynamic> GetChurches()
     {
       using var db = new AppDBContext();
       var churches = db.CRC_Church.ToList();
       return GetDynamicChurches(churches);
     }
     public List<dynamic> GetDynamicChurches(List<CRC_Church> churches)
     {
       var dynamicChurches = new List<dynamic>();
       foreach (var church in churches)
       {
         dynamic dynamicCRC = new ExpandoObject();
         dynamicCRC.Church_ID = church.Church_ID;
         dynamicCRC.Congregation_Name = church.Congregation_Name;

         dynamicChurches.Add(dynamicCRC);
       }
       return dynamicChurches;
     }

     [HttpGet]
     [Route("GetPaymentTypes")]
     public List<dynamic> GetPaymentTypes()
     {
       using var db = new AppDBContext();
       var paymenttypes = db.Payment_Type.ToList();
       return GetDynamicPaymentTypes(paymenttypes);
     }
     public List<dynamic> GetDynamicPaymentTypes(List<Payment_Type> paymenttypes)
     {
       var dynamicTypes = new List<dynamic>();
       foreach (var paymenttype in paymenttypes)
       {
         dynamic dynamicTy = new ExpandoObject();
         dynamicTy.Payment_Type_ID = paymenttype.Payment_Type_ID;
         dynamicTy.Payment_Type_Name = paymenttype.Payment_Type_Name;

         dynamicTypes.Add(dynamicTy);
       }
       return dynamicTypes;
     }

     [HttpGet]
     [Route("GetUserRoles")]
     public List<dynamic> GetUserRoles()
     {
       using var db = new AppDBContext();
       var userroles = db.User_Role.ToList();
       return GetDynamicUserRoles(userroles);
     }
     public List<dynamic> GetDynamicUserRoles(List<User_Role> userroles)
     {
       var dynamicRoles = new List<dynamic>();
       foreach (var role in userroles)
       {
         dynamic dynamicRole = new ExpandoObject();
         dynamicRole.User_Role_ID = role.User_Role_ID;
         dynamicRole.User_Role_Name = role.User_Role_Name;
         dynamicRole.User_Role_Description = role.Role_Description;

         dynamicRoles.Add(dynamicRole);
       }
       return dynamicRoles;
     }


     [HttpGet]
     [Route("GetDepartments")]
     public List<dynamic> GetDepartments()
     {
       using var db = new AppDBContext();
       var departments = db.Department.ToList();
       return GetDynamicDepartment(departments);
     }
     public List<dynamic> GetDynamicDepartment(List<Department> departments)
     {
       var dynamicDepartments = new List<dynamic>();
       foreach (var department in departments)
       {
         dynamic dynamicDep = new ExpandoObject();
         dynamicDep.Department_ID = department.Department_ID;
         dynamicDep.Department_Name = department.Department_Name;
         dynamicDepartments.Add(dynamicDep);
       }
       return dynamicDepartments;
     }

     [HttpGet]
     [Route("GetCourseTypes")]
     public List<dynamic> GetCourseTypes()
     {
       using var db = new AppDBContext();
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
     [Route("GetSermonTopics")]
     public List<dynamic> GetSermonTopics()
     {
       using var db = new AppDBContext();
       var sermontopics = db.Sermon_Topic.ToList();
       return GetDynamicSermonTopics(sermontopics);
     }
     public List<dynamic> GetDynamicSermonTopics(List<Sermon_Topic> sermontopics)
     {
       var dynamicTopics = new List<dynamic>();
       foreach (var topic in sermontopics)
       {
         dynamic dynamicTop = new ExpandoObject();
         dynamicTop.Sermon_Topic_ID = topic.Sermon_Topic_ID;
         dynamicTop.Sermon_Topic_Name = topic.Sermon_Topic_Name;
         dynamicTopics.Add(dynamicTop);
       }
       return dynamicTopics;
     }
     [HttpGet]
     [Route("GetResourceTypes")]
     public List<dynamic> GetResourceTypes()
     {
       using var db = new AppDBContext();
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
     [Route("GetCourseInstances")]
     public List<dynamic> GetCourseInstances()
     {
       using var db = new AppDBContext();
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
     [Route("GetLessonInstances")]
     public List<dynamic> GetLessonInstances()
     {
       using var db = new AppDBContext();
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
     [Route("GetAnnouncements")]
     public List<dynamic> GetAnnouncements()
     {
       using var db = new AppDBContext();
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
     [Route("GetChats")]
     public List<dynamic> GetChats()
     {
       using var db = new AppDBContext();
       var chats = db.Chat.ToList();
       return GetDynamicChats(chats);
     }
     public List<dynamic> GetDynamicChats(List<Chat> chats)
     {
       var dynamicChats = new List<dynamic>();
       foreach (var chat in chats)
       {
         dynamic dynamicIns = new ExpandoObject();
         dynamicIns.Lesson_Instance_ID = chat.Chat_ID;
         dynamicChats.Add(dynamicIns);
       }
       return dynamicChats;
     }

     [HttpGet]
     [Route("GetCoursePrices")]
     public List<dynamic> GetCoursePrices()
     {
       using var db = new AppDBContext();
       var prices = db.Course_Price.ToList();
       return GetDynamicCoursePrices(prices);
     }
     public List<dynamic> GetDynamicCoursePrices(List<Course_Price> prices)
     {
       var dynamicPrices = new List<dynamic>();
       foreach (var price in prices)
       {
         dynamic dynamicIns = new ExpandoObject();
         dynamicIns.Course_ID = price.Course_ID;
         dynamicIns.Course_Price_ID = price.Course_Price_ID;
         dynamicIns.Course_Price_Date = price.Course_Price_Date;
         dynamicPrices.Add(dynamicIns);
       }
       return dynamicPrices;
     }

     [HttpGet]
     [Route("GetCourseRatings")]
     public List<dynamic> GetCourseRatings()
     {
       using var db = new AppDBContext();
       var ratings = db.Course_Rating.ToList();
       return GetDynamicCourseRatings(ratings);
     }
     public List<dynamic> GetDynamicCourseRatings(List<Course_Rating> ratings)
     {
       var dynamicRatings = new List<dynamic>();
       foreach (var rating in ratings)
       {
         dynamic dynamicIns = new ExpandoObject();
         dynamicIns.Course_Rating_ID = rating.Course_Rating_ID;
         dynamicIns.Course_Review = rating.Course_Review;
         dynamicIns.Rating = rating.Rating;
         dynamicRatings.Add(dynamicIns);
       }
       return dynamicRatings;
     }

     [HttpGet]
     [Route("GetLessonRatings")]
     public List<dynamic> GetLessonRatings()
     {
       using var db = new AppDBContext();
       var ratings = db.Lesson_Rating.ToList();
       return GetDynamicLessonRatings(ratings);
     }
     public List<dynamic> GetDynamicLessonRatings(List<Lesson_Rating> ratings)
     {
       var dynamicRatings = new List<dynamic>();
       foreach (var rating in ratings)
       {
         dynamic dynamicIns = new ExpandoObject();
         dynamicIns.Lesson_Rating_ID = rating.Lesson_Rating_ID;
         dynamicIns.Lesson_Review = rating.Lesson_Review;
         dynamicIns.Rating = rating.Rating;
         dynamicRatings.Add(dynamicIns);
       }
       return dynamicRatings;
     }

    [HttpGet]
    [Route("GetLocations")]
    public List<dynamic> GetLocations()
    {
      using var db = new AppDBContext();
      var locations = db.Location.ToList();
      return GetDynamicLocations(locations);
    }
    public List<dynamic> GetDynamicLocations(List<Location> locations)
    {
      var dynamicGenders = new List<dynamic>();
      foreach (var location in locations)
      {
        dynamic dynamicGen = new ExpandoObject();
        dynamicGen.Location_ID = location.Location_ID;
        dynamicGen.City = location.City;
        dynamicGen.Country = location.Country;


        dynamicGenders.Add(dynamicGen);
      }
      return dynamicGenders;
    }

    [HttpGet]
    [Route("GetTeachingLevel")]
    public List<dynamic> GetTeachingLevel()
    {
      using var db = new AppDBContext();
      var teachinglevel = db.Teaching_Level.ToList();
      return GetDynamicTeachingLevel(teachinglevel);
    }
    public List<dynamic> GetDynamicTeachingLevel(List<Teaching_Level> teachinglevel)
    {
      var dynamicLevels = new List<dynamic>();
      foreach (var level in teachinglevel)
      {
        dynamic dynamicIns = new ExpandoObject();
        dynamicIns.Teaching_Level_ID = level.Teaching_Level_ID;
        dynamicIns.Teaching_Level_Description = level.Teaching_Level_Description;
        dynamicLevels.Add(dynamicIns);
      }
      return dynamicLevels;
    }

    [HttpGet]
    [Route("GetCourses")]
    public List<dynamic> GetCourses()
    {
      using var db = new AppDBContext();
      var courses = db.Course.Include(d=>d.Course_Type).ToList();
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
    [Route("GetUsers")]
    public List<dynamic> GetUsers()
    {
      using var db = new AppDBContext();
      var user = db.User.Include(u=>u.Church).Include(u=>u.Department).Include(u=>u.User_Role).Include(u=>u.Gender).Include(u=>u.Location).ToList();
      return GetDynamicUsers(user);
    }
    public List<dynamic> GetDynamicUsers(List<User> user)
    {
      var dynamicRoles = new List<dynamic>();
      foreach (var role in user)
      {
        dynamic dynamicRole = new ExpandoObject();
        dynamicRole.User_ID = role.User_ID;
        dynamicRole.User_Role_ID = role.User_Role.User_Role_Name;
        dynamicRole.First_Name = role.First_Name;
        dynamicRole.Last_Name = role.Last_Name;
        dynamicRole.Phone_Number = role.Phone_Number;
        dynamicRole.Email = role.Email_Address;
        dynamicRole.Username = role.Username;
        dynamicRole.Gender = role.Gender.Gender_Name;
        dynamicRole.Church = role.Church.Congregation_Name;
        dynamicRole.Location = role.Location.City + ", " + role.Location.Country;
        dynamicRoles.Add(dynamicRole);
      }
      return dynamicRoles;
    }


  }
}
