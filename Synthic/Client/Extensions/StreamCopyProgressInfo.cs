﻿namespace Synthic.Client.Extensions;

public struct StreamCopyProgressInfo
{
    public long BytesRead { get; set; }

    public long TotalBytesRead { get; set; }

    public long SourceLength { get; set; }
}