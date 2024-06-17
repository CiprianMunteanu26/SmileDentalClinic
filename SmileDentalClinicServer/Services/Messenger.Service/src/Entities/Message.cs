using System;
using Common.Entities;

namespace Messenger.Service.Entities
{
    public class Message : IEntity
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public Guid ConvId { get; set; }
        public string MessageBody { get; set; }
        public DateTimeOffset CreatedDate { get; set; }
    }
}