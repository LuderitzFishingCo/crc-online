using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRC_WebAPI.Models
{
  public class Title
  {
    public int Title_ID { get; set; }
    public string Title_Name { get; set; }

    public virtual ICollection<User> Users { get; set; }
  }
}
