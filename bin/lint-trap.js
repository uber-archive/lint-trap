#!/usr/bin/env node
'use strict';
var process = require('process');
var argv = require('minimist')(process.argv.slice(2));
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
    lintTrap(allFiles);
});
