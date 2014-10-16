'use strict';
/*eslint no-console:0 */
var lint = require('./lint-stream')();
var commondir = require('commondir');
var console = require('console');
var printFileErrorTable = require('./stylish-stream-reporter');

function onError(err) {
    console.error(JSON.stringify(err, null, 2));
}

function run(jsfiles) {
    var dir = commondir(jsfiles);
    var uberLintStream = lint(jsfiles);
    uberLintStream.on('data', printFileErrorTable(dir));
    uberLintStream.on('error', onError);
}

module.exports = run;
