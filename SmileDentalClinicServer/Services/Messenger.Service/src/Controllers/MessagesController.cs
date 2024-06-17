using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Common.Repositories;
using Messenger.Service.Entities;
using Microsoft.AspNetCore.Mvc;


namespace Messenger.Service.Controllers
{
    [ApiController]
    [Route("messages")]
    public class MessagesController : ControllerBase
    {
        private readonly IRepository<Message> messageRepository;

        public MessagesController(IRepository<Message> messageRepository)
        {
            this.messageRepository = messageRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<MessageDto>> GetAllAsync()
        {
            var messages = (await messageRepository.GetAllAsync()).Select(message => message.AsDto());
            return messages;
        }

        [HttpGet("convmessages/{convId}")]
        public async Task<IEnumerable<MessageDto>> GetConvMessagesAsync(Guid convId)
        {
            var messages = (await messageRepository.GetAllAsync(message => message.ConvId == convId)).Select(message => message.AsDto());
            return messages;
        }

        [HttpGet("{userId}/{convId}")]
        public async Task<ActionResult<IEnumerable<MessageDto>>> GetAsync(Guid userId, Guid convId)
        {
            if (userId == Guid.Empty) return BadRequest();
            var messages = (await messageRepository.GetAllAsync(message => message.UserId == userId && message.ConvId == convId)).Select(message => message.AsDto());
            return Ok(messages);
        }

        [HttpGet("body/{userId}/{convId}/{messageBody}")]
        public async Task<ActionResult<IEnumerable<MessageDto>>> GetByMessageBodyAsync(Guid userId, Guid convId, string messageBody)
        {
            if (userId == Guid.Empty || convId == Guid.Empty) return BadRequest();
            var messages = (await messageRepository.GetAllAsync(message => (message.UserId == userId && message.ConvId == convId) && message.MessageBody.Contains(messageBody))).Select(message => message.AsDto());
            return Ok(messages);
        }

        [HttpPost("send")]
        public async Task<ActionResult> PostAsync(CreateMessageDto createMessageDto)
        {
            if (createMessageDto.UserId == Guid.Empty || createMessageDto.ConvId == Guid.Empty || string.IsNullOrEmpty(createMessageDto.MessageBody))
                return BadRequest();

            var message = new Message
            {
                UserId = createMessageDto.UserId,
                ConvId = createMessageDto.ConvId,
                MessageBody = createMessageDto.MessageBody,
                CreatedDate = DateTimeOffset.UtcNow
            };

            await messageRepository.CreateAsync(message);

            return Ok("Message created");
        }
    }
}