using Common.Settings;
using Common.MongoDB;
using Common.MassTransit;
using Common.JwtManager;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Users.Catalog.Service.Entities;
using Users.Service.src.Consumers;
using System;

namespace Users.Catalog.Service
{
    public class Startup
    {
        private ServiceSettings serviceSettings;
        private ServiceSettings tokenSettings;
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {


            serviceSettings = Configuration.GetSection(nameof(ServiceSettings)).Get<ServiceSettings>();
            tokenSettings = Configuration.GetSection(nameof(ServiceSettings)).Get<ServiceSettings>();
            services.AddMongo()
                    .AddMongoRepository<User>("users.catalog.service9")
                    .AddMongoRepository<Friend>("friend.catalog.service");
            services.AddMassTransitWithRabbitMq();
            services.AddAuthWithJwtBearer();

            services.AddSingleton<AppointmentsConsumer>();

            services.AddControllers(options =>
            {
                options.SuppressAsyncSuffixInActionNames = false;
            });
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Users.Catalog.Service", Version = "v1" });
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Users.Catalog.Service v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseCors(builder =>
                {
                    builder.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader();
                });

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}