#!/usr/bin/env node
/*eslint no-console:0 no-process-exit:0 */
'use strict';
var process = require('process');
var console = require('console');
var argv = require('minimist')(process.argv.slice(2));
var lintTrap = require('../lint-trap');
var fmt = require('util').format;

var files = argv._.length === 0 ? [process.cwd()] : argv._;

function readFromStdin(argv) {
    return argv._.length === 1 && argv._[0] === '-';
}

var opts = {
    reporter: argv.reporter || argv.r || 'stylish',
    files: files,
    stdin: readFromStdin(argv)
};

if (argv.version) {
    var pkg = require('../package.json');
    console.error(fmt('lint-trap v%s', pkg.version));
    process.exit(0);
} else {
    lintTrap(opts, run);
}

function run(err) {
    if (err) {
        if (err.message !== 'Lint errors encountered') {
            console.error(err.message);
        }
        return process.exit(1);
    }
    process.exit(0);
}
