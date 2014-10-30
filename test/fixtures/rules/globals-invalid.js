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
        console,
        clearInterval,
        setInterval,
        clearTimeout,
        setTimeout,
        Buffer
    ];
}

module.exports = invalidGlobals;
