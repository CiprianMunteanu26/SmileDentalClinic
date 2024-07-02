using System;
using Common.Entities;

namespace Scheduler.Service.Entities
{
    public class Appointment : IEntity
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }//ID ul pacientului
        public string Name { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string Type { get; set; }
        public Guid DoctorId { get; set; }//ID ul doctorului
        public string Status { get; set; }
        public string DoctorName { get; set; }
        public string PacientName { get; set; }
    }
}