using Microsoft.AspNetCore.Components;

namespace Synthicly.Shared;

public partial class ExportPage
{
    [Inject]
    public EditorInstance Editor { get; set; }
}