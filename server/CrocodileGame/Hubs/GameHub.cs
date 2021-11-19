using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CrocodileGame.Model.Entities;
using CrocodileGame.Model.Enums;
using CrocodileGame.Model.Interfaces;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;

namespace CrocodileGame.Hubs
{
    public class GameHub : Hub
    {
        private ILogger<GameHub> _logger;
        private IGameManager _gameManager;
        public GameHub(ILogger<GameHub> logger, IGameManager gameManager)
        {
            _gameManager = gameManager;
            _logger = logger;
        }
        public async Task Connect(string name)
        {
           var command = await _gameManager.Connect(name, Context.ConnectionId);
            if (command != null)
                await SendCommands(command);
        }
        public async Task Disconnect()
        {
            _logger.LogInformation(Context.ConnectionId);
            var commands = await _gameManager.Disconnect(Context.ConnectionId);
            if(commands != null)
            await SendCommands(commands);
        }
        public override async Task OnDisconnectedAsync(Exception exception)
        {
            var commands = await _gameManager.Disconnect(Context.ConnectionId);
            if (commands != null)
                await SendCommands(commands);
            await base.OnDisconnectedAsync(exception);
        }
        public async Task SendMessage(string text)
        {
            var commands = await _gameManager.ProcessMessage(text, Context.ConnectionId);
            if (commands != null)
                await SendCommands(commands);
        }
        public async Task AnswerMessage(int messageId,string answer)
        {
            var commands = _gameManager.AnswerMessage(messageId, answer, Context.ConnectionId);
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
