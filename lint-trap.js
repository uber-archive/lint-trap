'use strict';
var lintStream = require('./lint-stream')();
var printFileErrorTable = require('./stylish-stream-reporter');
var printCheckstyle = require('./checkstyle-reporter');
var async = require('async');
var getJavaScriptFiles = require('./get-javascript-files');
var es = require('event-stream');
var process = require('process');

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

function lint(jsfiles, opts, callback) {
    var exitCode = 0;
    var uberLintStream = lintStream(jsfiles);

    if (opts.reporter === 'stylish') {
        uberLintStream.on('data', onMessage);
    } else if (opts.reporter === 'checkstyle') {
        uberLintStream.pipe(es.writeArray(writeCheckstyleXML));
    } else {
        callback(new Error('Unknown reporter: ' + opts.reporter));
    }

    uberLintStream.once('error', callback);
    uberLintStream.once('end', onEnd);

    function onMessage(message) {
        message.errors.forEach(checkSeverity);
        printFileErrorTable(message);
    }

    function checkSeverity(error) {
        if (error.type === 'error') {
            exitCode = 1;
        }
    }

    function onEnd() {
        callback(exitCode === 1 ? new Error('Lint errors encountered') : null);
    }

    function writeCheckstyleXML(err, fileMessages) {
        if (err) {
            return callback(err);
        }
        process.stdout.write(printCheckstyle(fileMessages));
    }
}

function run(paths, opts, callback) {
    if (typeof opts === 'function') {
        callback = opts;
        opts = {
            reporter: 'stylish'
        };
    }

    findFiles(paths, function fileFilesCallback(err, files) {
        if (err) {
            return callback(err);
        }
        if (files.length === 0) {
            return callback(new Error('no files found'));
        }
        lint(files, opts, callback);
    });
}

module.exports = run;
