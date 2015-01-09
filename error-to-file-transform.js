'use strict';
var through = require('through2');

function makeFileStream(type, files) {
    var currentFile = null;
    var fileErrors = [];

    function pushEmpty(file) {
        this.push({
            type: 'file',
            file: file,
            linter: type,
            errors: []
        });
    }

    function pushUpToAndIncludingCurrentFile() {
        // Emit a file message for all previous files that did not contain
        // errors
        var index = files.indexOf(currentFile);
        files.slice(0, index).forEach(pushEmpty.bind(this));

        // Emit a file message for the current file with errors

        this.push({
            type: 'file',
            file: currentFile,
            linter: type,
            errors: fileErrors
        });

        // Assign files to the remaining files.
        files = files.slice(index + 1);

        // Reset the accumulated current file errors array.
        fileErrors = [];
    }

    function transform(errorMessage, enc, callback) {
        // currentFile is undefined for the first message received.
        if (!currentFile) {
            currentFile = errorMessage.file;
        }

        // If we've moved on to a different file, emit stream data for the
        // previous file.
        if (errorMessage.file !== currentFile) {
            pushUpToAndIncludingCurrentFile.call(this);
            currentFile = errorMessage.file;
        }

        // If the error is for the previous file, just add it to the current
        // accumulator array.
        if (errorMessage.file === currentFile) {
            fileErrors.push(errorMessage);
        }

        currentFile = errorMessage.file;
        callback();
    }

    function flush(callback) {
        if (currentFile) {
            pushUpToAndIncludingCurrentFile.call(this);
        }
        // Emit a file message for all remaining files that do not contain
        // errors
        files.forEach(pushEmpty.bind(this));

        // Terminate stream
        this.push(null);
        callback();
    }

    return through({objectMode: true}, transform, flush);
}

module.exports = makeFileStream;
