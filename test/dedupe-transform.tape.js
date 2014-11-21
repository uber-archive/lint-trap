'use strict';
var test = require('tape');
var es = require('event-stream');
var dedupeTransformStream = require('../dedupe-transform');
var dedupeMap = require('../dupe-map.json');
var partial = require('partial');

function makeFixture(expected) {
    return Object.keys(dedupeMap).map(partial(makeFileErrorObject, expected));
}

function makeFileErrorObject(expected, key, index, array) {
    var errorToKeep = key.split('.');
    var errorToRemove = dedupeMap[key].split('.');
    var errors = [
        errorToRemove,
        errorToKeep,
        ['jscs', 'unique-rule'],
        ['eslint', 'unique-rule'],
        ['eslint', 'unique-rule']
    ].map(makeError);

    return {
        file: String.fromCharCode(97 + index) + '.js',
        errors: expected ? errors.slice(1) : errors
    };
}

function makeError(error) {
    return {
        linter: error[0],
        rule: error[1]
    };
}

test('Error Messages to File Messages Transform Stream', function runTests(t) {
    t.plan(2);
    t.ok(dedupeTransformStream, 'Transform Function exists');
    var fileErrors = makeFixture();

    es.readArray(fileErrors)
        .pipe(dedupeTransformStream())
        .pipe(es.writeArray(collectOutput));

    function collectOutput(err, actualErrors) {
        if (err) {
            return t.fail(err.message);
        }
        var expectedErrors = makeFixture(true);
        t.deepEqual(actualErrors, expectedErrors);
    }
});
