'use strict';
var process = require('process');

function writeError(result) {
    var error = result.error;

    process.stdout.write(JSON.stringify({
        type: 'error',
        linter: 'jshint',
        file: result.file,
        error: error,
        line: error.line,
        column: error.character,
        rule: error.code,
        message: error.reason
    }));
    process.stdout.write(',');
}

function reporter(results, data, opts) {
    process.stdout.write('[');
    results.forEach(writeError);
    process.stdout.write(']');
}

module.exports = {
    reporter: reporter
};
