using System;
using System.IdentityModel.Tokens.Jwt;

namespace Common.Entities
{
    public interface IToken
    {
        public string Key { get; set; }
    }
}