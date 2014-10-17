'use strict';
var spawn = require('child_process').spawn;
var JSONStream = require('JSONStream');
var path = require('path');
var es = require('event-stream');
var makeFileStream = require('./error-to-file-stream');
var clusterFileMessages = require('./group-file-messages-stream');

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

function makeLintStream(type) {

    var binPath = path.resolve(__dirname, '../node_modules/.bin/' + type);

    return function lintStream(files) {
        var linterMessageStream = JSONStream.parse('*');
        var args = makeArgs(type).concat(files);
        var opts = {};
        var onError = makeErrorEmitter(type, linterMessageStream);

        var fileStream = makeFileStream(type, files.slice(0));
        var lintProcess = spawn(binPath, args, opts);

        lintProcess.stdout.pipe(linterMessageStream);
        lintProcess.stderr.on('data', onError);
        lintProcess.on('error', onError);

        linterMessageStream.pipe(fileStream);

        return fileStream;
    };
}

function lintTrapStream(linters) {
    linters = linters || ['jscs', 'jshint', 'eslint'];

    return function lint(files) {
        files.sort();
        var streams = linters.map(function initLinter(linterName) {
            var stream = makeLintStream(linterName)(files);
            return stream;
        });

        var mergedLintStream = es.merge.apply(es, streams);
        var finalStream = clusterFileMessages(linters);
        mergedLintStream.pipe(finalStream);

        return finalStream;
    };
}

module.exports = lintTrapStream;
