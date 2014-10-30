# global-strict

    "global-strict": [2, "always"]

The way commonJS works is that it wraps your file in a function expression.
This means that something which looks like a global strict statement is
actually isolated by a function expression.

This means that the globalstrict bug is actually impossible and should not be
an error.

Strict mode also causes modifications to objects frozen with `Object.freeze`
to throw TypeErrors, which is desirable.

[Official `global-strict` ESLint Rule Documentation][global-strict-docs]

[global-strict-docs]: https://github.com/eslint/eslint/blob/master/docs/rules/global-strict.md
