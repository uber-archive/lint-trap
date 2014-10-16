'use strict';
var spawn = require('child_process').spawn;
var which = require('npm-which');
var JSONStream = require('JSONStream');
var path = require('path');
var es = require('event-stream');
var through = require('through');
var makeFileStream = require('./error-to-file-stream');

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

    var binPath = which.sync(type);

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

/**
 * Through stream that takes messages with all the errors on a per linter and
 * per file basis and when if receives all the file error messages from all
 * linters, it emits a consolidated file error message.
 *
 * e.g. given 3 linters X, Y and Z and 3 files A, B and C, this takes the
 * following 9 input messages:
 *   XA, XB, XC, YA, YB, YC, ZA, ZB, ZC
 *
 * ... and returns a stream that emits the following 3 messages:
 *   A[XYZ], B[XYZ], C[XYZ]
 *
 * @param  {[type]} linters [description]
 * @return {[type]}         [description]
 */
function clusterFileMessages(linters) {

    var fileMessages = {};

    function write(message) {

        function acc(memo, fileMessage) {
            return memo.concat(fileMessage.errors);
        }

        if (fileMessages[message.file]) {
            fileMessages[message.file].push(message);

            if (fileMessages[message.file].length === linters.length) {

                var allFileErrors = fileMessages[message.file].reduce(acc, []);

                this.queue({
                    type: 'file',
                    file: message.file,
                    errors: allFileErrors
                });

                delete fileMessages[message.file];
            }
        } else {
            fileMessages[message.file] = [message];
        }
    }

    function end() {
        this.queue(null);
    }

    return through(write, end);
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
