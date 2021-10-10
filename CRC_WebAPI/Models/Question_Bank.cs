using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRC_WebAPI.Models
{
  public class Question_Bank
  {
    public int Question_Bank_ID { get; set; }
    public int? Question_Bank_Category_ID { get; set; }
    public string Question_Bank_Name { get; set; }

    public Question_Bank_Category Question_Bank_Category { get; set; }

    public virtual ICollection<Question> Questions { get; set; }
  }
}
