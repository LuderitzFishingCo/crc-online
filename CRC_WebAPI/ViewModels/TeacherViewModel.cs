using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CRC_WebAPI.Models;
namespace CRC_WebAPI.ViewModels
{
  public class TeacherViewModel
  {
    

    public User user;
    public Teacher teacher;
    public Gender gender;
    public Department department;
    public Location location;
    public Teaching_Level teaching_level;

    public List<User> users;
    public List<Teacher> teachers;
    public List<Gender> genders;
    public List<Department> departments;
    public List<Location> locations;
    public List<Teaching_Level> teaching_levels;
 }
}
