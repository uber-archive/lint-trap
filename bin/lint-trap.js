#!/usr/bin/env node
/*eslint no-console:0 no-process-exit:0 */
'use strict';
var process = require('process');
var argv = require('minimist')(process.argv.slice(2));
var console = require('console');
var async = require('async');
var lintTrap = require('../lib/');
var getJavaScriptFiles = require('../lib/get-javascript-files');

async.reduce(argv._, [], function accumulator(memo, pathArg, done) {
    getJavaScriptFiles(pathArg, function lintFilesCallback(err, jsfiles) {
        if (err) {
            return done(err);
        }
        done(null, memo.concat(jsfiles));
    });
}, function run(err, allFiles) {
    if (allFiles.length === 0) {
        console.error('No files found');
        process.exit(1);
    }
    lintTrap(allFiles);
});
