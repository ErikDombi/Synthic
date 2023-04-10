using System.IO;
using System.Threading.Tasks;

namespace Synthic.Api.Extensions
{
    public interface ISerializer
    {
        string Serialize(object value);

        ValueTask<T?> DeserializeAsync<T>(Stream stream) where T : class;        
    }
}