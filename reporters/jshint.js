'use strict';
var process = require('process');

function writeError(result) {
    var error = result.error;

    // JSHint gives no option to disable rule W002. Just skip it here.
    // Hack. sad. :(
    if (error.code !== 'W002') {
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
}

function reporter(results, data, opts) {
    process.stdout.write('[');
    results.forEach(writeError);
    process.stdout.write(']');
}

module.exports = {
    reporter: reporter
};
