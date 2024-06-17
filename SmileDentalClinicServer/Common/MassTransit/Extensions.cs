using System.Reflection;
using Common.JwtManager;
using Common.Settings;
using MassTransit;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
namespace Common.MassTransit
{
    public static class Extensions
    {
        public static IServiceCollection AddMassTransitWithRabbitMq(this IServiceCollection services)
        {
            services.AddMassTransit(transit =>
            {
                transit.AddConsumers(Assembly.GetEntryAssembly());

                transit.UsingRabbitMq((context, configurator) =>
                {
                    var configuration = context.GetService<IConfiguration>();
                    var serviceSettings = configuration.GetSection(nameof(ServiceSettings)).Get<ServiceSettings>();
                    var rabbitMQSettings = configuration.GetSection(nameof(RabbitMQSettings)).Get<RabbitMQSettings>();
                    configurator.Host(rabbitMQSettings.Host);

                    configurator.ConfigureEndpoints(context, new KebabCaseEndpointNameFormatter(serviceSettings.ServiceName, false));
                });
            });
            return services;
        }

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
    }
}