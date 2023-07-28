namespace Synthicly.Helpers;

public class Metadata
{
    public string? Title { get; set; }
    public string? Artist { get; set; }
    public string? Composer { get; set; }
    public uint? Year { get; set; }
    public ushort? Track { get; set; }
    public string? Genre { get; set; }

    public Dictionary<string, string> CustomMetadata { get; set; } = new();
}