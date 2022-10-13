using Microsoft.AspNetCore.Components;

namespace Synthic.Shared;

public partial class ExportPage
{
    [Inject]
    public EditorInstance Editor { get; set; }
}