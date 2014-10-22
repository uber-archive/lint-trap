'use strict';
/*eslint no-console:0 */
var lintStream = require('./lint-stream')();
var commondir = require('commondir');
var console = require('console');
var printFileErrorTable = require('./stylish-stream-reporter');
var async = require('async');
var getJavaScriptFiles = require('./get-javascript-files');
var setIndentRule = require('./set-indent-rule');

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
    var dir = commondir(jsfiles);

    setIndentRule(dir, jsfiles[0], function setIndentRuleCallback(err) {
        if (err) {
            return callback(err);
        }
        var uberLintStream = lintStream(jsfiles);
        uberLintStream.on('data', printFileErrorTable(dir));
        uberLintStream.on('data', function onMessage(message) {
            count += message.errors.length;
        });
        uberLintStream.on('error', onError);
        uberLintStream.on('end', function onEnd() {
            callback(count > 0 ? new Error('Errors: ' + count) : null);
        });
    });
}

function run(paths, callback) {
    findFiles(paths, function fileFilesCallback(err, files) {
        if (err) {
            callback(err);
        }
        if (files.length === 0) {
            callback(new Error('no files found'));
        }
        lint(files, callback);
    });
}

module.exports = run;
