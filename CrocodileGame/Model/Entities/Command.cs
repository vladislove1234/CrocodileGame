using System;
using System.Collections.Generic;
using CrocodileGame.Model.Enums;

namespace CrocodileGame.Model.Entities
{
    public class Command
    {
        public string MethodName;
        public object Content;
        public List<User> Users;
        public Command(string methodName, object content, params User[] users)
        {
            MethodName = methodName;
            Content = content;
            Users = new List<User>(users);
        }
    }
}
