using System;
using Common.Entities;

namespace Auth.Serivce.Entities
{
    public class Login : IEntity
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public DateTimeOffset CreatedDate { get; set; }
    }
}