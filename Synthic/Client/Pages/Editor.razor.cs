﻿using System.Net;
using Blazor.Cropper;
using FFmpegBlazor;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using Microsoft.JSInterop.Implementation;
using MimeTypes;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats;
using SixLabors.ImageSharp.Processing;
using SixLabors.ImageSharp.Processing.Processors;
using SixLabors.ImageSharp.Processing.Processors.Drawing;
using Synthic.Client.Helpers;
using Synthic.Client.Services;

namespace Synthic.Client.Pages;

public partial class Editor
{
    [Inject]
    public EditorInstance editor { get; set; }

    [Inject]
    public IYouTubeDownloadApi? YoutubeDownloadApi { get; set; }

    [Inject]
    public JSCommunicator JsCommunicator { get; set; }

    [Inject]
    public IJSRuntime JsRuntime { get; set; }
    
    protected override async Task OnInitializedAsync()
    {
        // Wait 1 second, just to make sure SharedArrayBuffer is setup
        await Task.Delay(1000);
        
        await FFmpegFactory.Init(JsRuntime, "https://unpkg.com/@ffmpeg/ffmpeg@0.12.1/dist/umd/ffmpeg.js");
        
        Globals.ffmpeg = FFmpegFactory.CreateFFmpeg();
        
        await Globals.ffmpeg.Load(); // Download all dependencies
    }

    private async Task LoadVideo(string url)
    {
        await editor.ProcessVideo(YoutubeDownloadApi, VideoUrl, JsCommunicator);

        var validExtensions = new[] { ".jpeg", ".jpg", ".png", ".bmp", ".tga" };
        var thumbnail = 
            editor.VideoMetadata.Thumbnails
                .OrderBy(x => x.Resolution.Area)
                .Last(x => validExtensions.Any(c => x.Url.Contains(c)));
        var imageData = await YoutubeDownloadApi.GetBytesFromUrl(thumbnail.Url);

        editor.Album.CoverArt = new Art()
        {
            FileName = thumbnail.Url?.Split("/")?.LastOrDefault(),
            ContentType = MimeTypeMap.GetMimeType(Path.GetExtension(thumbnail.Url))
        };
        
        await editor.Album.CoverArt.SetContentAsync(imageData);
        
        await JsCommunicator.Eval($"currentSongArt.style.setProperty('background', \"url('{thumbnail.Url}') center\")");
        await JsCommunicator.Eval($"currentSongArt.style.setProperty('background-size', 'cover')");
    }

    public async Task NextTrack()
    {
        double timestamp = await JsCommunicator.Get<double>("PlayerState.Timestamp");
        Track nextTrack = editor.Album.Tracks.First(x => x.Timestamp > timestamp);
        await JsCommunicator.Eval($"seek({nextTrack.Timestamp})");
    }

    public async Task LastTrack()
    {
        double timestamp = await JsCommunicator.Get<double>("PlayerState.Timestamp");
        Track lastTrack = editor.Album.Tracks.Last(x => x.Timestamp <= timestamp - 3);
        await JsCommunicator.Eval($"seek({lastTrack.Timestamp})");
    }
}