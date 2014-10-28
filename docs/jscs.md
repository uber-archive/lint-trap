# jscs guidelines.

## Status quo.

    "validateIndentation": 4

While the default value is 4, this rule is dynamically generated based on the
indentation style already used in a project.

**We may want to re-evaluate** this in the near future. Raynos recommends that
we change to 8 spaces. 8 spaces forces you to allocated and abuse closures
willy nilly. It also forces you to break nested functions out into function
declarations.

Making it harder to write messy code raises the average code quality. Making it
harder to write closures removes memory leaks from real production code.


    "maximumLineLength": {
        "value": 80
    }

We should have a line limit for consistency. Long lines make code harder to
read and are usually indicative of poor quality code. Also, since 80-character
lines has been a common standard across many languages for so long, many
developers have optimized their development workflow to use 80-character code
editor windows and panes. It's incredibly useful for being able to view
multiple buffers side by side in either your editor or terminal. Writing code
within 80 characters is not hard. People have been doing it effectively for
decades. Furthermore, research also suggest that the optimum line length for
reading text is between 50 and 60 characters.


    "maximumLineLength": {
        "allowUrlComments": true
    }

Many URLs are longer than 80 characters long. Breaking them across multiple
lines doesn't make sense because they no longer can easily be copied and
pasted. Ideally 

If you have a URL that is longer than 80 characters, you can use a URL
shortener like http://t.uber.com/


    "maximumLineLength": {
        "allowUrlComments": false
    }

Like lines of code, comments are also harder to read and may extend beyond the
edges of a programmer's code editor windows/panes if they are too long. 


    "maximumLineLength": {
        "allowRegex": false
    }

If a regex is longer than 80 characters, it is too long to understand. No Regex
should ever be this long. If you have a long Regex that you got from somewhere,
it is recommended that you break it up over several lines with comments like
the one on this page for detecting UTF-8:
http://www.w3.org/International/questions/qa-forms-utf-8.en.php


    "requireSpaceAfterKeywords": [
        "if",
        "else",
        "for",
        "while",
        "do",
        "switch",
        "return",
        "try",
        "catch"
    ]

Requiring spaces after the keywords above makes the code more readable.


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

Together with the eslint rule `func-names`, the above rules make sure that
every single function (declaration or expression) is named and that there is a
space between the `function` keyword and your function name, no space between
your function name and the opening parenthesis and that there is always a
space between the closing arguments parenthesis and the opening function body
curly bracket.


    "disallowTrailingComma": true

Trailing commas are always unnecessary and can cause parsing issues in some
tools. Furthermore, trailing commas break in JSON, they also break in older
browsers. We should not use them to make authoring JS & JSON consistent.


    "requireBlocksOnNewline": true

This improves readability in 99% of cases. If your going to use a block then
use a new line. putting a block in a single line encourages terse and
unreadable code.Pretty much the only case in which readability is reduced is
single-line `if` statements, and even then some will argue that `if` statements
with only one line in its block is more readable with newlines.


    "requireCurlyBraces": [
        "if",
        "else",
        "for",
        "while",
        "do",
        "try",
        "catch",
        "case",
        "default"
    ]

Requiring curly braces makes explicit what code is being handled by the special
keywords above, removing any potential ambiguities. Furthermore, requiring
curly braces eliminates a common source of errors where code is inadvertedly
included or excluded from code block due to indentation/formatting errors. We
should encourage using curly braces as it avoids the multiple statements bug
and also discourages long terse lines


    "disallowMultipleVarDecl": true

Var statements should be one per line. This rule enforces consistency and
eliminates a source of runtime bugs when a comma-separated variable declaration
list is modified, resulting in a missing comma or extraneous comma. This makes
variable declarations easier to move around and refactor without messing around
with commas and semicolons.


    "disallowEmptyBlocks": true

Missing blocks are either a sign that a developer intended to do something, but
forgot to implement it or its a sign that a developer is not following the
[YAGNI][yagni] rule. The only case where it's appropriate to have an empty
block is `function noop() {};`. Empty blocks are generally bad. Especially if
you have an empty catch block.


    "disallowSpaceAfterObjectKeys": true

This rule enforces consistency that is pretty much the status quo in the
JavaScript community and the format that pretty much every JSON stringifier
uses. Object literals should be consistent in terms of whitespace.


    "requireCommaBeforeLineBreak": true

