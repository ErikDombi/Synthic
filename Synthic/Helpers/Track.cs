using System.Collections.Immutable;

namespace Synthic.Helpers;

public class Track
{
    public string Name { get; set; }
    public string Artist { get; set; }
    public double Timestamp { get; set; }
    public Metadata Metadata { get; private set; } = new();

    public Track(string Name, string Artist, double Timestamp)
    {
        this.Name = Name;
        this.Artist = Artist;
        this.Timestamp = Timestamp;
        Metadata.Title = Name;
        Metadata.Artist = Artist;
    }

    public Dictionary<string, string> BuildMetadata(Album album) =>
        new[]
            {
                new Dictionary<string, string>
                {
                    { "Title", Metadata.Title },
                    { "Artist", Metadata.Artist },
                    { "Composer", Metadata.Composer },
                    { "Genre", Metadata.Genre },
                    { "Year", Metadata.Year.ToString() },
                    { "Track", Metadata.Track.ToString() }
                },
                Metadata.CustomMetadata
            }
            .SelectMany(x => x)
            .ToDictionary(x => x.Key, y => y.Value);
}