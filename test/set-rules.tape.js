'use strict';
var test = require('tape');
var setRules = require('../set-rules');

test('Set Rules', function runTests(t) {
    t.plan(1);
    t.ok(setRules, 'Module exists');
});
