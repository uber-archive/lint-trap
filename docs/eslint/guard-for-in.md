# guard-for-in

    "guard-for-in": 2

Not using `Object.hasOwnProperty` can lead to subtle bugs.
It's a good practice to make up for javascripts for loop
semantics.

However it should be noted that using `Object.keys(o)` is
preferred instead of the for in loop.

[Official `guard-for-in` ESLint Rule Documentation][guard-for-in-docs]

[guard-for-in-docs]: https://github.com/eslint/eslint/blob/master/docs/rules/guard-for-in.md
