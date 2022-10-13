namespace Synthic.Helpers;

public class NameHelper
{
    public static string GetName(string title) => title.Contains(" - ") ? string.Join("", title.Split(" - ").Skip(1)) : title;
    public static string GetArtist(string title) => title.Contains(" - ") ? title.Split(" - ")[0] : title;
    public static string GetArtist(string title, string artist) => title.Contains(" - ") ? title.Split(" - ")[0] : artist;
}