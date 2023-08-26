namespace Synthic.Client.Helpers;

public class MetadataSanitizer
{
    protected MetadataSanitizer() {}

    protected T? GetField<T>(T field) where T : class
    {
        if (field is string fieldStr && string.IsNullOrWhiteSpace(fieldStr))
            return null;
        return field;
    }
}