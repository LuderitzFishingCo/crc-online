using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRC_WebAPI.Models
{
  public class Question_Bank_Category
  {
    public int Question_Bank_Category_ID { get; set; }
    public string Question_Bank_Category_Name { get; set; }

    public virtual ICollection<Question_Bank> Question_Banks { get; set; }
  }
}
