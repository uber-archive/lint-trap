'use strict';
var test = require('tape');
var getJavaScriptFiles = require('../get-javascript-files');

test('Get Javascript Files', function runTests(t) {
    t.plan(1);
    t.ok(getJavaScriptFiles, 'Module exists');
});
