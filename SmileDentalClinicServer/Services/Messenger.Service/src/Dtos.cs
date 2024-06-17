using System;
using System.ComponentModel.DataAnnotations;

namespace Messenger.Service
{
    public record MessageDto(Guid Id, Guid UserId, Guid ConvId, string MessageBody, DateTimeOffset CreatedDate);
    public record CreateMessageDto(Guid UserId, Guid ConvId, string MessageBody, DateTimeOffset CreatedDate);

    public record ConversationDto(Guid Id, Guid UserId, Guid OtherId);
    public record CreateConvDto([Required] Guid UserId, [Required] Guid OtherId);

    public record ConvBinderDto(Guid Id, Guid ConversationId, Guid MessageId, string MessageBody, DateTimeOffset CreatedDate, Guid UserId, Guid OtherId);
    public record CreateConvBinderDto([Required] Guid ConversationId, [Required] Guid MessageId);

}