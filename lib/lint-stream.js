var spawn = require('child_process').spawn;
var which = require('npm-which');
var JSONStream = require('JSONStream');
var path = require('path');
var es = require('event-stream');

function makeArgs(type) {
    return [
        '--config',
        path.resolve(__dirname, 'rc', '.' + type + 'rc'),
        (type === 'eslint') ? '--format' : '--reporter',
        path.resolve(__dirname, 'reporters', type + '.js')
    ];
}

function checkExitCode(type, code) {
    if (code !== 0) {
        console.log(type + ' exited with code ' + code);
    }
}

function makeFileMessageEmitter(type, lintErrorStream) {
    var currentFile = null;
    var fileErrors = [];

    return function fileEmitter(errorMessage) {
        if (errorMessage.type === 'file') {
            return;
        }
        if (errorMessage.file === currentFile || !currentFile) {
            fileErrors.push(errorMessage);
        } else {
            lintErrorStream.emit('data', {
                type: 'file',
                file: currentFile,
                linter: type,
                errors: fileErrors
            });
            fileErrors = [];
        }
        currentFile = errorMessage.file;
    };
}

function makeErrorEmitter(type, lintErrorStream) {
    return function(error) {
        data.linter = type;
        lintErrorStream.emit('error', data);
    };
}

function makeLintStream(type) {

    var binPath = which.sync(type);

    return function lintStream(files) {
        var linterMessageStream = JSONStream.parse('*');
        var args = makeArgs(type).concat(files);
        var opts = {};
        var onData = makeFileMessageEmitter(type, linterMessageStream);
        var onError = makeErrorEmitter(type, linterMessageStream);

        var lintProcess = spawn(binPath, args, opts);
        lintProcess.stdout.pipe(linterMessageStream);
        linterMessageStream.on('data', onData);
        lintProcess.stderr.on('data', onError);
        lintProcess.on('error', onError);
        //lintProcess.on('close', checkExitCode.bind(null, type));

        return linterMessageStream;
    };
}

function uberLintStream(linters) {
    linters = linters || ['jscs', 'jshint', 'eslint'];

    return function lint(files) {
        var streams = linters.map(function initLinter(linterName) {
            var stream = makeLintStream(linterName)(files);
            return stream;
        });

        return es.merge.apply(es, streams);
    };
}

module.exports = uberLintStream;
