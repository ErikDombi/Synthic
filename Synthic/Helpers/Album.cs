namespace Synthic.Helpers;

public class Album
{
    public string Name;
    public string Artist;
    public uint Year;
    public List<Track> Tracks = new();
    public int NumTracks => Tracks.Count;
}