# disallowKeywords

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

[with-considered-harmful]: http://yuiblog.com/blog/2006/04/11/with-statement-considered-harmful/
[with1]: http://webreflection.blogspot.com/2009/12/with-worlds-most-misunderstood.html
[with2]: http://webreflection.blogspot.com/2009/12/with-some-good-example.html
[safe-json-parse]: https://github.com/Raynos/safe-json-parse
