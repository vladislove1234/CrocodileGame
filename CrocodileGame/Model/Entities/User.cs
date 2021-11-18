using System;
using System.Drawing;

namespace CrocodileGame.Model.Entities
{
    public class User
    {
        public string Name { get; private set; }
        public string ConnectionId { get; private set; }
        public DateTime ConnectedAt { get; private set; }
        public string Color { get; set; }
        public User(string name, string connectionId)
        {
            Name = name;
            ConnectionId = connectionId;
            ConnectedAt = DateTime.Now;
            var random = new Random();
            Color = String.Format("#{0:X6}", random.Next(0x1000000));
        }
    }
}
