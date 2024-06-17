using System;

namespace Scheduler.Service.src
{
    public record AppointmentDto(Guid Id, Guid UserId, string Name, DateTime StartTime, DateTime EndTime, string Type, Guid DoctorId, String Status);
    public record CreateAppointmentDto(Guid UserId, DateTime StartTime, DateTime EndTime, string Type, Guid DoctorId, String Status);
    public record UpdateAppointmentDto(DateTime StartTime, DateTime EndTime, String Status);
    public record UserAppointmentDto(Guid UserId, Guid AppointmentId, string Name);
    public record CreateUserAppointmentDto(Guid UserId, Guid AppointmentId);
}