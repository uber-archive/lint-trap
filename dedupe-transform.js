'use strict';
var through = require('through2');
var dedupeMap = require('./dupe-map.json');
var partial = require('partial');

function findPossibleDupes(memo, error, index, array) {
    var key = [error.linter, error.rule].join('.');
    var duplicate = dedupeMap[key];
    if (duplicate) {
        if (!memo[error.line]) {
            memo[error.line] = {};
        }
        memo[error.line][duplicate] = key;
    }

    return memo;
}

function dedupe(possibleDupes, error, index, array) {
    var isDupe = false;
    var maybeDupes = possibleDupes[error.line];
    var key = [error.linter, error.rule].join('.');
    if (maybeDupes) {
        isDupe = maybeDupes[key] &&
            dedupeMap[maybeDupes[key]] &&
            error.linter !== 'eslint';
    }
    isDupe = !!isDupe;
    return !isDupe;
}

function makeDedupeTransform() {
    /*jshint validthis:true */

    function transform(fileMessage, enc, callback) {

        var possibleDupes = fileMessage.errors.reduce(findPossibleDupes, {});

        fileMessage.errors = fileMessage.errors
                                .filter(partial(dedupe, possibleDupes));

        this.push(fileMessage);
        callback();
    }

    return through.obj(transform);
}

module.exports = makeDedupeTransform;
