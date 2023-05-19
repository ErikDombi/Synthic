﻿using FFmpegBlazor;

namespace Synthic;

public class Globals
{
    public static FFMPEG ffmpeg;
    
    public delegate void AlbumArtRefreshEvent();
    
    public static event AlbumArtRefreshEvent OnAlbumArtChanged;

    public static void ArtHasChanged() => OnAlbumArtChanged?.Invoke();
}