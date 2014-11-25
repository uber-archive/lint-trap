'use strict';
var test = require('tape');
var groupFileMessagesTransform = require('../group-file-messages-transform');
var makeErrorStream = require('./helpers/make-error-stream');
var es = require('event-stream');

test('Group File Messages Transform', function runTests(t) {
    t.plan(3);
    t.ok(groupFileMessagesTransform, 'Module exists');

    var linters = ['eslint', 'jshint', 'jscs'];
    var errorStreams = linters.map(makeErrorStream);
    var mergedStream = es.merge.apply(es, errorStreams);

    mergedStream
        .pipe(groupFileMessagesTransform(linters))
        .pipe(es.writeArray(testStream));

    function testStream(err, fileErrors) {
        if (err) {
            t.fail();
        }
        t.equal(fileErrors.length, 26, 'Correct quantity of file errors');

        var pass = fileErrors.every(function checkErrorQuantity(fileMessage) {
            return fileMessage.errors.length === 3;
        });

        t.ok(pass, 'All fileError messages have 3 errors each');
    }
});
