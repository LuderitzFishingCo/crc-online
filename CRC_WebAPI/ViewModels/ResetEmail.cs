using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SendGrid;
using SendGrid.Helpers.Mail;
using System.Configuration;

namespace CRC_WebAPI.Models
{
  public class ResetEmail
  {
    /*private static void Main()
    {
      Execute().Wait();
    }*/
    public static async Task Execute(string address, string code)
    {
      var apiKey = Environment.GetEnvironmentVariable("ResetPasswordAPI");
      var client = new SendGridClient(apiKey);
      var whatever = client;
      var from = new EmailAddress("u17210021@tuks.co.za", "Tech Solutions Admin");
      var subject = "Sending with SendGrid is Fun";
      var to = new EmailAddress(address, "Testing");
      var plainTextContent = "and easy to do anywhere, even with C#";
      var htmlContent = "<strong>and easy to do anywhere, even with C#</strong>";
      var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
      var response = await client.SendEmailAsync(msg);
    }

  }
}
