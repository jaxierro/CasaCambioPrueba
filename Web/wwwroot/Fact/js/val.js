﻿function SoloNumero(value)
{
    if (!value.match(/^\d+/)) {
        return 0;
    }
    return 1;
}