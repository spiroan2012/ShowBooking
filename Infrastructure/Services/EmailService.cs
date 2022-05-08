using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class EmailService
    {
        public string Subject { get; set; }
        public string Recipient { get; set; }
        public string MessageBody { get; set; }

        public void SendEmail()
        {
            try
            {
                MailMessage message = new MailMessage();
                SmtpClient smtp = new SmtpClient();

                message.From = new MailAddress("showbookingathens@gmail.com");
                message.To.Add(new MailAddress(Recipient));

                message.Subject = Subject;

                message.Body = MessageBody;
                smtp.Port = 587;
                smtp.Host = "smtp.gmail.com";

                smtp.EnableSsl = true;
                smtp.UseDefaultCredentials = false;
                smtp.Credentials = new NetworkCredential("showbookingathens@gmail.com", "Protal2022!");
                smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                smtp.Send(message);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }

        }
    }
}
