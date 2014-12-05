'use strict';
var test = require('tape');
var stylishReporter = require('../stylish-reporter');
var makeFileErrorStream = require('./helpers/make-file-error-stream');
var es = require('event-stream');
var fs = require('fs');
var path = require('path');
var process = require('process');

test('Stylish Reporter', function runTests(t) {
    t.plan(2);
    t.ok(stylishReporter, 'Module exists');

    var fixture = path.join(__dirname, 'fixtures/unit/stylish.stdout');

    var expectedStdout = fs.readFileSync(fixture).toString();

    makeFileErrorStream().pipe(es.writeArray(function print(err, array) {
        if (err) {
            t.fail();
        }

        process.stdout.isTTY = false;
        t.equal(stylishReporter(array), expectedStdout, 'Correct stdout');
    }));
});
