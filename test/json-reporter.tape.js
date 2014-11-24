'use strict';
var test = require('tape');
var jsonReporter = require('../json-reporter');

test('JSON Reporter', function runTests(t) {
    t.plan(1);
    t.ok(jsonReporter, 'Module exists');
});
