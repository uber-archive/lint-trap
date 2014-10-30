# eqeqeq

    "eqeqeq": 2

Type coercion is a bad part of JavaScript and leads to real production
bugs where you accidentally treat numbers and strings the same and then
accidentally send a string instead of a number down a response.

There are no good use cases for `==`.

[Official `eqeqeq` ESLint Rule Documentation][eqeqeq-docs]

[eqeqeq-docs]: https://github.com/eslint/eslint/blob/master/docs/rules/eqeqeq.md
