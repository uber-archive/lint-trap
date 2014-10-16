'use strict';

function getErrorType(error) {
    return (error.fatal || error.severity === 2) ? 'error' : 'warning';
}

function writeError(file, error) {
    process.stdout.write(JSON.stringify({
        type: getErrorType(error),
        linter: 'eslint',
        file: file,
        //error: error,
        line: error.line || 0,
        column: error.column || 0,
        rule: error.ruleId || '',
        message: error.message
    }));
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
