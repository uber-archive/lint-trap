'use strict';
var spawn = require('child_process').spawn;
var JSONStream = require('jsonstream2');
var path = require('path');
var es = require('event-stream');
var which = require('npm-which');
var commondir = require('commondir');
var through2 = require('through2');
var setIndentRule = require('./set-indent-rule');
var makeFileStream = require('./error-to-file-transform');
var clusterFileMessages = require('./group-file-messages-transform');
var severityTransform = require('./severity-transform');
var process = require('process');

function makeArgs(type, files, readFromStdin) {
    var args = [
        '--config',
        path.resolve(__dirname, 'rc', '.' + type + 'rc'),
        (type === 'eslint') ? '--format' : '--reporter',
        path.resolve(__dirname, 'reporters', type + '.js')
    ];

    if (readFromStdin) {
        args.push(type === 'eslint' ? '--stdin' : '-');
    } else {
        args = args.concat(files);
    }

    return args;
}

function makeErrorEmitter(type, lintErrorStream) {
    return function emitError(error) {
        // console.log(error.toString());
        error.linter = type;
        // lintErrorStream.emit('error', error);
    };
}

function getBinPath(type, callback) {
    which(type, {cwd: __dirname}, callback);
}

function makeRelativePathFn(dir) {
    return function makeRelativePath(file) {
        return (dir === file) ?
            path.relative(path.dirname(dir), file) :
            path.relative(dir, file);
    };
}

function makeRelativePathTransform(makeRelativePath) {
    return through2.obj(function transform(message, enc, callback) {
        // If commondir and message.file are the same, we are linting a
        // single file. This makes sure that the file name is printed in
        // that case.
        message.file = makeRelativePath(message.file);
        this.push(message);
        callback();
    });
}

function execLinter(type, dir, files, readFromStdin) {

    var jsonMessages = JSONStream.parse('*');
    var makeRelativePath = makeRelativePathFn(dir);

    var lintMessages = makeRelativePathTransform(makeRelativePath);

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

            var opts = {};
            var args = makeArgs(type, files, readFromStdin);

            var onError = makeErrorEmitter(type, jsonMessages);
            var lintProcess = spawn(binPath, args, opts);

            if (readFromStdin) {
                process.stdin.pipe(lintProcess.stdin);

                process.stdin.on('end', function onStdinEnd() {
                    lintProcess.stdin.end();
                });
            }

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

function lintStream(type, files, readFromStdin) {
    var dir = commondir(files);
    var fileStream = makeFileStream(type, files.map(makeRelativePathFn(dir)));
    execLinter(type, dir, files, readFromStdin).pipe(fileStream);
    return fileStream;
}

function lintTrapStream(linters) {
    linters = linters || ['jscs', 'jshint', 'eslint'];

    return function lint(files, readFromStdin) {
        files.sort();
        var streams = linters.map(function initLinter(linterName) {
            var stream = lintStream(linterName, files, readFromStdin);
            return stream;
        });

        var mergedLintStream = es.merge.apply(es, streams);
        var finalStream = clusterFileMessages(linters);
        mergedLintStream.pipe(finalStream);

        return finalStream;
    };
}

module.exports = lintTrapStream;
