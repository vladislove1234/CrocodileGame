using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CrocodileGame.Model.Entities;

namespace CrocodileGame.Model.Interfaces
{
    public interface IGameManager
    {
        public Task<List<Command>> Connect(string name, string connectionId);
        public Task<List<Command>> Disconnect(string connectionId);
        public Task<List<Command>> ProcessMessage(string text, string connectionId);
        public Task<Command> AnswerMessage(int messageId, string answer, string connectionId);
    }
}
