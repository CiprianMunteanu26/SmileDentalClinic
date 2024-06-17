using System;
using Common.Entities;

namespace Messenger.Service.Entities
{
    public class Conversation : IEntity
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public Guid OtherId { get; set; }
    }
}