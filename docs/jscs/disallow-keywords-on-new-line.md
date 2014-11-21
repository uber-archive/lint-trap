# disallowKeywordsOnNewLine

    "disallowKeywordsOnNewLine": [
        "else"
    ]

Since the `requireBlocksOnNewline` rule is already enforced,
allowing `else` to occur on a newline would reduce
readability. Our if statements should be consistent.

Favour:

    if (foo) {
        x
    } else {
        y
    }

Do not use:

    if (foo) {
        x
    }
    else {
        y
    }
