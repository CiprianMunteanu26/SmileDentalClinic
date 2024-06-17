using System;
using Messenger.Service.Entities;

namespace Messenger.Service
{
    public static class Extensions
    {
        public static MessageDto AsDto(this Message message)
        {
            return new MessageDto(message.Id, message.ConvId, message.UserId, message.MessageBody, message.CreatedDate);
        }

        public static ConversationDto AsDto(this Conversation conversation)
        {
            return new ConversationDto(conversation.Id, conversation.UserId, conversation.OtherId);
        }

        public static ConvBinderDto AsDto(this ConvBinder convBinder, string MessageBody, DateTimeOffset CreatedDate, Guid UserId, Guid OtherId)
        {
            return new ConvBinderDto(convBinder.Id, convBinder.ConversationId, convBinder.MessageId, MessageBody, CreatedDate, UserId, OtherId);
        }
    }
}