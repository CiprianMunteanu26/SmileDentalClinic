using System;
using Common.Entities;

namespace Scheduler.Service.Entities
{
    public class UserAppointment : IEntity
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }//Id ul doctorului
        public Guid AppointmentId { get; set; }
    }
}