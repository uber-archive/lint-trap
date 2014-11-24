'use strict';
var test = require('tape');
var compactReporter = require('../compact-reporter');

test('Compact Reporter', function runTests(t) {
    t.plan(1);
    t.ok(compactReporter, 'Module exists');
});
