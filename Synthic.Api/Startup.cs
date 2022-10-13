using System.IO;
using System.Net.Http;
using Microsoft.ApplicationInsights.Extensibility;
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using Serilog;
using Synthic.Api;
using Synthic.Api.HttpClientHandlers;
using YoutubeExplode;

namespace Synthic.Api;

public class Startup
{
    public void ConfigureServices(IServiceCollection services)
    {
        var config = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("local.settings.json", true, false)
            .AddEnvironmentVariables()
            .Build();
        
        // Register Serilog provider
        var logger = new LoggerConfiguration()
            .Enrich.FromLogContext()
            .WriteTo.Console()
            .WriteTo.ApplicationInsights(TelemetryConfiguration.CreateDefault(), TelemetryConverter.Traces)
            .ReadFrom.Configuration(config)
            .CreateLogger();
        
        services.AddLogging(lb => lb.AddSerilog(logger, dispose: true));

        services.AddScoped(sp =>
        {
            var httpClient = new HttpClient(new YouTubeCookieConsentHandler());
            return new YoutubeClient(httpClient);
        });
        
        // builder.Services.AddScoped<YoutubeClient>();
        services.AddHttpClient();
        
        services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo { Title = "Gateway", Version = "v1" });
        });
        services.AddCors();
        services.AddControllers();
    }
    
    public void Configure(IApplicationBuilder app)
    {
        app.UseSwagger();
        app.UseSwaggerUI();
        
        app.UseRouting();

        app.UseCors(x =>
        {
            x.AllowAnyOrigin();
            x.AllowAnyHeader();
            x.AllowAnyMethod();
        });
        
        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });
    }
}