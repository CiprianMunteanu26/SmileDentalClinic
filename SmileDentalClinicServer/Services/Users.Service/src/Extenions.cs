using Users.Catalog.Service.Entities;
using Users.Contracts;

namespace Users.Catalog.Service
{
    public static class Extensions
    {
        public static UserDto AsDto(this User user)
        {
            return new UserDto(user.Id, user.Fname, user.Lname, user.Email, user.Password, user.PhoneNumber, user.ProfileImage, user.Role, user.Appointments);
        }

        public static FriendDto AsFriendDto(this Friend friend)
        {
            return new FriendDto(friend.Id, friend.UserId, friend.OtherId);
        }

        public static FriendToSendDto AsFriendToSendDto(this Friend friend, string Fname, string Lname, string ProfileImage)
        {
            return new FriendToSendDto(friend.OtherId, Fname, Lname, ProfileImage);
        }

        public static UserPublishDto UserPublishAsDto(this User user)
        {
            return new UserPublishDto(user.Id, user.Fname, user.Lname, user.Email, user.Password, user.PhoneNumber, user.ProfileImage, user.Function, user.Cabinet, user.Detalis, user.Role);
        }
    }
}