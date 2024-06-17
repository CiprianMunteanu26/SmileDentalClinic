using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Scheduler.Service.Entities;
using Scheduler.Service.src;
using Common.Repositories;
using MassTransit;
using Users.Contracts;
using static Appointments.Contracts.Contracts;

namespace Scheduler.Service.Consumers
{
    public class UserIdConsumer : IConsumer<UserIdPublishDto>
    {
        private readonly IRepository<Appointment> appointmentsRepository;
        private readonly IRepository<UserAppointment> userAppointmentsRepository;
        private readonly IPublishEndpoint publishEndpoint;

        public UserIdConsumer(IRepository<Appointment> appointmentsRepository, IRepository<UserAppointment> userAppointmentsRepository, IPublishEndpoint publishEndpoint)
        {
            this.appointmentsRepository = appointmentsRepository;
            this.userAppointmentsRepository = userAppointmentsRepository;
            this.publishEndpoint = publishEndpoint;
        }

        public async Task Consume(ConsumeContext<UserIdPublishDto> context)
        {
            var message = context.Message;
            var appointments = await appointmentsRepository.GetAllAsync();
            var appointmentsOfUser = await userAppointmentsRepository.GetAllAsync(userAppointment => userAppointment.UserId == message.UserId);
            AppointmentPublishDto[] items = new AppointmentPublishDto[0];
            if (appointmentsOfUser.Any())
            {
                var appointmentsToSend = appointmentsOfUser.Select(binder =>
                            {
                                var tmpAppointment = appointments.SingleOrDefault(appointment => appointment.Id == binder.AppointmentId);
                                if (tmpAppointment != null)
                                {
                                    return binder.AppointmentToSendAsDto(tmpAppointment.Name);
                                }
                                else
                                    return null;
                            }).Where(dto => dto != null);
                items = appointmentsToSend.ToArray();

            }
            await publishEndpoint.Publish(items);
        }
    }
}