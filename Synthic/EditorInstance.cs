﻿using System.Globalization;
using System.Text.RegularExpressions;
using AngleSharp.Common;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using Synthic.Helpers;
using Synthic.Services;
using YoutubeExplode.Videos;
using YoutubeExplode.Videos.Streams;

namespace Synthic;

public class EditorInstance
{
    public Guid Guid { get; set; } = Guid.NewGuid();

    #region Injected Properties
    
    //[Inject]
    //public IYouTubeDownloadApi? YoutubeDownloadApi { get; set; }

    [Inject]
    public IJSRuntime JsRuntime { get; set; }
    
    #endregion
    
    #region Editor Properties

    public string VideoUrl { get; set; }

    public Video? VideoMetadata;
    private IEnumerable<AudioOnlyStreamInfo> AudioOnlyStreams = Enumerable.Empty<AudioOnlyStreamInfo>();

    public Album Album { get; set; } = new Album();

    #endregion

    public async Task ProcessVideo(IYouTubeDownloadApi YoutubeDownloadApi)
    {
        VideoUrl = "https://youtube.com/watch?v=88NmmgMBnH4";

        var videoMetadataTask = YoutubeDownloadApi.GetVideoMetaDataAsync(VideoUrl);
        var audioOnlyStreamInfoTask = YoutubeDownloadApi.GetAudioOnlyStreamsAsync(VideoUrl);

        await Task.WhenAll(videoMetadataTask, audioOnlyStreamInfoTask);
        
        VideoMetadata = await videoMetadataTask;
        AudioOnlyStreams = await audioOnlyStreamInfoTask;

        Album.Name = NameHelper.GetName(VideoMetadata.Title);
        Album.Artist = NameHelper.GetArtist(VideoMetadata.Title, VideoMetadata.Author.ChannelTitle);
        Album.Tracks = GenerateTracksFromChapter(VideoMetadata.Description);
    }

    private List<Track> GenerateTracksFromChapter(string data)
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
                tracks.Add(new Track()
                {
                    Name = NameHelper.GetName(finalValue),
                    Artist = NameHelper.GetArtist(finalValue, Album.Artist),
                    Timestamp = TimeSpan.ParseExact(value, @"hh\:mm\:ss", CultureInfo.InvariantCulture, TimeSpanStyles.None).TotalSeconds,
                });
            }
        }

        return tracks;
    }
}