This rule enforces consistency that is pretty much the status quo in the
JavaScript community and the format that pretty much every JSON stringifier
uses.


    "requireSpaceBeforeBinaryOperators": [
        "+",
        "-",
        "/",
        "*",
        "=",
        "==",
        "===",
        "!=",
        "!=="
    ],
    "requireSpacesInConditionalExpression": true,
    "requireSpaceAfterBinaryOperators": [
        "+",
        "-",
        "/",
        "*",
        "=",
        "==",
        "===",
        "!=",
        "!==",
        ","
    ]

Collectively, the above rules about requiring spacing around infix binary
operators introduces whitespace that improves the readability of mathematical
expressions and equality checks.


    "disallowSpaceAfterPrefixUnaryOperators": [
        "++",
        "--",
        "+",
        "-",
        "~",
        "!"
    ]

Prefix unary operators are more readable when they are in close proximity to
the object they operate on.


    "disallowKeywords": [
        "with",
        "try",
        "catch",
        "finally"
    ]

The `with` keyword is generally [considered harmful][with-considered-harmful],
although there are a few extreme cases where it might be useful. [1][with1]
[2][with2]. Also, `with` is banned in strict mode and thus banned in JSCS.

In JavaScript, and especially NodeJS, you should only ever throw an error when
a programmer has made and error (i.e. a bug). As such, `try`, `catch`,
`finally` are also banned. In JavaScript one should not use try catch for
control flow. For operational errors, the error should be returned to the
callee, who can then determine how to handle it.

The only exception where `try`/`catch`/`finally` are unavoidable (only because
it is too late to go back and change history) is using `JSON.parse` with
malformed JSON or `JSON.stringify` on an object with circular dependencies. 

In the case of parsing and stringifying JSON, we recommend that you use the
[raynos/safe-json-parse][safe-json-parse]. If you are parsing after reading a
JSON file or stringifying before writing a JSON file, you may want to use the
[jprichardson/node-jsonfile][jsonfile] module to simplify things further.

If you find yourself using a library that is throwing on anything other than
programmer errors (logic errors), then it is a good sign that that library is
poorly written and you should be using something else.


    "disallowMultipleLineBreaks": true

If you require multiple line breaks (beyond one empty line), it is almost
always an extra unnecessary line or a sign that you should include comments to
explain in words why two sections are different. Whitespace alone conveys that
one thing is separate from another, but does not convery *why*.


    "validateLineBreaks": "LF"

All line breaks should follow the Multics, Unix and Unix-like system standard
for newlines.


    "validateQuoteMarks": {
        "mark": "'",
        "escape": true
    }

We should have consistent quote marks. Mixing the two causes overhead and
confusion. All strings should use single quotes, however double quotes are
allowed only in cases where the string contains single quotes and the developer
would like to avoid having to escape them. The goal is consistency with an
exception made for readability. 


    "disallowMixedSpacesAndTabs": true

This rule requires no explanation. People that mix spaces and tabs are evil.


    "disallowTrailingWhitespace" : true

Trailing whitespaces are unnecessary and disallowing them altogether helps
eliminate a common source of unnecessary diffs in git commits.


    "disallowKeywordsOnNewLine": [
        "else"
    ]

Since the `requireBlocksOnNewline` rule is already enforced, allowing `else` to
occur on a newline would reduce readability. Our if statements should be
consistent.

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


    "requireLineFeedAtFileEnd": true

This improves readability so the last line is not at the edge of your code
editor buffer right next to your modeline or window status bar without some
whitespace.


    "requireDotNotation": true

Property access should be consistent. All objects should be accessed via dot
notation unless the object key cannot be expressed in dot notation. This makes
code more readable and maximally minifiable. The only legitimate reason to
revisit this rule is to allow us to use Google's Closure Compiler in advanced
compression mode.



[yagni]: http://en.wikipedia.org/wiki/You_aren't_gonna_need_it
[with-considered-harmful]: http://yuiblog.com/blog/2006/04/11/with-statement-considered-harmful/
[with1]: http://webreflection.blogspot.com/2009/12/with-worlds-most-misunderstood.html
[with2]: http://webreflection.blogspot.com/2009/12/with-some-good-example.html
[safe-json-parse]: https://github.com/Raynos/safe-json-parse
