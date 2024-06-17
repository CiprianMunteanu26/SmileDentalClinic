using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Users.Contracts;

namespace Auth.Serivce.src
{
    public static class Utilities
    {
        public static string TokeniseMessage(UserPublishDto message, string secretKey, int time)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var newSecretKey = Encoding.UTF8.GetBytes(secretKey);
            var key = new SymmetricSecurityKey(newSecretKey);
            Console.WriteLine(message);
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, message.Id.ToString()),
                new Claim(ClaimTypes.NameIdentifier, message.Fname.ToString()),
                new Claim(ClaimTypes.NameIdentifier, message.Lname.ToString()),
                new Claim(ClaimTypes.NameIdentifier, message.Email.ToString()),
                new Claim(ClaimTypes.NameIdentifier, message.Password.ToString()),
                new Claim(ClaimTypes.NameIdentifier, message.PhoneNumber.ToString()),
                new Claim(ClaimTypes.NameIdentifier, message.Role.ToString())
            };
            var signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddHours(time),
                signingCredentials: signingCredentials
            );
            return tokenHandler.WriteToken(token);
        }

        public static string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                byte[] hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));

                StringBuilder sb = new StringBuilder();
                foreach (byte b in hashedBytes)
                {
                    sb.Append(b.ToString("x2"));
                }

                return sb.ToString();
            }
        }
    }
}