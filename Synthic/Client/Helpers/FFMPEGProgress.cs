using System.Text.RegularExpressions;
using FFmpegBlazor;

namespace Synthic.Client.Helpers;

public class FFMPEGProgress
{
    public int Frame { get; set; }
    public decimal Fps { get; set; }
    public decimal Q { get; set; }
    public int LSize { get; set; }
    public TimeSpan Time { get; set; }
    public TimeSpan? Duration => CurrentItem?.Duration;
    public double Percent => Duration.HasValue ? Time / Duration.Value * 100 : 0;
    public decimal Bitrate { get; set; }
    public decimal Speed { get; set; }
    
    private Track? CurrentItem { get; set; }

    private FFMPEGProgress(Track? currentItem)
    {
        CurrentItem = currentItem;
    }
    
    public static FFMPEGProgress ParseFFMpegOutput(Logs log, Track? currentItem)
    {        
        FFMPEGProgress output = new FFMPEGProgress(currentItem);

        Match frameMatch = Regex.Match(log.Message, @"frame=\s*(\d+)");
        if (frameMatch.Success)
        {
            output.Frame = int.Parse(frameMatch.Groups[1].Value);
        }

        Match fpsMatch = Regex.Match(log.Message, @"fps=\s*([\d\.]+)");
        if (fpsMatch.Success)
        {
            output.Fps = decimal.Parse(fpsMatch.Groups[1].Value);
        }

        Match qMatch = Regex.Match(log.Message, @"q=\s*([\d\.-]+)");
        if (qMatch.Success)
        {
            output.Q = decimal.Parse(qMatch.Groups[1].Value);
        }

        Match lSizeMatch = Regex.Match(log.Message, @"Lsize=\s*(\d+)");
        if (lSizeMatch.Success)
        {
            output.LSize = int.Parse(lSizeMatch.Groups[1].Value);
        }

        Match timeMatch = Regex.Match(log.Message, @"time=\s*([\d\:]+.\d+)");
        if (timeMatch.Success)
        {
            output.Time = TimeSpan.ParseExact(timeMatch.Groups[1].Value, @"hh\:mm\:ss\.ff", null);
        }

        Match bitrateMatch = Regex.Match(log.Message, @"bitrate=\s*([\d\.]+)");
        if (bitrateMatch.Success)
        {
            output.Bitrate = decimal.Parse(bitrateMatch.Groups[1].Value);
        }

        Match speedMatch = Regex.Match(log.Message, @"speed=\s*([\d\.]+)");
        if (speedMatch.Success)
        {
            output.Speed = decimal.Parse(speedMatch.Groups[1].Value);
        }

        return output;
    }
}