using BlazorDownloadFile;
using Blazorise;
using Blazorise.Bootstrap;
using Blazorise.Icons.FontAwesome;
using Microsoft.Extensions.Logging;
using RestEase;
using Synthic.Services;
using Synthicly.Helpers;

namespace Synthicly;

public static class MauiProgram
{
    public static MauiApp CreateMauiApp()
    {
        var builder = MauiApp.CreateBuilder();
        builder
            .UseMauiApp<App>()
            .ConfigureFonts(fonts => { fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular"); });

        builder.Services.AddMauiBlazorWebView();

#if DEBUG
        builder.Services.AddBlazorWebViewDeveloperTools();
        builder.Logging.AddDebug();
#endif
        
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

        builder.Services.AddBlazorDownloadFile();
        builder.Services.AddScoped<JSCommunicator>();
        builder.Services.AddBlazorise();
        builder.Services.AddBootstrapProviders();
        builder.Services.AddFontAwesomeIcons();
        builder.Services.AddScoped<EditorInstance>();

        return builder.Build();
    }
}