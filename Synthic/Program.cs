using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using RestEase;
using Synthic;
using Synthic.Helpers;
using Synthic.Services;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

// HttpClient
var baseAddress = "http://localhost:5059";

builder.Services
    // Own services 
    .AddScoped(sp =>
    {
        var httpClient = new HttpClient
        {
            BaseAddress = new Uri(baseAddress)
        };
        return new RestClient(httpClient).For<IYouTubeDownloadApi>();
    });

builder.Services.AddScoped<JSCommunicator>();
builder.Services.AddScoped<EditorInstance>();
builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });

await builder.Build().RunAsync();