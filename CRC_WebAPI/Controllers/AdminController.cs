using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CRC_WebAPI.Models;
using CRC_WebAPI.ViewModels;

namespace CRC_WebAPI.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class AdminController : ControllerBase
  {
    AppDBContext appDBContext;
    public AdminController(AppDBContext _appDBContext)
    {
      appDBContext = _appDBContext;
    }
    [HttpPost("CreateCourse")]
    [Produces("application/json")]
    public IActionResult CreateCourse([FromBody] Course value)
    {
      appDBContext.Course.Add(value);
      appDBContext.SaveChanges();
      return Ok(value);
    }


    // PUT api/<AppController>/5
    [HttpPut("UpdateCourse")]
    [Produces("application/json")]
    public IActionResult UpdateCourse([FromBody] Course value)
    {

      appDBContext.Course.Update(value);
      appDBContext.SaveChanges();
      return Ok(value);
    }

    // DELETE api/<AppController>/5
    [HttpDelete("DeleteCourse/{id}")]
    [Produces("application/json")]
    public IActionResult DeleteCourse(int id)
    {
      Course deletedCourse = appDBContext.Course.Where(x => x.Course_ID == id).FirstOrDefault();
      appDBContext.Course.Remove(appDBContext.Course.Where(x => x.Course_ID == id).FirstOrDefault());
      appDBContext.SaveChanges();
      return Ok();

    }

  }
}
