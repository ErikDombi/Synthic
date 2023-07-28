using Microsoft.JSInterop;
using Newtonsoft.Json;

namespace Synthicly.Helpers;

public class JSCommunicator
{
    private IJSRuntime JSRuntime;
    
    public JSCommunicator(IJSRuntime runtime)
    {
        JSRuntime = runtime;
    }
    
    public async Task Eval(string Code) => await JSRuntime.InvokeVoidAsync("window.Eval", Code);
    public async Task<T> Eval<T>(string Code) => await JSRuntime.InvokeAsync<T>("window.Eval", Code);

    public async Task<T> Get<T>(string Property) => await Eval<T>(Property);

    public async Task Set<T>(string Property, T Value)
    {
        if (Value is string)
            _ = await Eval<T>($"{Property} = \"{Value}\"");
        else
            _ = await Eval<T>($"{Property} = JSON.parse(\"{JsonConvert.SerializeObject(Value).Replace("\"", "\\\"")}\")");
    }
}