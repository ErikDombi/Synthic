namespace Synthicly.Helpers;

public class ExportProgress
{
    public int TotalItems { get; set; } = 0;
    public int CurrentItem { get; set; } = 0;
    public string CurrentItemName { get; set; } = string.Empty;
    public int TotalSubItems { get; set; } = 0;
    public int CurrentSubItem { get; set; } = 0;
    public string CurrentSubItemName { get; set; } = string.Empty;

    public int IncrementItem(int amount = 1, int? totalSubItems = null, string? newItemName = null)
    {
        CurrentItem += amount;
        CurrentSubItem = 0;

        if (totalSubItems.HasValue)
            TotalSubItems = totalSubItems.Value;

        if (newItemName is not null)
            CurrentItemName = newItemName;
        
        return CurrentItem;
    } 

    public int IncrementSubItem(int amount = 1) => CurrentSubItem += amount;

    public void Reset()
    {
        TotalItems = 0;
        CurrentItem = 0;
        TotalSubItems = 0;
        CurrentSubItem = 0;
    }

    public void SetTotals(int items, int subItems)
    {
        TotalItems = items;
        TotalSubItems = subItems;
    }

    public void SetItem(int current, int? total = null, string? name = null)
    {
        CurrentItem = current;

        if (total.HasValue)
            TotalItems = total.Value;
        
        if(name is not null)
            CurrentItemName = name;
    }
    
    public void SetSubItem(int current, int? total = null, string? name = null)
    {
        CurrentSubItem = current;

        if (total.HasValue)
            TotalSubItems = total.Value;
        
        if(name is not null)
            CurrentSubItemName = name;
    }

    public int ItemPercent => TotalItems > 0 ? (int)(CurrentItem / (double)TotalItems * 100) : 0;
    public int SubItemPercent => TotalSubItems > 0 ? (int)(CurrentSubItem / (double)TotalSubItems * 100) : 0;

    public bool SubItemVisible => TotalSubItems > 0;
}