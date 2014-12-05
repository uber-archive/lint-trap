'use strict';
var path = require('path');
var jf = require('jsonfile');
var partial = require('partial');
var es = require('event-stream');
var makeFileStream = require('../../error-to-file-transform');

var eslintrc = jf.readFileSync(path.join(__dirname, '../../rc/.eslintrc'));
var jshintrc = jf.readFileSync(path.join(__dirname, '../../rc/.jshintrc'));
var jscsrc = jf.readFileSync(path.join(__dirname, '../../rc/.jscsrc'));

var rules = {
    eslint: Object.keys(eslintrc.rules),
    jscs: Object.keys(jscsrc),
    jshint: Object.keys(jshintrc)
};

rules.jshint = rules.jshint.slice(1, rules.jshint.indexOf('globals'));

function makeFiles() {
    // one more than the quantity you want.
    return Array(26 + 1).join(' ').split('').map(filename);
}

function filename(value, index) {
    return String.fromCharCode(97 + index) + '.js';
}

function isOdd(num) {
    return num % 2;
}

function makeError(linter, filename, index, array) {
    return {
        type: isOdd(index) ? 'error' : 'warning',
        linter: linter,
        file: filename,
        line: index,
        column: index,
        rule: rules[linter][index % rules[linter].length],
        message: rules[linter][index % rules[linter].length] + ' message'
    };
}

function makeErrorStream(linter) {
    var files = makeFiles();
    var errorsArray = files.map(partial(makeError, linter));
    return es.readArray(errorsArray).pipe(makeFileStream(linter, files));
}

module.exports = makeErrorStream;
