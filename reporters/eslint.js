'use strict';
var process = require('process');

function getErrorType(error) {
    return (error.fatal || error.severity === 2) ? 'error' : 'warning';
}

function writeError(file, error) {
    process.stdout.write(JSON.stringify({
        type: getErrorType(error),
        linter: 'eslint',
        file: file === '<text>' ? 'stdin' : file,
        line: error.line || 0,
        column: error.column || 0,
        rule: error.ruleId || '',
        message: error.message
    }));
    // if (index !== array.length - 1) {
    //     process.stdout.write(',');
    // }
    process.stdout.write(',');
}

function writeFileErrors(fileErrors) {
    fileErrors.messages.forEach(writeError.bind(null, fileErrors.filePath));
}

function reporter(results) {
    process.stdout.write('[');
    results.forEach(writeFileErrors);
    process.stdout.write(']');
    return '';
}

module.exports = reporter;
