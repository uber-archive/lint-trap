'use strict';
var path = require('path');
var fs = require('fs');
var test = require('tape');

var execFile = require('child_process').execFile;

var fixturesPath = path.join(__dirname, 'fixtures');
var binPath = path.resolve(__dirname, '../bin/lint-trap.js');

var expectedStdoutPath = path.join(fixturesPath, 'rules.stdout');
var expectedStdout = fs.readFileSync(expectedStdoutPath, 'utf8');

test('Command Line Interface w/ lint errors', function testCLI(t) {
    t.plan(4);

    var args = [fixturesPath];
    var opts = {};

    execFile(binPath, args, opts, function callback(err, stdout, stderr) {
        t.ok(err, 'Non-zero exit');
        t.equal(err.code, 1, 'Returned error code 1');
        t.equal(stderr, '', 'No output on stderr');
        t.equal(stdout, expectedStdout, 'Correct output on stdout');
    });
});

test('Command Line Interface w/o lint errors', function testCLI(t) {
    t.plan(2);

    var args = [path.join(fixturesPath, './rules/globals-valid.js')];
    var opts = {};

    execFile(binPath, args, opts, function callback(err, stdout, stderr) {
        if (err) {
            t.fail(err);
        }

        t.equal(stderr, '', 'No output on stderr');
        t.equal(stdout, '', 'No output on stdout');
    });
});
