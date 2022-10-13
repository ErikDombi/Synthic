using System.Text.Json;
using Synthic.Api.Models;

namespace Synthic.Api.Functions;

using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Matroska.Muxer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using YoutubeExplode;
using YoutubeExplode.Videos.Streams;

[Route("api")]
public class ApiFunctions : Controller
{
    private readonly ILogger<ApiFunctions> _logger;
    private readonly YoutubeClient _client;
    private readonly IHttpClientFactory _factory;

    public ApiFunctions(ILogger<ApiFunctions> logger, YoutubeClient client, IHttpClientFactory factory)
    {
        _logger = logger;
        _client = client;
        _factory = factory;
    }

    [Route("GetVideoMetaData")]
    [HttpGet]
    public async Task<IActionResult> GetVideoMetaDataAsync(string youTubeUrl)
    {
        _logger.LogInformation("HttpTrigger - GetVideoMetaDataAsync");

        var videoMetaData = await _client.Videos.GetAsync(youTubeUrl);

        return new SystemTextJsonResult(videoMetaData);
    }

    [Route("GetAudioOnlyStreams")]
    [HttpGet]
    public async Task<IActionResult> GetAudioOnlyStreamsAsync(string youTubeUrl)
    {
        _logger.LogInformation("HttpTrigger - GetAudioOnlyStreamsAsync");

        //var manifest = await _client.Videos.Streams.GetManifestAndFixStreamUrlsAsync(url);
        var manifest = await _client.Videos.Streams.GetManifestAsync(youTubeUrl);

        var audioStreams = manifest.GetAudioOnlyStreams().OrderBy(a => a.Bitrate);

        return new SystemTextJsonResult(audioStreams);
    }

    [Route("GetAudioStream")]
    [HttpGet]
    public async Task<Stream> GetAudioStreamAsync([HttpTrigger(AuthorizationLevel.Function, "post")] HttpRequest req)
    {
        _logger.LogInformation("HttpTrigger - GetAudioStreamAsync");

        var streamInfo = await JsonSerializer.DeserializeAsync<AudioOnlyStreamInfo>(req.Body);

        return await _client.Videos.Streams.GetAsync(streamInfo);
    }

    [Route("GetOggOpusAudioStream")]
    [HttpGet]
    public async Task<Stream> GetOggOpusAudioStreamAsync([HttpTrigger(AuthorizationLevel.Function, "post")] HttpRequest req)
    {
        _logger.LogInformation("HttpTrigger - GetOggOpusAudioStreamAsync");

        var streamInfo = await JsonSerializer.DeserializeAsync<AudioOnlyStreamInfo>(req.Body);

        var destinationStream = new MemoryStream();

        await _client.Videos.Streams.CopyToAsync(streamInfo, destinationStream);

        destinationStream.Position = 0;

        var oggOpusStream = new MemoryStream();
        MatroskaDemuxer.ExtractOggOpusAudio(destinationStream, oggOpusStream);

        oggOpusStream.Position = 0;
        return oggOpusStream;
    }

    [Route("GetAudioBytes")]
    [HttpGet]
    public async Task<byte[]> GetAudioBytesAsync([HttpTrigger(AuthorizationLevel.Function, "post")] HttpRequest req)
    {
        _logger.LogInformation("HttpTrigger - GetAudioBytesAsync");

        var streamInfo = await JsonSerializer.DeserializeAsync<AudioOnlyStreamInfo>(req.Body);

        await using var destinationStream = new MemoryStream();

        await _client.Videos.Streams.CopyToAsync(streamInfo, destinationStream);

        return destinationStream.ToArray();
    }
}