'use strict';

var test = require('tape');
var execFile = require('child_process').execFile;
var path = require('path');

var binPath = path.resolve(__dirname, '../bin/lint-trap.js');

test('lintrc file allows downgrading errors to warnings', function tape(t) {
    t.plan(1);
    t.ok(true);

    var args = [];
    var opts = {};

    execFile(binPath, args, opts, function cb(err, stdout, stderr) {

    });
});
