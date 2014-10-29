'use strict';

var test = require('tape');
var execFile = require('child_process').execFile;
var path = require('path');
var fs = require('fs');

var binPath = path.resolve(__dirname, '../bin/lint-trap.js');
var lintrcFixture = path.resolve(__dirname, './fixtures/lintrc');

test('lintrc file allows downgrading errors to warnings', function tape(t) {
    t.plan(3);

    var args = [path.join(lintrcFixture, './fixture.js')];
    var opts = {};

    var expectedStdoutPath = path.resolve(lintrcFixture, './fixture.stdout');
    var expectedStdout = fs.readFileSync(expectedStdoutPath, 'utf8');

    execFile(binPath, args, opts, function cb(err, stdout, stderr) {
        t.error(err, 'No error code');
        t.equal(stdout, expectedStdout, 'Errors reduced to warnings');
        t.equal(stderr, '', 'No output on stdout');
    });
});

test('lintrc file allows downgrading errors to warnings', function tape(t) {
    t.plan(4);

    var args = [lintrcFixture];
    var opts = {};
    var expectedStdoutPath = path.resolve(lintrcFixture, './output.stdout');
    var expectedStdout = fs.readFileSync(expectedStdoutPath, 'utf8');

    execFile(binPath, args, opts, function cb(err, stdout, stderr) {
        t.ok(err, 'Error');
        t.equal(err.code, 1, 'Error code is 1');
        t.equal(stdout, expectedStdout, 'Errors reduced to warnings');
        t.equal(stderr, '', 'No output on stdout');
    });
});
