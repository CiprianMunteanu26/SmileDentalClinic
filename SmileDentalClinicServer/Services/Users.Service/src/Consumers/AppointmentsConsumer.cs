using System.Threading.Tasks;
using Common.Repositories;
using MassTransit;
using Users.Catalog.Service.Entities;
using static Appointments.Contracts.Contracts;

namespace Users.Service.src.Consumers
{
    public class AppointmentsConsumer : IConsumer<AppointmentPublishDto[]>
    {
        public AppointmentPublishDto[] appointments { get; set; }
        private readonly IRepository<User> usersRepository;
        private TaskCompletionSource<bool> consumeTaskCompletionSource = new TaskCompletionSource<bool>();

        public AppointmentsConsumer(IRepository<User> usersRepository)
        {
            this.usersRepository = usersRepository;
        }

        public async Task Consume(ConsumeContext<AppointmentPublishDto[]> context)
        {
            consumeTaskCompletionSource = new TaskCompletionSource<bool>();
            if (context.Message != null)
            {
                appointments = context.Message;
            }
            consumeTaskCompletionSource.SetResult(true);
            await Task.CompletedTask;
        }

        public async Task WaitMessageAsync()
        {
            await consumeTaskCompletionSource.Task;
        }

        public void ResetAppointments()
        {
            appointments = null;
        }
    }

}