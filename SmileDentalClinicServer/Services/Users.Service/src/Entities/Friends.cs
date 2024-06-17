using System;
using Common.Entities;

namespace Users.Catalog.Service.Entities
{
    public class Friend : IEntity
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public Guid OtherId { get; set; }
    }
}