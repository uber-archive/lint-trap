'use strict';
var fmt = require('util').format;

// ==== begin attribution =====================================================
// The pairs object and encode function are borrowed from:
// github.com/jshint/jshint src/reporters/checkstyle.js
// Author: Boy Baukema, http://github.com/relaxnow
// License MIT
// This code should be replaced in a future commit of checkstyle-reporter.js
var pairs = {
    '&': '&amp;',
    '"': '&quot;',
    '\'': '&apos;',
    '<': '&lt;',
    '>': '&gt;'
};

function encode(s) {
    for (var r in pairs) {
        if (typeof s !== 'undefined') {
            s = s.replace(new RegExp(r, 'g'), pairs[r]);
        }
    }
    return s || '';
}
// ==== end attribution =======================================================

function printCheckstyle(fileMessages) {
    fileMessages = fileMessages.filter(removeEmpty);

    function removeEmpty(fileMessage) {
        return fileMessage.errors.length > 0;
    }

    return [
        '<?xml version="1.0" encoding="utf-8"?>',
        '<checkstyle version="4.3">',
        fileMessages.map(printFile).join('\n'),
        '</checkstyle>'
    ].join('\n') + '\n';
}

function printFile(message) {
    return fmt('\t<file name="%s">\n%s\n\t</file>',
        encode(message.file),
        printErrors(message)
    );
}

function printErrors(message) {
    return message.errors.map(printError).join('\n');
}

function printError(message) {
    return fmt(
        '\t\t<error line="%d" column="%d" severity="%s" ' +
                'message="%s" source="%s" />',
        message.line,
        message.column,
        message.type,
        encode(message.message),
        encode([message.linter, message.rule].join('.'))
    );
}

module.exports = printCheckstyle;
