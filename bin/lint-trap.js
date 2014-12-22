#!/usr/bin/env node
/*eslint no-console:0 no-process-exit:0 */
'use strict';
var process = require('process');
var console = require('console');
var argv = require('minimist')(process.argv.slice(2));
var lintTrap = require('../lint-trap');
var fmt = require('util').format;

// hack. sad.
setTimeout(function () {
    if (argv._[0] === '-') process.exit(1);
}, 5000);

var files = argv._.length === 0 ? [process.cwd()] : argv._;

if (argv.v || argv.version) {
    printVersion();
} else if (argv.h || argv.help) {
    printHelp();
} else {
    var opts = {
        lineLength: argv['line-length'] || 80,
        reporter: argv.reporter || argv.r || 'stylish',
        files: files,
        stdin: readFromStdin(argv)
    };
    lintTrap(opts, run);
}

function readFromStdin(argv) {
    return argv._.length === 1 && argv._[0] === '-';
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

function printHelp() {
    var helpMsg = [
        'lint-trap',
        '',
        'usage:',
        '  lint-trap <file(s) & folder(s)> <options>',
        '',
        'options:',
        '  -h --help                   Print help information',
        '  -v --version                Print version',
        '     --line-length <length>   Set line-length limit to <length>',
        '',
        'example:',
        '  lint-trap "test/*.js" --line-length 120',
        '',
        '  (nb: quote globstar patterns to prevent shell expansion)',
        ''
    ].join('\n');
    process.stdout.write(helpMsg);
    process.exit(0);
}

function printVersion() {
    var pkg = require('../package.json');
    console.error(fmt('lint-trap v%s', pkg.version));
    process.exit(0);
}
