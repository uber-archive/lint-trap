'use strict';
var lintStream = require('./lint-stream')();
var makeStylishStreamWriter = require('./stylish-stream-reporter');
var printCheckstyle = require('./checkstyle-reporter');
var printJSON = require('./json-reporter');
var async = require('async');
var getJavaScriptFiles = require('./get-javascript-files');
var es = require('event-stream');
var process = require('process');
var extend = require('xtend');
var makeErrorMeter = require('./error-meter');
var partial = require('partial');
var printCompact = require('./compact-reporter');

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

function makeWriter(printer, callback) {
    function writer(err, fileMessages) {
        if (err) {
            return callback(err);
        }

        process.stdout.write(printer(fileMessages));
    }
    return es.writeArray(writer);
}

function onEnd(errorMeter, callback) {
    var metrics = errorMeter.getMetrics();
    var err = metrics.errorCode === 1 ?
        new Error('Lint errors encountered') : null;
    callback(err);
}

function lint(jsfiles, opts, callback) {
    var uberLintStream = lintStream(jsfiles, opts.stdin);
    var errorMeter = makeErrorMeter();
    var writer;
    var r = opts.reporter;

    writer = (r === 'stylish') ? makeStylishStreamWriter() :
             (r === 'checkstyle') ? makeWriter(printCheckstyle, callback) :
             (r === 'json') ? makeWriter(printJSON, callback) :
             (r === 'compact') ? makeWriter(printCompact, callback) : null;

    if (!writer) {
        return callback(new Error('Unknown reporter: ' + r));
    }

    uberLintStream
        .pipe(errorMeter.meter)
        .pipe(writer);

    uberLintStream.once('error', callback);
    uberLintStream.once('end', partial(onEnd, errorMeter, callback));
}

function run(opts, callback) {
    opts = extend({
        files: [],
        reporter: 'stylish',
        stdin: false
    }, opts);

    if (opts.stdin) {
        lint(['stdin'], opts, callback);
    } else {
        findFiles(opts.files, function fileFilesCallback(err, files) {
            if (err) {
                return callback(err);
            }
            if (files.length === 0) {
                return callback(new Error('no files found'));
            }
            lint(files, opts, callback);
        });
    }
}

module.exports = run;
