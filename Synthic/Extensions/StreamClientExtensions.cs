using ExposedObject;
using Synthic.Extensions.Utils;
using YoutubeExplode.Videos;
using YoutubeExplode.Videos.Streams;

namespace Synthic.Extensions;

public static class StreamClientExtensions
{
    public static async ValueTask<StreamManifest> GetManifestAndFixStreamUrlsAsync(this StreamClient streamClient, VideoId videoId, CancellationToken cancellationToken = default)
    {
        var streamManifest = await streamClient.GetManifestAsync(videoId, cancellationToken);
        var playerSource = await streamClient.DownloadPlayerSourceAsync(videoId, cancellationToken);
        var urlDescrambler = new UrlDescrambler(playerSource);
        foreach (var stream in streamManifest.Streams)
        {
            stream.UpdateUrl(urlDescrambler.Decode(stream.Url));
        }

        return streamManifest;
    }

    private static Task<string> DownloadPlayerSourceAsync(this StreamClient streamClient, VideoId videoId, CancellationToken cancellationToken = default)
    {
        var streamClientExposed = Exposed.From(streamClient);
        HttpClient httpClient = streamClientExposed._httpClient;
        var youtubeControllerExposed = Exposed.From(streamClientExposed._controller);
        var watchPageExposed = Exposed.From(Exposed.From(youtubeControllerExposed.GetVideoWatchPageAsync(videoId, cancellationToken)).Result);
        string playerSourceUrl = watchPageExposed.TryGetPlayerSourceUrl();
        return httpClient.GetStringAsync(playerSourceUrl);
    }
}