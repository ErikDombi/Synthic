using RestEase;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats;
using Synthic.Services;

namespace Synthic.Extensions;

public static class ImageCropExtension
{
    public static async Task<byte[]> FastCropImage(this byte[] image)
    {
        var restClient = new RestClient(new HttpClient() { BaseAddress = new Uri("http://localhost:5059") })
            .For<IYouTubeDownloadApi>();

        return await restClient.FastCropImage(image);
    }

    public static async Task<byte[]> FastCropImage(this MemoryStream image) =>
        await image.ToArray().FastCropImage();

    public static async Task<byte[]> FastCropImage(this IYouTubeDownloadApi api, byte[] image)
    {
        try
        {
            var img = Image.Load(image, out IImageFormat format);
            if (img.Width == img.Height)
                return image;

            return await api.CropImage(image);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
        }

        return null;
    }

    public static async Task<byte[]> FastCropImage(this IYouTubeDownloadApi api, MemoryStream image) =>
        await api.FastCropImage(image.ToArray());
}