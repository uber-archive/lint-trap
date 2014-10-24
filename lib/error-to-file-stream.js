'use strict';
var through = require('through');

function makeFileStream(type, files) {
    /*jshint validthis:true */
    var currentFile = null;
    var fileErrors = [];

    function enqueueEmpty(file) {
        this.queue({
            type: 'file',
            file: file,
            linter: type,
            errors: []
        });
    }

    function enqueueUpToAndIncludingCurrentFile() {
        // Emit a file message for all previous files that did not contain
        // errors
        var index = files.indexOf(currentFile);
        files.slice(0, index).forEach(enqueueEmpty.bind(this));

        // Emit a file message for the current file with errors

        this.queue({
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

    function write(errorMessage) {
        // currentFile is undefined for the first message received.
        if (!currentFile) {
            currentFile = errorMessage.file;
        }

        // If we've moved on to a different file, emit stream data for the
        // previous file.
        if (errorMessage.file !== currentFile) {
            enqueueUpToAndIncludingCurrentFile.call(this);
            currentFile = errorMessage.file;
        }

        // If the error is for the previous file, just add it to the current
        // accumulator array.
        if (errorMessage.file === currentFile) {
            fileErrors.push(errorMessage);
        }

        currentFile = errorMessage.file;
    }

    function end() {
        if (currentFile) {
            enqueueUpToAndIncludingCurrentFile.call(this);
        }
        // Emit a file message for all remaining files that do not contain
        // errors
        files.forEach(enqueueEmpty.bind(this));

        // Terminate stream
        this.queue(null);
    }

    return through(write, end);
}

module.exports = makeFileStream;
