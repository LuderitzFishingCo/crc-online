using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRC_WebAPI.Models
{
  public class Department
  {
    public int Department_ID { get; set; }
    public string Department_Name { get; set; }

    public virtual ICollection<User> User { get; set; }
  }
}
