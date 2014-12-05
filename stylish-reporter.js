'use strict';
var table = require('text-table');
var process = require('process');
var isTTY = process.stdout.isTTY;
var chalk = require('chalk');

function createTableRow(message) {
    var linter = (message.linter + '   ').slice(0, 6);
    // pad number with spaces in front
    var line = ('    ' + message.line).slice(-4);
    // pad number with spaces behind
    var column = (message.column + '  ').slice(0, 3);
    var location = [line, column].join(':');

    return [
        '  ',
        message.type,
        linter,
        location,
        message.message,
        message.rule
    ];
}

function printFilePath(filePath) {
    var s = !isTTY ? filePath : chalk.underline.cyan((filePath));
    return s + '\n';
}

function printTable(data) {
    var output = '';
    if (!isTTY) {
        output = table(data) + '\n';
    } else {
        data = data.map(function colorize(row) {
            return [
                row[0],
                row[1] === 'warning' ? chalk.yellow(row[1]) : chalk.red(row[1]),
                chalk.magenta(row[2]),
                row[3],
                chalk.white(row[4]),
                chalk.yellow(row[5])
            ];
        });
        output = table(data) + '\n';
    }
    return output;
}

function printFileErrorTable(message) {
    var output = '';
    var fileTableData = message.errors.map(createTableRow);
    output += printFilePath(message.file);
    output += printTable(fileTableData);
    return output;
}

function printStylish(fileMessages) {
    isTTY = process.stdout.isTTY;
    fileMessages = fileMessages.filter(removeEmpty);

    function removeEmpty(fileMessage) {
        return fileMessage.errors.length > 0;
    }
    return fileMessages.map(printFileErrorTable).join('\n');
}

module.exports = printStylish;
