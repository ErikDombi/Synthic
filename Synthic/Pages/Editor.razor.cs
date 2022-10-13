using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using Microsoft.JSInterop.Implementation;
using Synthic.Helpers;
using Synthic.Services;

namespace Synthic.Pages;

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
        await editor.ProcessVideo(YoutubeDownloadApi);
        await JsCommunicator.Set("Album", editor.Album);
        await JsCommunicator.Eval($"currentSongArt.style.setProperty('background', \"url('{editor.VideoMetadata.Thumbnails.OrderBy(x => x.Resolution.Area).Last().Url}') center\")");
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