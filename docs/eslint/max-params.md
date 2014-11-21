# max-params

    "max-params": [2, 4]

A function with more than 4 parameters does far too much.
Developers should instead be carefully designing their
functions via techniques such as currying/schonfinkelization
or using an options object, especially if many parameters
are optional. It is difficult to remember the interface of a
function with too many positional parameters.

[Official `max-params` ESLint Rule Documentation][max-params-docs]

[max-params-docs]: https://github.com/eslint/eslint/blob/master/docs/rules/max-params.md
