# jscs guidelines.

## Status quo.

    "validateIndentation": 4

While the default value is 4, this rule is dynamically generated based on the
indentation style already used in a project.


    "maximumLineLength": {
        "value": 80
    }

Long lines make code harder to read and are usually indicative of poor quality
code. Also, since 80-character lines has been a common standard across many
languages for so long, many developers have optimized their development 
workflow to use 80-character code editor windows and panes.


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


    "disallowSpacesInFunctionExpression": {
        "beforeOpeningRoundBrace": true
    },
    "disallowSpacesInFunctionDeclaration": {
        "beforeOpeningRoundBrace": true
    },
    "disallowSpacesInAnonymousFunctionExpression": {
        "beforeOpeningRoundBrace": true
    },
    "disallowSpacesInNamedFunctionExpression": {
        "beforeOpeningRoundBrace": true
    },
    "requireSpacesInFunctionExpression": {
        "beforeOpeningCurlyBrace": true
    },
    "requireSpacesInFunctionDeclaration": {
        "beforeOpeningCurlyBrace": true
    },
    "requireSpacesInAnonymousFunctionExpression": {
        "beforeOpeningRoundBrace": true,
        "beforeOpeningCurlyBrace": true
    },
    "requireSpacesInNamedFunctionExpression": {
        "beforeOpeningCurlyBrace": true
    }

The above rules in aggregate force you to always name your functions without a
space between your function name and the opening parenthesis, but with a space
between the closing parenthesis and opening curly bracket.

The purpose of forcing you to always name every function is two-fold. First,
this produces much more readable stack traces, since anonymous function calls
require you to go to the source code and figure out what a function is trying
to do. Naming the function makes it clear what it is trying to do. Second,
naming your functions, makes it easy to pull out the function from where is is
being called, thereby keeping indentation levels and line lengths low.

One thing to keep in mind with this rule is that named function expressions are
not hoisted into the current scope. For example, in the following line of code
only `foo` will be available in the top-level scope, and `bar` will only be
available within its own scope. 

    var foo = function bar() {};

Furthermore, when you write inline functions (which are oftern anonymous
functions), those functions are function expressions, not function
declarations. What this means is that in a test file, it is perfectly
acceptable to do the following since the function expressions with name `t`
do not collide in the same scope as the token `test`:

    var test = require('tape');

    test('foo', function t() { /* test foo */ });
    test('bar', function t() { /* test bar */ });
    test('baz', function t() { /* test baz */ });

If appropriate, you can also name those function expressions more explicitly,
like `tFoo`, `tBar` and `tBaz`, but this is not necessary.

In the case of anonymous callback functions used for the sole purpose of
handling the first error argument, before calling another function with the
remaining arguments, you can name it something like `handleError` or you can
even use a helper function like the following to wrap the error if you find
yourself writing lots of `handleError` callback functions in the same file:

    function wrapError(callbackFn, nextFn) {
        return function handleError(err) {
            if (err) {
                return callbackFn(err);
            }
            var args = arguments.slice(1);
            args.push(callbackFn);
            nextFn.apply(null, args);
        }
    }

Overall, this rule that requires that all functions be named may same tedious
at first, but it almost invariably forces you to refactor a lot of your code
for the better, since it prevents you from abusing lambdas. If you encounter
a use case where you think it is particularly challenging to satisfy this rule,
feel free to open up an issue, and we'll help you figure out how refactor your
code.


    "disallowTrailingComma": true

Trailing commas are always unnecessary and can cause parsing issues in some
tools.


    "requireBlocksOnNewline": true

This improves readability in 99% of cases. Pretty much the only case in which
readability is reduced is single-line `if` statements, and even then some will
argue that `if` statements with only one line in its block is more readable
with newlines.


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
included or excluded from code block due to indentation/formatting errors.


    "disallowMultipleVarDecl": true

This rule enforces consistency and eliminates a source of runtime bugs when a
comma-separated variable declaration list is modified, resulting in a missing
comma or extraneous comma.


    "disallowEmptyBlocks": true

Missing blocks are either a sign that a developer intended to do something, but
forgot to implement it or its a sign that a developer is not following the
[YAGNI][yagni] rule. The only case where it's appropriate to have an empty
block is `function noop() {};`.


    "disallowSpaceAfterObjectKeys": true

This rule enforces consistency that is pretty much the status quo in the
JavaScript community and the format that pretty much every JSON stringifier
uses.


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
[2][with2]

In JavaScript, and especially NodeJS, you should only ever throw an error when
a programmer has made and error (i.e. a bug). For operational errors, the error
should be returned to the callee, who can then determine how to handle it. The
only exception to this rule is using `JSON.parse` with malformed JSON or
`JSON.stringify` on an object with circular dependencies. 

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

All strings should use single quotes, however double quotes are allowed only in
cases where the string contains single quotes and the developer would like to
avoid having to escape them. The goal is consistency with an exception made for
readability.


    "disallowMixedSpacesAndTabs": true

This rule requires no explanation.


    "disallowTrailingWhitespace" : true

Trailing whitespaces are unnecessary and disallowing them altogether helps
eliminate a common source of unnecessary diffs in git commits.


    "disallowKeywordsOnNewLine": [
        "else"
    ]

Since the `requireBlocksOnNewline` rule is already enforced, allowing `else` to
occur on a newline would reduce readability.


    "requireLineFeedAtFileEnd": true

This improves readability so the last line is not at the edge of your code
editor buffer right next to your modeline or window status bar without some
whitespace.


    "requireDotNotation": true

All objects should be accessed via dot notation unless the object key cannot be
expressed in dot notation. This makes code more readable and maximally
minifiable. The only legitimate reason to revisit this rule is to allow us to
use Google's Closure Compiler in advanced compression mode.






[yagni]: http://en.wikipedia.org/wiki/You_aren't_gonna_need_it
[with-considered-harmful]: http://yuiblog.com/blog/2006/04/11/with-statement-considered-harmful/
[with1]: http://webreflection.blogspot.com/2009/12/with-worlds-most-misunderstood.html
[with2]: http://webreflection.blogspot.com/2009/12/with-some-good-example.html
[safe-json-parse]: https://github.com/Raynos/safe-json-parse
