'use strict';
/*eslint no-console:0 */
var lintStream = require('./lint-stream')();

var console = require('console');
var printFileErrorTable = require('./stylish-stream-reporter');
var async = require('async');
var getJavaScriptFiles = require('./get-javascript-files');

function onError(err) {
    console.error(JSON.stringify(err, null, 2));
}

function findFiles(paths, callback) {
    async.reduce(paths, [], function accumulator(memo, pathArg, done) {
        getJavaScriptFiles(pathArg, function findJSFilesCallback(err, jsfiles) {
            if (err) {
                return done(err);
            }
            done(null, memo.concat(jsfiles));
        });
    }, callback);
}

function lint(jsfiles, callback) {
    var count = 0;

    var uberLintStream = lintStream(jsfiles);
    uberLintStream.on('data', function onMessage(message) {
        count += message.errors.length;
        printFileErrorTable(message);
    });
    uberLintStream.on('error', onError);
    uberLintStream.on('end', function onEnd() {
        callback(count > 0 ? new Error('Errors: ' + count) : null);
    });
}

function run(paths, callback) {
    findFiles(paths, function fileFilesCallback(err, files) {
        if (err) {
            return callback(err);
        }
        if (files.length === 0) {
            return callback(new Error('no files found'));
        }
        lint(files, callback);
    });
}

module.exports = run;
