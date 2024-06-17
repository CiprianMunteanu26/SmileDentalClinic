using System;

namespace Appointments.Contracts
{
    public class Contracts
    {
        public record AppointmentPublishDto(Guid Id, Guid AppointmentId, string Name);
        public record TestPublishDto(string Name);
    }
}
