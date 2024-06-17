using System;

namespace Auth.Serivce
{
    public record LoginDto(Guid Id, Guid UserId, DateTime Date);
    public record CreateLoginDto(string Email, string Password);
    public record RegisterDto(Guid Id, Guid UserId, DateTime CreatedDate);
    public record CreateRegisterDto(string Fname, string Lname, string Email, string Password, string PhoneNumber, string Role);
}