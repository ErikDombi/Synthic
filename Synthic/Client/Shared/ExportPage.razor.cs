using Microsoft.AspNetCore.Components;

namespace Synthic.Client.Shared;

public partial class ExportPage
{
    [Inject]
    public EditorInstance Editor { get; set; }
}