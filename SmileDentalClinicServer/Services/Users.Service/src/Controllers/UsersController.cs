using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Common.Repositories;
using MassTransit;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Users.Catalog.Service.Entities;
using Users.Contracts;
using Common.Utilities;
using Users.Service.src.Consumers;
using static Appointments.Contracts.Contracts;
using System.IO;
using Users.Service.src;

namespace Users.Catalog.Service.Controllers
{
    [ApiController]
    [Route("users")]

    public class UsersController : ControllerBase
    {
        private readonly IRepository<User> userRepository;
        private readonly IPublishEndpoint publishEndpoint;
        private readonly AppointmentsConsumer appointmentsConsumer;
        public UsersController(IRepository<User> usersRepository, IRepository<Friend> friendRepository, IPublishEndpoint publishEndpoint, AppointmentsConsumer appointmentsConsumer)
        {
            this.userRepository = usersRepository;
            this.publishEndpoint = publishEndpoint;
            this.appointmentsConsumer = appointmentsConsumer;
        }

        [HttpGet]
        [Authorize]
        public async Task<IEnumerable<UserDto>> GetAsync()
        {
            var users = (await userRepository.GetAllAsync()).Select(user => user.AsDto());
            return users;
        }

        [HttpGet("entitybyid/{id}")]
        [Authorize]
        public async Task<ActionResult<UserDto>> GetByIdAsync(Guid id)
        {
            var user = (await userRepository.GetAsync(id));
            return user.AsDto();
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<UserDto>> GetAllByIdAsync(Guid id)
        {
            var user = (await userRepository.GetAsync(id));
            if (user != null)
                return user.AsDto();
            return BadRequest();
        }

        [HttpGet("entity/{data}/{role}")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetByNameAsync(string data, string role)
        {
            var usersByRole = (await userRepository.GetAllAsync()).Where(user => (user.Fname.ToLower().Contains(data.ToLower()) ||
                                                                         user.Lname.ToLower().Contains(data.ToLower()) ||
                                                                         user.Email.ToLower() == data.ToLower()) &&
                                                                           user.Role == role)
                                                                         .Select(user => user.AsDto());
            if (!usersByRole.Any()) return BadRequest();

            return Ok(usersByRole);
        }

        [HttpGet("entity/{role}")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetByRoleAsync(string role)
        {
            var users = (await userRepository.GetAllAsync());
            if (users == null) return BadRequest();
            var usersByRole = users.Where(user => user.Role == role).Select(user => user.AsDto());
            return Ok(usersByRole);
        }

        [HttpPost]
        public async Task<ActionResult<UserDto>> PostAsync(CreateUserDto createUserDto)
        {
            var user = new User
            {
                Fname = createUserDto.Fname,
                Lname = createUserDto.Lname,
                Email = createUserDto.Email,
                Password = createUserDto.Password,
                PhoneNumber = createUserDto.PhoneNumber,
                Role = createUserDto.Role
            };
            await userRepository.CreateAsync(user);
            return CreatedAtAction(nameof(PostAsync), new
            {
                id = user.Id
            });
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> PutAsync(Guid id, UpdateUserDto updatedUserDto)
        {
            var currentUser = await userRepository.GetAsync(id);
            if (currentUser == null) return NotFound();

            var profileImage = updatedUserDto.ProfileImage;
            string targetFolder = "";
            string base64Data = "";
            if (!string.IsNullOrEmpty(updatedUserDto.ProfileImage))
            {
                string imageExtension = Utilities.GetImageExtension(updatedUserDto.ProfileImage);
                string fileName = id.ToString() + imageExtension;
                string imageExtension2 = imageExtension.Replace(".", string.Empty);
                if (imageExtension2 == "jpg")
                    base64Data = updatedUserDto.ProfileImage.Replace($"data:image/jpeg;base64,", string.Empty);
                else
                    base64Data = updatedUserDto.ProfileImage.Replace($"data:image/{imageExtension2};base64,", string.Empty);
                targetFolder = Path.Combine("..", "..", "..", "..", "SmileDentalClinicApp", "src", "static", "imgs", "avatars").Replace("\\", "/");
                targetFolder = Path.Combine(targetFolder, fileName).Replace("\\", "/"); ;
                byte[] bytes = Convert.FromBase64String(base64Data);

                if (!Utilities.SaveImage(bytes, targetFolder)) return BadRequest();
            }

            var hashedPwd = HashPassword.Hash(updatedUserDto.Password);

            currentUser.Fname = updatedUserDto.Fname;
            currentUser.Lname = updatedUserDto.Lname;
            currentUser.Password = hashedPwd;
            currentUser.PhoneNumber = updatedUserDto.PhoneNumber;
            currentUser.ProfileImage = targetFolder;

            await userRepository.UpdateAsync(currentUser);

            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteAsync(Guid id)
        {
            var user = await userRepository.GetAsync(id);
            if (user == null) return NotFound();

            await userRepository.RemoveAsync(id);

            return NoContent();
        }
    }
}
