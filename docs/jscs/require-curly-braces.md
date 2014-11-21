# requireCurlyBraces

    "requireCurlyBraces": [
        "if",
        "else",
        "for",
        "while",
        "do",
        "try",
        "catch",
        "default"
    ]

Requiring curly braces makes explicit what code is being
handled by the special keywords above, removing any
potential ambiguities. Furthermore, requiring curly braces
eliminates a common source of errors where code is
inadvertedly included or excluded from code block due to
indentation/formatting errors. We should encourage using
curly braces as it avoids the multiple statements bug and
also discourages long terse lines
