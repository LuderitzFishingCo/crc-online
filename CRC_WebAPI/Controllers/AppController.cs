using CRC_WebAPI.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CRC_WebAPI.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class AppController : ControllerBase
  {
    AppDBContext appDBContext;
    public AppController(AppDBContext _appDBContext)
    {
      appDBContext = _appDBContext;
    }

    // GET: api/<AppController>
    [HttpGet]
    [Produces("application/json")]
    public IEnumerable<string> Get()
    {
      return new string[] { "value1", "value2" };
    }

    //// POST api/<AppController>
    //[HttpPost]
    //[Produces("application/json")]
    //public void Create([FromBody] string value)
    //{
    //}

    //// PUT api/<AppController>/5
    //[HttpPut("{id}")]
    //[Produces("application/json")]
    //public void Update([FromBody] string value)
    //{
    //}

    //// DELETE api/<AppController>/5
    //[HttpDelete("{id}")]
    //[Produces("application/json")]
    //public void Delete(int id)
    //{
    //}

        //// POST api/<AppController>
    //[HttpPost]
    //[Produces("application/json")]
    //public void Create([FromBody] string value)
    //{
    //}

    //// PUT api/<AppController>/5
    //[HttpPut("{id}")]
    //[Produces("application/json")]
    //public void Update([FromBody] string value)
    //{
    //}

    //// DELETE api/<AppController>/5
    //[HttpDelete("{id}")]
    //[Produces("application/json")]
    //public void Delete(int id)
    //{
    //}
    // template
    // GET: api/<AppController>
    [HttpGet("GetLessonSlots")]
    [Produces("application/json")]
    public IEnumerable<Time_Slot> GetLessonSlots()
    {
      return appDBContext.Time_Slot;
    }

    // POST api/<AppController>
    [HttpPost("CreateLessonSlot")]
    [Produces("application/json")]
    public IActionResult CreateLessonSlot([FromBody] Time_Slot value)
    {
      appDBContext.Time_Slot.Add(value);
      appDBContext.SaveChanges();
      return Ok(value);
    }

    // PUT api/<AppController>/5
    [HttpPut("UpdateLessonSlot")]
    [Produces("application/json")]
    public IActionResult UpdateLessonSlot([FromBody] Time_Slot value)
    {
      appDBContext.Time_Slot.Update(value);
      appDBContext.SaveChanges();
      return Ok(value);
    }

    // DELETE api/<AppController>/5
    [HttpDelete("DeleteLessonSlot/{id}")]
    [Produces("application/json")]
    public IActionResult DeleteLessonSlot(int id)
    {
      appDBContext.Time_Slot.Remove(appDBContext.Time_Slot.Find(id));
      appDBContext.SaveChanges();
      return Ok();

    }

    [HttpGet("GetLessons")]
    [Produces("application/json")]
    public IEnumerable<Lesson> GetLesson()
    {
      return appDBContext.Lesson;
    }

    // POST api/<AppController>
    [HttpPost("CreateLesson")]
    [Produces("application/json")]
    public IActionResult CreateLesson([FromBody] Lesson value)
    {
      appDBContext.Lesson.Add(value);
      appDBContext.SaveChanges();
      return Ok(value);
    }

    // PUT api/<AppController>/5
    [HttpPut("UpdateLesson")]
    [Produces("application/json")]
    public IActionResult UpdateLesson([FromBody] Lesson value)
    {
      appDBContext.Lesson.Update(value);
      appDBContext.SaveChanges();
      return Ok(value);
    }

    // DELETE api/<AppController>/5
    [HttpDelete("DeleteLesson/{id}")]
    [Produces("application/json")]
    public IActionResult DeleteLesson(int id)
    {
      appDBContext.Lesson.Remove(appDBContext.Lesson.Where(x=>x.Lesson_ID == id).FirstOrDefault());
      appDBContext.SaveChanges();
      return Ok();

    }
    //question bank
    [HttpGet("GetQuestionBanks")]
    [Produces("application/json")]
    public IEnumerable<Question_Bank> GetQuestionBank()
    {
      return appDBContext.Question_Bank;
    }

    // POST api/<AppController>
    [HttpPost("CreateQuestionBank")]
    [Produces("application/json")]
    public IActionResult CreateQuestionBank([FromBody] Question_Bank value)
    {
      appDBContext.Question_Bank.Add(value);
      appDBContext.SaveChanges();
      return Ok(value);
    }

    // PUT api/<AppController>/5
    [HttpPut("UpdateQuestionBank")]
    [Produces("application/json")]
    public IActionResult UpdateQuestionBank([FromBody] Question_Bank value)
    {
      appDBContext.Question_Bank.Update(value);
      appDBContext.SaveChanges();
      return Ok(value);
    }

    // DELETE api/<AppController>/5
    [HttpDelete("DeleteQuestionBank/{id}")]
    [Produces("application/json")]
    public IActionResult DeleteQuestionBank(int id)
    {
      appDBContext.Question_Bank.Remove(appDBContext.Question_Bank.Where(x => x.Question_Bank_ID == id).FirstOrDefault());
      appDBContext.SaveChanges();
      return Ok();

    }
  }
}
