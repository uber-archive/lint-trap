'use strict';
var spawn = require('child_process').spawn;
var JSONStream = require('JSONStream');
var path = require('path');
var es = require('event-stream');
var fs = require('fs');
var which = require('npm-which');
var commondir = require('commondir');
var through2 = require('through2');
var setIndentRule = require('./set-indent-rule');
var makeFileStream = require('./error-to-file-transform');
var clusterFileMessages = require('./group-file-messages-transform');
var severityTransform = require('./severity-transform');

function makeArgs(type) {
    return [
        '--config',
        path.resolve(__dirname, 'rc', '.' + type + 'rc'),
        (type === 'eslint') ? '--format' : '--reporter',
        path.resolve(__dirname, 'reporters', type + '.js')
    ];
}

function makeErrorEmitter(type, lintErrorStream) {
    return function emitError(error) {
        error.linter = type;
        lintErrorStream.emit('error', error);
    };
}

function getBinPath(type, callback) {
    var binPath = path.resolve(__dirname, '../node_modules/.bin/' + type);

    fs.exists(binPath, function existsCallback(exists) {
        if (exists) {
            callback(null, binPath);
        } else {
            which(type, callback);
        }
    });
}

function makeRelativePathFn(dir) {
    return function makeRelativePath(file) {
        return (dir === file) ?
            path.relative(path.dirname(dir), file) :
            path.relative(dir, file);
    };
}

function execLinter(type, dir, files) {

    var jsonMessages = JSONStream.parse('*');
    var makeRelativePath = makeRelativePathFn(dir);

    var lintMessages = through2.obj(function transform(message, enc, callback) {
        // If commondir and message.file are the same, we are linting a
        // single file. This makes sure that the file name is printed in
        // that case.
        message.file = makeRelativePath(message.file);
        this.push(message);
        callback();
    });

    setIndentRule(dir, files[0], function setIndentRuleCallback(err) {
        if (err) {
            lintMessages.emit('error', err);
            return;
        }

        getBinPath(type, function getBinPathCallback(err, binPath) {
            if (err) {
                lintMessages.emit('error', err);
                return;
            }

            var args = makeArgs(type).concat(files);
            var opts = {};
            var onError = makeErrorEmitter(type, jsonMessages);
            var lintProcess = spawn(binPath, args, opts);
            lintProcess.stdout
                .pipe(jsonMessages)
                .pipe(severityTransform())
                .pipe(lintMessages);
            lintProcess.stderr.on('data', onError);
            lintProcess.on('error', onError);
        });

    });

    return lintMessages;
}

function lintStream(type, files) {
    var dir = commondir(files);
    var fileStream = makeFileStream(type, files.map(makeRelativePathFn(dir)));
    execLinter(type, dir, files).pipe(fileStream);
    return fileStream;
}

function lintTrapStream(linters) {
    linters = linters || ['jscs', 'jshint', 'eslint'];

    return function lint(files) {
        files.sort();
        var streams = linters.map(function initLinter(linterName) {
            var stream = lintStream(linterName, files);
            return stream;
        });

        var mergedLintStream = es.merge.apply(es, streams);
        var finalStream = clusterFileMessages(linters);
        mergedLintStream.pipe(finalStream);

        return finalStream;
    };
}

module.exports = lintTrapStream;
