'use strict';

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
    var file = errors._file._filename;
    // [ '_errorList', '_file', '_currentRule', '_verbose' ]

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
