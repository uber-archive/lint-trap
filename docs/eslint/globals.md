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

The only whitelisted globals are `__dirname`, `__filename`, `module` and
`require`. The former two are the only globals that cannot be provided by
the module system and the latter two are the only ones needed in order to
use the module system.

`exports` is not whitelisted. You should instead always access `exports` via a
property on `module`. e.g. `module.exports = someObject;`

For other globals such as `process`, `global`, `window`, `document`, you should
include the following two modules in your project if needed.

* [raynos/global][raynos-global] => `global`, `window` and `document`
* [defunctzombie/node-process][defunctzombie-node-process] => `process`

If you want any other globals you can require them. i.e.

* `require('timers').setTimeout;`
* `require('timers').clearTimeout;`
* `require('timers').setInterval;`
* `require('timers').clearInterval;`
* `require('buffer').Buffer;`
* `require('process');`
* `require('global');`
* `require('console');`

[Official `globals` ESLint Rule Documentation][globals-docs]

[globals-docs]: http://eslint.org/docs/configuring/
[raynos-global]: https://github.com/Raynos/global
[defunctzombie-node-process]: https://github.com/defunctzombie/node-process
