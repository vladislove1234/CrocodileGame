using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CrocodileGame.Model.Entities;
using CrocodileGame.Model.Enums;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;

namespace CrocodileGame.Hubs
{
    public class GameHub : Hub
    {
        private GameRoom _room;
        private ILogger<GameHub> _logger;
        public GameHub(ILogger<GameHub> logger)
        {
            _room = new GameRoom("Room #1");
            _logger = logger;
        }
        public async Task Connect(string name)
        {
            _logger.LogInformation($"Connected {name}");
            var command = _room.ConnectUser(name, Context.ConnectionId);
            if(command != null)
            await SendCommand(command);
        }
        public async Task Disconnect(string name)
        {
            _logger.LogInformation($"Disconnected {name}");
            var commands = _room.DisconnectUser(Context.ConnectionId);
            if(commands != null)
            await SendCommands(commands);
        }
        public async Task SendMessage(string text)
        {
            _logger.LogInformation($"Recieved message {text}");
            var commands = _room.PorcessMessage(text, Context.ConnectionId);
            if (commands != null)
                await SendCommands(commands);
        }
        public async Task AnswerMessage(int messageId,string answer)
        {
            _logger.LogInformation($"Recieved answer {answer} to message {messageId}");
            if (Enum.TryParse(typeof(MessageType), answer, out object type))
            {
                var command = _room.AnswerMessages(Context.ConnectionId, messageId, (MessageType)type);
                if (command != null)
                    await SendCommand(command);
            }
            else
            {
                _logger.LogWarning($"Failed to parse asnwer {answer}");
            }
        }
        public async Task SendCommand(Command command)
        {
            _logger.LogInformation($"Sending Command {command.MethodName}");
            foreach (var user in command.Users)
            {
                await Clients.Client(user.ConnectionId).SendAsync(command.MethodName, command.Content);
            }
        }
        public async Task SendCommands(List<Command> commands)
        {
            foreach (var command in commands)
            {
                _logger.LogInformation($"Sending Command {command.MethodName}");
                foreach (var user in command.Users)
                {
                    await Clients.Client(user.ConnectionId).SendAsync(command.MethodName, command.Content);
                }
            }
        }
    }
}
