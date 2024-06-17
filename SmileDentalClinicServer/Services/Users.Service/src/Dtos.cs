 using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using static Appointments.Contracts.Contracts;

namespace Users.Catalog.Service
{
    public record UserDto(Guid Id, string Fname, string Lnmae, string Email, string Password, string PhoneNumber, string ProfileImage, string Role, List<AppointmentPublishDto> Appointments);

    public record CreateUserDto([Required] string Fname, [Required] string Lname, string Email, string Password, string PhoneNumber, string Role);
    public record UpdateUserDto(string Fname, string Lname, string Password, string PhoneNumber, string ProfileImage);

    public record FriendDto(Guid Id, Guid UserId, Guid OtherId);
    public record FriendToSendDto(Guid FriendId, string Fname, string Lname, string ProfileImage);
    public record CreateFriendDto(Guid UserId, Guid OtherId);
}