using System.Text;
using Common.Settings;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace Common.JwtManager
{
    public static class Extensions
    {
        public static IServiceCollection AddTokenService(this IServiceCollection services)
        {
            services.AddSingleton(serviceProvider =>
           {
               var configuration = serviceProvider.GetService<IConfiguration>();
               var serviceSettings = configuration.GetSection(nameof(ServiceSettings)).Get<ServiceSettings>();
               var tokenSettings = configuration.GetSection(nameof(TokenSettings)).Get<TokenSettings>();
               var userToken = new UserToken(tokenSettings.Key);
               return userToken;
           });
            return services;
        }

        public static IServiceCollection AddAuthWithJwtBearer(this IServiceCollection services)
        {
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
                    {
                        options.RequireHttpsMetadata = false;
                        options.SaveToken = true;
                        options.TokenValidationParameters = new TokenValidationParameters
                        {
                            ValidateIssuerSigningKey = true,
                            ValidateIssuer = false,
                            ValidateAudience = false,
                            ValidateLifetime = true,
                            IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes("123aPassowrdLikeNOthhErPassWorDs123"))
                        };
                    });
            return services;
        }
    }
}