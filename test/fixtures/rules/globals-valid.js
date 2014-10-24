'use strict';

var global = require('global');
var process = require('process');
var window = require('global/window');
var document = require('global/document');
var console = require('console');
var exports = module.exports;

function validGlobals() {
    return [
        __dirname,
        __filename,
        module,
        require,
        process,
        global,
        exports,
        console,
        window,
        document
    ];
}

module.exports = validGlobals;
