using System.Collections.Immutable;
using Microsoft.AspNetCore.Components.Forms;

namespace Synthic.Helpers;

public class Track : MetadataSanitizer
{
    public string Name { get; set; }

    public string FileFriendlyName
    {
        get
        {
            var fileName = Metadata.Track + ". " + Metadata.Artist + " - " + Metadata.Title;
            foreach (var c in Path.GetInvalidFileNameChars()) 
                fileName = fileName.Replace(c, '-');
            return fileName;
        }
    }

    public Guid UUID = Guid.NewGuid();
    public string Artist { get; set; }
    public double Timestamp => Start.TotalSeconds;
    public Metadata Metadata { get; private set; } = new();
    public TimeSpan Start;
    public TimeSpan Duration => End.Subtract(Start);
    public TimeSpan End;

    public double StartInSeconds => Start.TotalSeconds;
    public double DurationInSeconds => Duration.TotalSeconds;
    public double EndInSeconds => End.TotalSeconds;

    public Art? CoverArt { get; set; } = null;

    public Track(string name, string artist, TimeSpan timestamp)
    {
        Name = name;
        Artist = artist;
        
        Start = timestamp;
        
        Metadata.Title = name;
        Metadata.Artist = artist;
    }

    public Dictionary<string, string> BuildMetadata(Album album) =>
        new[]
            {
                new Dictionary<string, string>
                {
                    { "title", Metadata.Title },
                    { "artist", GetField(Metadata.Artist) ?? GetField(album.Metadata.Artist) },
                    { "composer", GetField(Metadata.Composer) ?? GetField(album.Metadata.Composer) },
                    { "genre", GetField(Metadata.Genre) ?? GetField(album.Metadata.Genre) },
                    { "year", GetField(Metadata.Year.ToString()) ?? GetField(album.Metadata.Year?.ToString()) },
                    { "track", GetField(Metadata.Track?.ToString()) },
                    { "album", album.Name },
                    { "album_artist", album.Artist }
                },
                Metadata.CustomMetadata
            }
            .SelectMany(x => x)
            .Where(x => !string.IsNullOrWhiteSpace(x.Key) && !string.IsNullOrWhiteSpace(x.Value))
            .ToDictionary(x => x.Key, y => y.Value);
}