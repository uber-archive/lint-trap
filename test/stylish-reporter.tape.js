'use strict';
var test = require('tape');
var stylishReporter = require('../stylish-reporter');

test('Stylish Reporter', function runTests(t) {
    t.plan(1);
    t.ok(stylishReporter, 'Module exists');
});
