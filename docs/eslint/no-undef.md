# no-undef

    "no-undef": 2

This one is really important. If your using an undefined
variable then that is a typo and a bug. Having the hinter
catch that reduces bugs significantly.

Using global variables that are not defined in the file is
also an anti-pattern. With `require` you can
[`require('global')`][npm-global] if you need access to the
global scope. More information on globals can be found in
our [globals documentation][globals-docs].

Being explicit is always better.

[Official `no-undef` ESLint Rule Documentation][no-undef-docs]

[no-undef-docs]: https://github.com/eslint/eslint/blob/master/docs/rules/no-undef.md
[npm-global]: https://github.com/Raynos/global
[globals-docs]: globals.md
