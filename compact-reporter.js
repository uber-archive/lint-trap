'use strict';
var fmt = require('util').format;

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.substr(1);
}

function printCompact(fileMessages) {

    var output = [];

    fileMessages.forEach(function printFile(fileMessage) {

        fileMessage.errors.forEach(printError);

        function printError(error) {
            output.push(fmt('%s: line %d, col %d, %s - %s (%s)',
                fileMessage.file,
                error.line,
                error.column,
                capitalize(error.type),
                error.message,
                [error.linter, error.rule].join('.')
            ));
        }
    });

    return output.join('\n') + '\n';
}

module.exports = printCompact;
