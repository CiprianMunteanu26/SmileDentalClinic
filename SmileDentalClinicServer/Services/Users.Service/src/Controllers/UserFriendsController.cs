using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Common.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Users.Catalog.Service.Entities;

namespace Users.Catalog.Service.Controllers
{
    [ApiController]
    [Route("friends")]

    public class UserFriendsController : ControllerBase
    {
        private readonly IRepository<Friend> friendsRepository;
        private readonly IRepository<User> userRepository;

        public UserFriendsController(IRepository<Friend> friendsRepository, IRepository<User> userRepository)
        {
            this.friendsRepository = friendsRepository;
            this.userRepository = userRepository;
        }

        [HttpGet("{userId}")]
        [Authorize]
        public async Task<IEnumerable<FriendDto>> GetAsync(Guid userId)
        {
            var friends = (await friendsRepository.GetAllAsync(friend => friend.UserId == userId)).Select(friend => friend.AsFriendDto());
            return friends;
        }

        [HttpGet("get/{userId}")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetFreindsAsync(Guid userId)
        {
            var friends = (await friendsRepository.GetAllAsync());
            var users = (await userRepository.GetAllAsync());
            if (friends.Any())
            {

                var friendtoSendDto = users.Select(binder =>
                {
                    var tmpFriend = friends.FirstOrDefault(friend => friend.OtherId == binder.Id && friend.UserId == userId);
                    if (tmpFriend != null)
                        return tmpFriend.AsFriendToSendDto(binder.Fname, binder.Lname, binder.ProfileImage);
                    else
                        return null;
                }).Where(dto => dto != null);

                return Ok(friendtoSendDto);
            }
            return BadRequest();

        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<FriendDto>> PostAsync(CreateFriendDto createFriendDto)
        {
            if (createFriendDto.UserId == Guid.Empty || createFriendDto.OtherId == Guid.Empty) return BadRequest();

            var friends = (await friendsRepository.GetAllAsync()).Where(friend => friend.OtherId == createFriendDto.OtherId && friend.UserId == createFriendDto.UserId);
            if (friends.Any()) return BadRequest();

            var friend = new Friend
            {
                UserId = createFriendDto.UserId,
                OtherId = createFriendDto.OtherId
            };
            await friendsRepository.CreateAsync(friend);
            return CreatedAtAction(nameof(PostAsync), new
            {
                id = friend.Id
            });
        }

        [HttpDelete]
        [Authorize]
        public async Task<ActionResult<FriendDto>> DeleteAsync(CreateFriendDto createFriendDto)
        {
            var friends = (await friendsRepository.GetAllAsync()).SingleOrDefault(friend => friend.OtherId == createFriendDto.OtherId);
            if (friends == null) return NotFound();

            await friendsRepository.RemoveAsync(friends.Id);
            return NoContent();
        }
    }
}