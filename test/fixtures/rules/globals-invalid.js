'use strict';

function invalidGlobals() {
    return [
        __dirname,
        __filename,
        module,
        require,
        process,
        global,
        exports,
        console
    ];
}

module.exports = invalidGlobals;
