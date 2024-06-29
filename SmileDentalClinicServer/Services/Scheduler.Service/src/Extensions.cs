using Scheduler.Service.Entities;
using static Appointments.Contracts.Contracts;

namespace Scheduler.Service.src
{
    public static class Extensions
    {
        public static AppointmentDto AsDto(this Appointment appointment)
        {
            return new AppointmentDto(appointment.Id, appointment.UserId, appointment.Name, appointment.StartTime, appointment.EndTime, appointment.Type, appointment.DoctorId, appointment.Status, appointment.DoctorName, appointment.PacientName );
        }

        public static AppointmentPublishDto AppointmentToSendAsDto(this UserAppointment appointment, string Name)
        {
            return new AppointmentPublishDto(appointment.Id, appointment.AppointmentId, Name);
        }
        public static UserAppointmentDto UserAppointmentAsDto(this UserAppointment appointment, string Name)
        {
            return new UserAppointmentDto(appointment.UserId, appointment.AppointmentId, Name);
        }

    }
}
