'use strict';
var process = require('process');

function writeError(file, error) {
    //console.log(errors.explainError(error, true) + '\n');
    process.stdout.write(JSON.stringify({
        type: 'error',
        linter: 'jscs',
        file: file,
        error: error,
        line: error.line,
        column: error.column,
        rule: error.rule,
        message: error.message
    }));
    process.stdout.write(',');
}

function writeFileErrors(errors) {
    /*eslint-disable */
    var file = errors._file._filename;
    // [ '_errorList', '_file', '_currentRule', '_verbose' ]
    /*eslint-enable */

    if (!errors.isEmpty()) {
        errors.getErrorList().forEach(writeError.bind(null, file));
    }
}

function reporter(results) {
    process.stdout.write('[');
    results.forEach(writeFileErrors);
    process.stdout.write(']');
}

module.exports = reporter;
