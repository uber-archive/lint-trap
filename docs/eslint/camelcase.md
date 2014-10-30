# camelcase

    "camelcase": 2

Combining multiple styles together is a source of frustration in having to
remember what the property names are.

JavaScript does not have a good auto complete so knowing what the casing of
a property is makes working with JavaScript easier.

We should enforce camelcase. For the few use cases where you need to access
keys on JSON blobs coming from an external process that has snake case you
can use an exclude statement.

[Official `camelcase` ESLint Rule Documentation][camelcase-docs]

[camelcase-docs]: https://github.com/eslint/eslint/blob/master/docs/rules/camelcase.md
