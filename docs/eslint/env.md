# env

    "env": {
        "browser": false,
        "node": false,
        "amd": false,
        "mocha": false,
        "jasmine": false
    }

None of the environment meta variables are used because we
proscribe our own style, which applies to both server side
and browser side code. The most important issue to be aware
of here is how we handle globals explained below.

[Official `env` ESLint Rule Documentation][env-docs]

[env-docs]: http://eslint.org/docs/configuring/
