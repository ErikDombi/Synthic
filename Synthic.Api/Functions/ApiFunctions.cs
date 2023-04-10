using System.Xml.XPath;
using Newtonsoft.Json;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats;
using SixLabors.ImageSharp.Processing;
using Synthic.Api.Extensions;
using Synthic.Api.Models;
using YoutubeExplode.Videos.Streams;
using JsonSerializer = System.Text.Json.JsonSerializer;

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

[Route("api")]
public class ApiFunctions : Controller
{
    private readonly ILogger<ApiFunctions> _logger;
    private readonly YoutubeClient _client;
    private readonly IHttpClientFactory _factory;
    private readonly ISerializer _serializer;
    
    public ApiFunctions(ILogger<ApiFunctions> logger, YoutubeClient client, IHttpClientFactory factory, ISerializer serializer)
    {
        _logger = logger;
        _client = client;
        _factory = factory;
        _serializer = serializer;
    }

    [Route("GetBytesFromUrl")]
    [HttpGet]
    public async Task<IActionResult> GetBytesFromUrl(string url)
    {
        _logger.LogInformation("HttpTrigger - GetBytesFromUrl");
        
        using var httpClient = new HttpClient();
        return Ok(await httpClient.GetByteArrayAsync(url));
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
    [HttpPost]
    public async Task<Stream> GetAudioStreamAsync()
    {
        _logger.LogInformation("HttpTrigger - GetAudioStreamAsync");
        
        HttpContext.Request.EnableBuffering();
        HttpContext.Request.Body.Seek(0, SeekOrigin.Begin);
        var streamInfo = await _serializer.DeserializeAsync<AudioOnlyStreamInfo>(HttpContext.Request.Body);
        var video = await _client.Videos.Streams.GetAsync(streamInfo);
        return video;
    }

    [Route("GetOggOpusAudioStream")]
    [HttpPost]
    public async Task<Stream> GetOggOpusAudioStreamAsync()
    {
        _logger.LogInformation("HttpTrigger - GetOggOpusAudioStreamAsync");

        HttpContext.Request.EnableBuffering();
        HttpContext.Request.Body.Seek(0, SeekOrigin.Begin);
        var streamInfo = await _serializer.DeserializeAsync<AudioOnlyStreamInfo>(HttpContext.Request.Body);
        
        var destinationStream = new MemoryStream();

        await _client.Videos.Streams.CopyToAsync(streamInfo, destinationStream);

        destinationStream.Position = 0;

        var oggOpusStream = new MemoryStream();

        MatroskaDemuxer.ExtractOggOpusAudio(destinationStream, oggOpusStream);

        oggOpusStream.Position = 0;
        return oggOpusStream;
    }

    [Route("GetAudioBytes")]
    [HttpPost]
    public async Task<byte[]> GetAudioBytesAsync()
    {
        _logger.LogInformation("HttpTrigger - GetAudioBytesAsync");
        
        HttpContext.Request.EnableBuffering();
        HttpContext.Request.Body.Seek(0, SeekOrigin.Begin);
        var streamInfo = await _serializer.DeserializeAsync<AudioOnlyStreamInfo>(HttpContext.Request.Body);

        await using var destinationStream = new MemoryStream();

        await _client.Videos.Streams.CopyToAsync(streamInfo, destinationStream);

        return destinationStream.ToArray();
    }

    [Route("CropImage")]
    [HttpPost]
    public async Task<byte[]> CropImage()
    {
        _logger.LogInformation("HttpTrigger - CropImage");
        
        HttpContext.Request.EnableBuffering();
        HttpContext.Request.Body.Seek(0, SeekOrigin.Begin);
        var imageData = new MemoryStream();
        await HttpContext.Request.Body.CopyToAsync(imageData);
        
        imageData.Seek(0, SeekOrigin.Begin);
        
        using var outStream = new MemoryStream();
        using (var image = Image.Load(imageData, out IImageFormat format))
        {
            if (image.Height == image.Width)
            {
                _ = imageData.DisposeAsync();
                _ = outStream.DisposeAsync();
                return imageData.ToArray();
            }
            
            double w = image.Width;
            double h = image.Height;
            double correctAspectRatio = 16.0 / 9.0d;
            double aspectRatio = w / h;
            if (aspectRatio != correctAspectRatio)
            {
                _logger.LogInformation("Aspect Ratio incorrect. Fixing...");

                if (aspectRatio < correctAspectRatio)
                    h = w * 9.0d / 16.0d;
                else if (aspectRatio > correctAspectRatio)
                    w = h * 16.0d / 9.0d;
                
                image.Mutate(img =>
                {
                    img.Resize(new ResizeOptions()
                    {
                        Position = AnchorPositionMode.Center,
                        Size = new Size((int)w, (int)h - 1),
                        Mode = ResizeMode.Crop
                    });
                });
            }

            double imgCenterX = image.Width / 2.0d;
            double halfImageHeight = image.Size().Height / 2.0d;
            int x = (int)(imgCenterX - halfImageHeight);
            image.Mutate(
                img =>
                {
                    img.Crop(new Rectangle(x, 0, image.Height, image.Height));
                });
            await image.SaveAsync(outStream, format);
        }

        _ = imageData.DisposeAsync();
        _ = outStream.DisposeAsync();
        return outStream.ToArray();
    }
}