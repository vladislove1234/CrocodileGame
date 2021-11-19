using System;
using CrocodileGame.Model.Enums;

namespace CrocodileGame.Model.Entities
{
    public class Message
    {
        public int Id { get; set; }
        public string Text { get; private set; }
        public User Sender { get; private set; }
        public DateTime SentAt { get; private set; }
        public MessageType Type { get; set; }
        public Message(string text, User sender)
        {
            Text = text;
            Sender = sender;
            SentAt = DateTime.Now;
            Type = MessageType.UnAnswered;
        }
    }
}
