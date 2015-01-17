'use strict';
var spawn = require('child_process').spawn;
var JSONStream = require('jsonstream2');
var path = require('path');
var es = require('event-stream');
var which = require('npm-which');
var through2 = require('through2');
var makeFileStream = require('./error-to-file-transform');
var clusterFileMessages = require('./group-file-messages-transform');
var severityTransform = require('./severity-transform');
var process = require('process');
var makeDedupeTransform = require('./dedupe-transform');
var console = require('console');

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

function execLinter(type, dir, files, opts) {

    var makeRelativePath = makeRelativePathFn(dir);

    var lintMessages = makeRelativePathTransform(makeRelativePath);

    getBinPath(type, getBinPathCallback);

    function getBinPathCallback(err, binPath) {
        if (err) {
            return lintMessages.emit('error', err);
        }

        var args = makeArgs(type, files, opts.stdin);
        var lintProcess = spawn(binPath, args);

        if (opts.stdin) {
            process.stdin.pipe(lintProcess.stdin);

            process.stdin.once('end', function onStdinEnd() {
                lintProcess.stdin.end();
            });
        }

        lintProcess.stdout
            .pipe(JSONStream.parse('*'))
            .pipe(severityTransform())
            .pipe(lintMessages)
            .on('error', onError);

        lintProcess.stderr.on('data', onError);

        function onError(linterErr) {
            /*eslint-disable*/
            console.error('linting failed for', type);
            console.error(linterErr.toString());
            process.exit(1);
            /*eslint-enable*/
        }
    }

    return lintMessages;
}

function lintStream(type, dir, files, opts) {
    var fileStream = makeFileStream(type, files.map(makeRelativePathFn(dir)));
    execLinter(type, dir, files, opts).pipe(fileStream);
    return fileStream;
}

function lintTrapStream(linters) {
    linters = linters || ['jscs', 'jshint', 'eslint'];

    return function lint(files, dir, opts) {
        var streams = linters.map(function initLinter(linterName) {
            return lintStream(linterName, dir, files, opts);
        });

        var mergedLintStream = es.merge.apply(es, streams);
        var finalStream = makeDedupeTransform();

        mergedLintStream
            .pipe(clusterFileMessages(linters))
            .pipe(finalStream);

        return finalStream;
    };
}

module.exports = lintTrapStream;
