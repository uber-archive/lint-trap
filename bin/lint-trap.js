#!/usr/bin/env node
/*eslint no-console:0 no-process-exit:0 */
'use strict';
var process = require('process');
var console = require('console');
var argv = require('minimist')(process.argv.slice(2));
var lintTrap = require('../lint-trap');

var files = argv._.length === 0 ? [process.cwd()] : argv._;

var opts = {
    reporter: argv.reporter || argv.r || 'stylish'
};

lintTrap(files, opts, function run(err, allFiles) {
    if (err) {
        if (err.message !== 'Lint errors encountered') {
            console.error(err.message);
        }
        return process.exit(1);
    }
    process.exit(0);
});
