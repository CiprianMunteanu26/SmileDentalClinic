using System.Threading.Tasks;
using Auth.Contracts;
using Common.Repositories;
using MassTransit;
using Users.Catalog.Service.Entities;

namespace Users.Service.src.Consumers
{
    public class RegisterConsumer : IConsumer<RegisterPublishDto>
    {
        private readonly IRepository<User> usersRepository;
        public RegisterConsumer(IRepository<User> usersRepository)
        {
            this.usersRepository = usersRepository;
        }
        public async Task Consume(ConsumeContext<RegisterPublishDto> context)
        {
            var message = context.Message;
            var existingUser = usersRepository.GetAsync(user => user.Email == message.Email);
            if (existingUser.Result != null) return;

            var user = new User
            {
                Fname = message.Fname,
                Lname = message.Lname,
                Email = message.Email,
                Password = message.Password,
                PhoneNumber = message.PhoneNumber,
                Role = message.Role
            };
            await usersRepository.CreateAsync(user);
            return;
        }
    }
}