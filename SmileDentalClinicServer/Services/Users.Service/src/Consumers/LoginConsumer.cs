using System.Threading.Tasks;
using Auth.Contracts;
using Common.Repositories;
using MassTransit;
using Users.Catalog.Service.Entities;
using Users.Catalog.Service;
using System;

namespace Users.Service.src.Consumers
{
    public class LoginConsumer : IConsumer<LoginPublishDto>
    {
        private readonly IRepository<User> usersRepository;
        private readonly IPublishEndpoint publishEndpoint;
        public LoginConsumer(IRepository<User> usersRepository, IPublishEndpoint publishEndpoint)
        {
            this.usersRepository = usersRepository;
            this.publishEndpoint = publishEndpoint;
        }
        public async Task Consume(ConsumeContext<LoginPublishDto> context)
        {
            var message = context.Message;

            var user = await usersRepository.GetAsync(u => u.Email == message.Email && u.Password == message.Password);

            if (user != null)
            {
                var userToSend = new User
                {
                    Id = user.Id,
                    Fname = user.Fname,
                    Lname = user.Lname,
                    Email = user.Email,
                    Password = user.Password,
                    PhoneNumber = user.PhoneNumber,
                    ProfileImage = user.ProfileImage,
                    Role = user.Role
                };
                await publishEndpoint.Publish(userToSend.UserPublishAsDto());
            }
            else
            {
                var userFail = new User { Id = Guid.Empty };
                await publishEndpoint.Publish(userFail.UserPublishAsDto());
            }
        }
    }
}