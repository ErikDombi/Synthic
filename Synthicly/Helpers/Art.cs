using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats;
using SixLabors.ImageSharp.Processing;
using Synthicly.Extensions;

namespace Synthicly.Helpers;

public class Art
{
    public string FileName { get; set; }
    public byte[] Content { get; private set; }
    public string ContentType { get; set; }

    public async Task SetContentAsync(byte[] imageData) =>
        await SetContentAsync(new MemoryStream(imageData));
    
    public async Task SetContentAsync(MemoryStream imageData)
    {
        // The following code uses server side image processing
        Content = await imageData.FastCropImage();

        Globals.ArtHasChanged();
        
        // The following code uses local image processing.
        /*using var outStream = new MemoryStream();
        using (var image = Image.Load(imageData, out IImageFormat format))
        {
            if (image.Height == image.Width)
            {
                Content = imageData.ToArray();
                _ = imageData.DisposeAsync();
                _ = outStream.DisposeAsync();
                return;
            }
            
            double imgCenterX = image.Width / 2.0d;
            double halfImageHeight = image.Size().Height / 2.0d;
            int x = (int)(imgCenterX - halfImageHeight);
            image.Mutate(img => img.Crop(new Rectangle(x, 0, image.Height, image.Height)));
            await image.SaveAsync(outStream, format);
        }

        Content = outStream.ToArray();
        _ = imageData.DisposeAsync();
        _ = outStream.DisposeAsync();*/
    }
}