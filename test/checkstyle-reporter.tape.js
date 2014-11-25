'use strict';
var test = require('tape');
var checkstyleReporter = require('../checkstyle-reporter');
var makeFileErrorStream = require('./helpers/make-file-error-stream');
var es = require('event-stream');
var fs = require('fs');
var path = require('path');

test('Checkstyle Reporter', function runTests(t) {
    t.plan(2);
    t.ok(checkstyleReporter, 'Module exists');

    var fixture = path.join(__dirname, 'fixtures/unit/checkstyle.stdout');

    var expectedStdout = fs.readFileSync(fixture).toString();

    makeFileErrorStream().pipe(es.writeArray(function print(err, array) {
        if (err) {
            t.fail();
        }

        t.equal(checkstyleReporter(array), expectedStdout, 'Correct stdout');
    }));

});
