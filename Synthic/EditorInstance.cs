using System.Globalization;
using System.Text.RegularExpressions;
using AngleSharp.Common;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using Synthic.Extensions;
using Synthic.Helpers;
using Synthic.Services;
using YoutubeExplode.Videos;
using YoutubeExplode.Videos.Streams;

namespace Synthic;

public class EditorInstance
{
    public Guid Guid { get; set; } = Guid.NewGuid();

    #region Injected Properties
    
    [Inject]
    public IYouTubeDownloadApi YouTubeDownloadApi { get; set; }

    public JSCommunicator JsCommunicator { get; set; }
    
    #endregion
    
    #region Editor Properties

    public string VideoUrl { get; set; }

    public Video? VideoMetadata;
    private IEnumerable<AudioOnlyStreamInfo> AudioOnlyStreams = Enumerable.Empty<AudioOnlyStreamInfo>();
    private bool ExtractOpus = true; // TODO: Hook this property up to the frontend
    
    public Album Album { get; set; } = new();

    #endregion

    public async Task ProcessVideo(IYouTubeDownloadApi YoutubeDownloadApi, string videoUrl, JSCommunicator jsCommunicator)
    {
        JsCommunicator = jsCommunicator;
        VideoUrl = videoUrl;

        var videoMetadataTask = YoutubeDownloadApi.GetVideoMetaDataAsync(VideoUrl);
        var audioOnlyStreamInfoTask = YoutubeDownloadApi.GetAudioOnlyStreamsAsync(VideoUrl);

        await Task.WhenAll(videoMetadataTask, audioOnlyStreamInfoTask);
        
        VideoMetadata = await videoMetadataTask;
        AudioOnlyStreams = await audioOnlyStreamInfoTask;

        Album.Metadata.Title = NameHelper.GetName(VideoMetadata.Title);
        Album.Metadata.Artist = NameHelper.GetArtist(VideoMetadata.Title, VideoMetadata.Author.ChannelTitle);
        Album.Metadata.Year = (uint)VideoMetadata.UploadDate.Year;
    }

    public async Task PrepareEditor(string? customTimestamp = null)
    {
        customTimestamp ??= VideoMetadata.Description;
        Album.Tracks = GenerateTracksFromChapters(customTimestamp);
        
        if(Album.Tracks.Count == 0)
            Album.Tracks.Add(new Track(VideoMetadata.Title, VideoMetadata.Author.ChannelTitle, TimeSpan.Zero));
        
        for (int i = 0; i < Album.Tracks.Count; i++)
            Album.Tracks[i].Metadata.Track = (ushort)(i + 1);
        
        
        for (int i = 0; i < Album.Tracks.Count - 1; ++i)
        {
            var track = Album.Tracks[i];
            var nextTrack = Album.Tracks[i + 1];

            track.End = nextTrack.Start;
        }

        if(Album.Tracks.Count > 0)
            Album.Tracks.Last().End = VideoMetadata.Duration.Value;
    }

    public bool DeleteTrack(string uuid) =>
        DeleteTrack(Album.Tracks.FirstOrDefault(x => x.UUID.ToString() == uuid));
    
    public bool DeleteTrack(Track track)
    {
        // We need at least 1 track
        if (Album.Tracks.Count == 1)
            return false;
        
        bool isFirst = Album.Tracks.First() == track;
        int index = Album.Tracks.IndexOf(track);

        if (isFirst)
            Album.Tracks[index + 1].Start = TimeSpan.Zero;
        else
            Album.Tracks[index - 1].End = track.End;

        Album.Tracks.Remove(track);
        
        PushChangesToUI();

        return true;
    }

    public async Task PushChangesToUI()
    {
        await JsCommunicator.Set("Album", Album);
        await JsCommunicator.Eval($"buildChapters({SelectorMode.ToString().ToLower()})");
    }

    private List<Track> GenerateTracksFromChapters(string data)
    {
        Regex timestampRegex = new Regex("(?:([0-5]?[0-9]):)?([0-5]?[0-9]):([0-5][0-9])");

        var tracks = new List<Track>();

        foreach (var line in data.Split("\n"))
        {
            var match = timestampRegex.Match(line);
            if (match.Success)
            {
                string value = match.Value;
                if (match.Value.Split(":").Length == 2)
                    value = "00:" + match.Value;
                if (match.Value.Split(":")[0].Length == 1)
                    value = "0" + value;
                string finalValue = line.Replace(match.Value, "").Trim(new []{'|', '-', ' ', '•'});
                tracks.Add(
                    new Track(
                        NameHelper.GetName(finalValue),
                        NameHelper.GetArtist(finalValue, Album.Artist),
                        TimeSpan.ParseExact(value, @"hh\:mm\:ss", CultureInfo.InvariantCulture, TimeSpanStyles.None)
                    )
                );
            }
        }
        
        return tracks;
    }
    
    public bool SelectorMode { get; private set; }

    public bool ToggleSelector()
    {
        SelectorMode = !SelectorMode;

        if (SelectorMode)
            JsCommunicator.Eval("document.querySelectorAll('.chapter').forEach(x => x.classList.add('selectable'));");
        else
            JsCommunicator.Eval("document.querySelectorAll('.chapter').forEach(x => x.classList.remove('selectable'));");
        
        return SelectorMode;
    }
}