using System;

namespace Common.Models
{
    public class DataToSend
    {
        public Guid UserId { get; set; }
        public string Role { get; set; }
        public DateTimeOffset LastLogin { get; set; }
        public int LoginTimes { get; set; }
    }

}