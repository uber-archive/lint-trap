'use strict';
var test = require('tape');
var compactReporter = require('../compact-reporter');
var makeFileErrorStream = require('./helpers/make-file-error-stream');
var es = require('event-stream');
var fs = require('fs');
var path = require('path');

test('Compact Reporter', function runTests(t) {
    t.plan(2);
    t.ok(compactReporter, 'Module exists');

    var fixture = path.join(__dirname, 'fixtures/unit/compact.stdout');

    var expectedStdout = fs.readFileSync(fixture).toString();

    makeFileErrorStream().pipe(es.writeArray(function print(err, array) {
        if (err) {
            t.fail();
        }
        t.equal(compactReporter(array), expectedStdout, 'Correct stdout');
    }));

});
