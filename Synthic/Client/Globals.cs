using FFmpegBlazor;

namespace Synthic.Client;

public class Globals
{
    public static FFMPEG ffmpeg;
    
    public delegate void AlbumArtRefreshEvent();
    
    public static event AlbumArtRefreshEvent OnAlbumArtChanged;

    public static string BaseUrl { get; set; }

    public static void ArtHasChanged() => OnAlbumArtChanged?.Invoke();
}