using System;

namespace DatingApp.API.DTO
{
    public class MessageForSendDTO
    {
        public int SenderId { get; set; }
        public int RecipientId { get; set; }
        public DateTime MessageSent { get; set; }
        public string Content { get;set; }
        public MessageForSendDTO()
        {
            MessageSent=DateTime.Now;
        }
    }
}