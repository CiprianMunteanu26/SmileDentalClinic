namespace Auth.Contracts
{
    public record LoginPublishDto(string Email, string Password);
    public record RegisterPublishDto(string Fname, string Lname, string Email, string Password, string PhoneNumber, string Role);
}