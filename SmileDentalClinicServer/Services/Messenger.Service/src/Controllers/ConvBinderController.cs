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
    [Route("convsbinder")]
    public class ConvBinderController : ControllerBase
    {
        private readonly IRepository<ConvBinder> convBinderRepository;
        private readonly IRepository<Message> messageRespository;
        private readonly IRepository<Conversation> convRepository;

        public ConvBinderController(IRepository<ConvBinder> convBinderRepository, IRepository<Message> messageRespository, IRepository<Conversation> convRepository)
        {
            this.convBinderRepository = convBinderRepository;
            this.messageRespository = messageRespository;
            this.convRepository = convRepository;
        }

        [HttpGet("{convId}")]
        public async Task<ActionResult<IEnumerable<ConvBinderDto>>> GetAsync(Guid convId)
        {
            var messages = await messageRespository.GetAllAsync();
            var conversations = await convRepository.GetAllAsync();
            if (!messages.Any() || !conversations.Any()) return BadRequest();
            var convBindings = await convBinderRepository.GetAllAsync(conv => conv.ConversationId == convId);

            var convBindedMsgDto = convBindings.Select(binder =>
            {
                var msgs = messages.Single(message => message.Id == binder.MessageId);
                var convs = conversations.Single(conv => conv.Id == binder.ConversationId);
                return binder.AsDto(msgs.MessageBody, msgs.CreatedDate, msgs.UserId, convs.OtherId);
            });
            return Ok(convBindedMsgDto);
        }

        [HttpPost]
        public async Task<ActionResult> PostAsync(CreateConvBinderDto createConvBinderDto)
        {
            var convBinder = new ConvBinder
            {
                ConversationId = createConvBinderDto.ConversationId,
                MessageId = createConvBinderDto.MessageId
            };

            await convBinderRepository.CreateAsync(convBinder);

            return Ok("Conversation binder was set");
        }
    }
}