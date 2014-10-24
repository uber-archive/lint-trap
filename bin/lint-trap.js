#!/usr/bin/env node
/*eslint no-console:0 no-process-exit:0 */
'use strict';
var process = require('process');
var argv = require('minimist')(process.argv.slice(2));
var lintTrap = require('../lib/');

var files = argv._.length === 0 ? [process.cwd()] : argv._;

lintTrap(files, function run(err, allFiles) {
    if (err) {
        return process.exit(1);
    }
    process.exit(0);
});
