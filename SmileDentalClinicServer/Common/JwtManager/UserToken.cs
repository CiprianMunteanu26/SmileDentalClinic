using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Common.Models;
using Common.Entities;
using Microsoft.IdentityModel.Tokens;

namespace Common.JwtManager
{
    public class UserToken : IToken
    {
        public string Key { get; set; }
        private JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();

        public UserToken(string Key)
        {
            this.Key = Key;
        }

        public string GenerateToken(DataToSend dataToSend)
        {
            var key = Encoding.ASCII.GetBytes(Key);
            var claims = new List<Claim>();


            foreach (var prop in typeof(DataToSend).GetProperties())
            {
                var value = prop.GetValue(dataToSend);
                if (value != null && !string.IsNullOrEmpty(value.ToString()))
                {
                    var claim = new Claim(prop.Name, value.ToString());
                    claims.Add(claim);
                }
                else
                {
                    var claim = new Claim(prop.Name, "");
                    claims.Add(claim);
                }
            }


            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(8),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}