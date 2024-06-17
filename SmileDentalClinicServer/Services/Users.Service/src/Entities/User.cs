using System;
using System.Collections.Generic;
using Common.Entities;
using static Appointments.Contracts.Contracts;

namespace Users.Catalog.Service.Entities
{
    public class User : IEntity
    {
        public Guid Id { get; set; }
        public string Fname { get; set; }
        public string Lname { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string PhoneNumber { get; set; }
        public string ProfileImage { get; set; }
        public string Role { get; set; }
        public string Cabinet { get; set; }
        public string Detalis { get; set; }
        public string Function { get; set; }
        public List<AppointmentPublishDto> Appointments = new List<AppointmentPublishDto>();
    }
}