# validateQuoteMarks

    "validateQuoteMarks": {
        "mark": "'",
        "escape": true
    }

We should have consistent quote marks. Mixing the two causes overhead and
confusion. All strings should use single quotes, however double quotes are
allowed only in cases where the string contains single quotes and the developer
would like to avoid having to escape them. The goal is consistency with an
exception made for readability. 
