using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Threading.Tasks;

namespace CRC_WebAPI.Controllers
{
  public class SendEmail
  {
    

    static async Task Execute(string address,string code)
    {
      var apiKey = Environment.GetEnvironmentVariable("CRC-Reset-Password");
      var client = new SendGridClient(apiKey);
      var from = new EmailAddress("u17210021@tuks.co.za", "Tech Solutions Admin");
      var subject = "Sending with SendGrid is Fun";
      var to = new EmailAddress(address, address);
      var plainTextContent = "and easy to do anywhere, even with C#";
      var htmlContent = "<strong>and easy to do anywhere, even with C#</strong>";
      var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
      var response = await client.SendEmailAsync(msg);
    }
  }
}
