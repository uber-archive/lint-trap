'use strict';
var table = require('text-table');
var console = require('console');
var path = require('path');
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
        message.message
    ];
}

function printFilePath(filePath) {
    console.log(!isTTY ? filePath : chalk.underline.cyan((filePath)));
}

function printTable(data) {
    if (!isTTY) {
        console.log(table(data) + '\n');
    } else {
        data = data.map(function colorize(row) {
            return [
                row[0],
                chalk.red(row[1]),
                chalk.magenta(row[2]),
                row[3],
                chalk.white(row[4])
            ];
        });
        console.log(table(data) + '\n');
    }
}

function printFileErrorTable(dir, message) {
    if (message.type === 'file') {
        var fileTableData = message.errors.map(createTableRow);
        var relativeFilePath = path.relative(dir, message.file);
        if (fileTableData.length > 0) {
            printFilePath(relativeFilePath);
            printTable(fileTableData);
        }
    }
}

module.exports = printFileErrorTable;
