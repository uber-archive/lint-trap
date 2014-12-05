'use strict';
var test = require('tape');
var jsonReporter = require('../json-reporter');
var makeFileErrorStream = require('./helpers/make-file-error-stream');
var es = require('event-stream');
var fs = require('fs');
var path = require('path');

test('JSON Reporter', function runTests(t) {
    t.plan(2);
    t.ok(jsonReporter, 'Module exists');

    var fixture = path.join(__dirname, 'fixtures/unit/json.stdout');

    var expectedStdout = fs.readFileSync(fixture).toString();

    makeFileErrorStream().pipe(es.writeArray(function print(err, array) {
        if (err) {
            t.fail();
        }

        t.equal(jsonReporter(array), expectedStdout, 'Correct stdout');
    }));

});
