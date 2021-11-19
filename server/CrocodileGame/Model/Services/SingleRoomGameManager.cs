using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CrocodileGame.Model.Entities;
using CrocodileGame.Model.Enums;
using CrocodileGame.Model.Interfaces;
using Microsoft.Extensions.Logging;

namespace CrocodileGame.Model.Services
{
    public class SingleRoomGameManager : IGameManager
    {
        private GameRoom _room;
        private ILogger<SingleRoomGameManager> _logger;
        public SingleRoomGameManager(ILogger<SingleRoomGameManager> logger)
        {
            _logger = logger;
            _room = new GameRoom("Room #1", _logger);
        }
        public async Task<List<Command>> Connect(string name, string connectionId)
        {
            var commands = _room.ConnectUser(connectionId, name);
            return commands;
        }
        public async Task<List<Command>> Disconnect(string connectionId)
        {
            var commands = _room.DisconnectUser(connectionId);
            return commands;
        }
        public async Task<List<Command>> ProcessMessage(string text, string connectionId)
        {
            _logger.LogInformation($"Recieved message {text}");
            var commands = _room.PorcessMessage(text, connectionId);
            return commands;
        }
        public async Task<Command> AnswerMessage(int messageId, string answer, string connectionId)
        {
            _logger.LogInformation($"Recieved answer {answer} to message {messageId}");
            if (Enum.TryParse(typeof(MessageType), answer, out object type))
            {
                var command = _room.AnswerMessages(connectionId, messageId, (MessageType)type);
                return command;
            }
            else
            {
                _logger.LogWarning($"Failed to parse asnwer {answer}");
                return null;
            }
        }
    }
}
