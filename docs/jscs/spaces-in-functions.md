# Spaces in function expressions and function declarations

    "disallowSpacesInFunctionDeclaration": {
        "beforeOpeningRoundBrace": true
    },
    "disallowSpacesInNamedFunctionExpression": {
        "beforeOpeningRoundBrace": true
    },
    "requireSpacesInFunctionDeclaration": {
        "beforeOpeningCurlyBrace": true
    },
    "requireSpacesInNamedFunctionExpression": {
        "beforeOpeningCurlyBrace": true
    },

Together with the eslint rule `func-names`, the above rules
make sure that every single function (declaration or
expression) is named and that there is a space between the
`function` keyword and your function name, no space between
your function name and the opening parenthesis and that
there is always a space between the closing arguments
parenthesis and the opening function body curly bracket.
