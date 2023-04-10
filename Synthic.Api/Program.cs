using Microsoft.AspNetCore;

namespace Synthic.Api;

public class Program
{
    public static void Main(string[] args) =>
        CreateWebHostBuilder(args)
            .Build()
            .Run();

    public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
        WebHost.CreateDefaultBuilder(args)
            .UseUrls("http://localhost:5059")
            .UseStartup<Startup>();
}