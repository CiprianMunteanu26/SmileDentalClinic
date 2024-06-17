using System.Threading.Tasks;
using Auth.Contracts;
using Auth.Serivce.Consumers;
using Auth.Serivce.src;
using Auth.Serivce.src.Models;
using MassTransit;
using Microsoft.AspNetCore.Mvc;
using Common.Utilities;
namespace Auth.Serivce.Controllers
{
    [ApiController]
    [Route("auth")]
    public class AuthController : ControllerBase
    {
        private readonly IPublishEndpoint publishEndpoint;
        private readonly UserConsumer userConsumer;

        public AuthController(IPublishEndpoint publishEndPoint, UserConsumer userConsumer)
        {
            this.publishEndpoint = publishEndPoint;
            this.userConsumer = userConsumer;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(CreateLoginDto createLoginDto)
        {
            if (string.IsNullOrEmpty(createLoginDto.Email) || string.IsNullOrEmpty(createLoginDto.Password)) return BadRequest();
            var login = new LoginModel
            {
                Email = createLoginDto.Email,
                Password = HashPassword.Hash(createLoginDto.Password)
            };

            await publishEndpoint.Publish(new LoginPublishDto(login.Email, login.Password));
            await userConsumer.WaitMessageAsync();
            var token = userConsumer.Token;
            if (token != null)
            {
                await userConsumer.DelToken();
                return Ok(token);
            }
            await userConsumer.DelToken();
            return Unauthorized();
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(CreateRegisterDto createRegisterDto)
        {
            var register = new RegisterModel
            {
                Fname = createRegisterDto.Fname,
                Lname = createRegisterDto.Lname,
                Email = createRegisterDto.Email,
                Password = Utilities.HashPassword(createRegisterDto.Password),
                PhoneNumber = createRegisterDto.PhoneNumber,
                Role = createRegisterDto.Role
            };
            await publishEndpoint.Publish(new RegisterPublishDto(register.Fname, register.Lname, register.Email, register.Password, register.PhoneNumber, register.Role));
            return Ok("user created");
        }
    }
}