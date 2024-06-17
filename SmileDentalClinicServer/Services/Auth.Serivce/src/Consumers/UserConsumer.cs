using System;
using System.Linq;
using System.Threading.Tasks;
using Auth.Serivce.Entities;
using Common.JwtManager;
using Common.Models;
using Common.Repositories;
using MassTransit;
using Users.Contracts;


namespace Auth.Serivce.Consumers
{
    public class UserConsumer : IConsumer<UserPublishDto>
    {
        public string Token { get; set; }
        private readonly IRepository<Login> loginRepository;
        private readonly UserToken userToken;
        private TaskCompletionSource<bool> consumeTaskCompletionSource = new TaskCompletionSource<bool>();

        public UserConsumer(IRepository<Login> loginRepository, UserToken userToken)
        {
            this.loginRepository = loginRepository;
            this.userToken = userToken;
        }

        public async Task Consume(ConsumeContext<UserPublishDto> context)
        {
            var message = context.Message;
            if (message.Id != Guid.Empty)
            {
                var userLogin = new Login
                {
                    UserId = message.Id,
                    CreatedDate = DateTimeOffset.UtcNow
                };
                await loginRepository.CreateAsync(userLogin);
                var logins = await loginRepository.GetAllAsync(login => login.UserId == message.Id);

                var userToSendDto = new DataToSend
                {
                    UserId = message.Id,
                    Role = message.Role,
                    LastLogin = logins.Last().CreatedDate,
                    LoginTimes = logins.Count()
                };
                var token = userToken.GenerateToken(userToSendDto);
                await SetToken(token);
            }
            consumeTaskCompletionSource.SetResult(true);
            await Task.CompletedTask;
        }

        public async Task SetToken(string token)
        {
            Token = token;
            await Task.CompletedTask;
        }

        public async Task DelToken()
        {
            consumeTaskCompletionSource = new TaskCompletionSource<bool>();
            Token = null;
            await Task.CompletedTask;
        }
        public async Task WaitMessageAsync()
        {
            await consumeTaskCompletionSource.Task;
        }
    }
}
