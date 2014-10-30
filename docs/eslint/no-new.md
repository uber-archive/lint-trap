# no-new

    "no-new": 2

If you find yourself calling a constructor without using the result then
that's a bad constructor.

A constructor function just allocates an object with a fixed set of fields,
if it has a side effect then something went terribly wrong.

[Official `no-new` ESLint Rule Documentation][no-new-docs]

[no-new-docs]: https://github.com/eslint/eslint/blob/master/docs/rules/no-new.md
