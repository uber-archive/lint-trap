'use strict';
var test = require('tape');
var severityTransform = require('../severity-transform');

test('Severity Transform', function runTests(t) {
    t.plan(1);
    t.ok(severityTransform, 'Module exists');
});
