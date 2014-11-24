# no-unused-vars

    "no-unused-vars": [2, {"vars": "all", "args": "none"}]

Checking for unused variables is very useful when it comes
to refactoring.

This allows you to remove dead code.

Note that `unused` is set to `"vars"` only. Unused
parameters are useful to define if you pass a callback or
listener to another module and only use one out of N
arguments.

An `unused` function parameter is not actually a bug and nor
is it something that needs to be cleaned up.

[Official `no-unused-vars` ESLint Rule Documentation][no-unused-vars-docs]

[no-unused-vars-docs]: https://github.com/eslint/eslint/blob/master/docs/rules/no-unused-vars.md
