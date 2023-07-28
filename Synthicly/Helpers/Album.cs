namespace Synthicly.Helpers;

public class Album
{
    public string Name => Metadata.Title;
    
    public string FileFriendlyName
    {
        get
        {
            var fileName = Metadata.Artist + " - " + Metadata.Title;
            foreach (var c in Path.GetInvalidFileNameChars()) 
                fileName = fileName.Replace(c, '-');
            return fileName;
        }
    }

    public Guid UUID = Guid.NewGuid();
    public string Artist => Metadata.Artist;
    public uint Year;
    
    public Art? CoverArt { get; set; } = null;
    
    public Metadata Metadata { get; private set; } = new();
    
    public List<Track> Tracks = new();
    public int NumTracks => Tracks.Count;

    public double DurationInSeconds => Tracks.Last().End.TotalSeconds;

    public TimeSpan Duration => Tracks.Last().End;
    
    public Dictionary<string, string> BuildMetadata() =>
        new[]
            {
                new Dictionary<string, string>
                {
                    { "Name", Metadata.Title },
                    { "Artist", Metadata.Artist },
                    { "Composer", Metadata.Composer },
                    { "Genre", Metadata.Genre },
                    { "Year", Metadata.Year.ToString() }
                },
                Metadata.CustomMetadata
            }
            .SelectMany(x => x)
            .Where(x => !string.IsNullOrEmpty(x.Key) && !string.IsNullOrEmpty(x.Value))
            .ToDictionary(x => x.Key, y => y.Value);
}