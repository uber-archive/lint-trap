# no-use-before-define

    "no-use-before-define": [2, "nofunc"]

Variables should be declared before they are used.
JavaScript hoists all variable and function declarations to
the top of the scope before it begins execution. For
functions, this behavior works fine, but any variables
hoisted before they are defined have their value set to
`undefined`, which is always the wrong behavior.

We exclude function declarations as those are hoisted with
their value. i.e. if you use a function declaration before
it's defined then you will always reference said function.
The function declaration hoisting technique can also be used
to avoid circular dependencies.

[Official `no-use-before-define` ESLint Rule Documentation][no-use-before-define-docs]

[no-use-before-define-docs]: https://github.com/eslint/eslint/blob/master/docs/rules/no-use-before-define.md
