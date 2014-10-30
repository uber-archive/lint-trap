# globals

    "globals": {
        "__dirname": true,
        "__filename": true,
        "require": true,
        "module": true
    },

This is the minimum set of globals required both in the browser and in NodeJS.
Restricting globals to this set has numerous benefits:
 - It trains developers to never rely on global scope
 - It reduces the length of the scope chain that needs to be traversed since
   pointers to a global object are encountered sooner in the chain.
 - Allows globals to be mocked in testing environments.

Please see the section titled "Globals" in the [README][readme] for further
information.

[Official `globals` ESLint Rule Documentation][globals-docs]

[globals-docs]: http://eslint.org/docs/configuring/
[readme]: https://github.com/uber/lint-trap/blob/master/README.markdown
