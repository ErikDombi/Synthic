using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using RestEase;
using YoutubeExplode.Videos;
using YoutubeExplode.Videos.Streams;

namespace Synthic.Client.Services;

[BasePath("api")]
public interface IYouTubeDownloadApi
{
    [Get("GetVideoMetaData")]
    public Task<Video> GetVideoMetaDataAsync([Query] string youTubeUrl);

    [Get("GetAudioOnlyStreams")]
    public Task<IEnumerable<AudioOnlyStreamInfo>> GetAudioOnlyStreamsAsync([Query] string youTubeUrl);

    [Post("GetAudioStream")]
    public Task<Stream> GetAudioStreamAsync([Body] AudioOnlyStreamInfo streamInfo);

    [Post("GetOggOpusAudioStream")]
    public Task<Stream> GetOggOpusAudioStreamAsync([Body] AudioOnlyStreamInfo streamInfo);

    [Post("GetAudioBytes")]
    public Task<byte[]> GetAudioBytesAsync([Body] AudioOnlyStreamInfo streamInfo);

    [Get("GetBytesFromUrl")]
    public Task<byte[]> GetBytesFromUrl([Query] string url);

    [Post("CropImage")]
    public Task<byte[]> CropImage([Body] byte[] image);
}