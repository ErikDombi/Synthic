using Blazorise;
using Blazorise.Bootstrap;
using Blazorise.Icons.FontAwesome;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using RestEase;
using Synthic.Client;
using Synthic.Client.Helpers;
using Synthic.Client.Services;

var builder = WebAssemblyHostBuilder.CreateDefault(args);

Globals.BaseUrl = builder.HostEnvironment.BaseAddress;

builder.Services
    .AddBlazorise( options =>
    {
        options.Immediate = true;
    } )
    .AddBootstrapProviders()
    .AddFontAwesomeIcons();
builder.Services.AddFontAwesomeIcons();
builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
builder.Services.AddScoped(sp => new RestClient(sp.GetRequiredService<HttpClient>()).For<IYouTubeDownloadApi>());
builder.Services.AddBlazorDownloadFile();
builder.Services.AddScoped<JSCommunicator>();
builder.Services.AddScoped<EditorInstance>();

builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

await builder.Build().RunAsync();