using System;
using System.Collections.Generic;
using System.Linq;
using CrocodileGame.Hubs;
using CrocodileGame.Model.Enums;
using Microsoft.AspNetCore.SignalR;

namespace CrocodileGame.Model.Entities
{
    public class GameRoom
    {
        public string Name { get; private set; }
        public List<User> Users { get; private set; }
        public List<Message> Messages { get; private set; }
        public User Presenter { get; private set; }
        public string CurrentWord { get; private set; }
        public GameRoom(string name)
        {
            Name = name;
            Users = new List<User>();
            Presenter = null;
        }
        public Command ConnectUser(string connectionId, string name)
        {
            var user = new User(name, connectionId);
            if (Users.Where(x => x.Name == name).FirstOrDefault() != null)
                return new Command("Connected","wrong_name", user);
            Users.Add(user);
            if (Presenter == null)
            {
                Presenter = user;
                return new Command("Connected", "presenter", user);
            }
            return new Command("Connected", "player", user);
        }
        public List<Command> PorcessMessage(string text, string connectionId)
        {
            var sender = Users.Where(x => x.ConnectionId == connectionId).FirstOrDefault();
            if(sender == null)
            {
                return null;
            }
            var message = new Message(text, sender);
            var commands = new List<Command>();
            Messages.Add(message);
            message.Id = Messages.IndexOf(message);
            commands.Add(new Command("NewMessage", message, Users.ToArray()));
            if (message.Text.Equals(CurrentWord))
            {
                SetNewWord();
                var presenter = sender;
                commands.Add(new Command("NewPresenter", Presenter, Users.ToArray()));
                commands.Add(new Command("NewWord", CurrentWord, sender));

            }
            return commands;
        }

        private void SetNewWord()
        {
            CurrentWord = "test" + new Random().Next(0,100);
        }

        private void SetRandomPresenter()
        {
            if (Users.Count > 0)
            {
                var random = new Random();
                var presenter = Users[random.Next(0, Users.Count)];
                if (presenter == Presenter)
                    Presenter = Users[0];
            }
            else
                Presenter = null;
        }

        public List<Command> DisconnectUser(string userId)
        {
            var user = Users.Where(x => x.ConnectionId == userId).FirstOrDefault();
            if (user == null)
                return null;
            var commands = new List<Command>();
            Users.Remove(user);
            commands.Add(new Command("Disconnected", user, Users.ToArray()));
            if (user == Presenter)
            {
                SetRandomPresenter();
                commands.Add(new Command("NewPresenter", Presenter, Users.ToArray()));
            }
            return commands;
        }
        public Command AnswerMessages(string connectionId, int messageId, MessageType type)
        {
            if (Presenter.ConnectionId != connectionId)
                return null;
            var message = Messages.Where(x => x.Id == messageId).FirstOrDefault();
            if (message != null)
            {
                message.Type = type;
                return new Command("UpdateMessage", message, Users.ToArray());
            }
            return null;

        }
    }
}
