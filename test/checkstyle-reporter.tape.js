'use strict';
var test = require('tape');
var checkstyleReporter = require('../checkstyle-reporter');

test('Checkstyle Reporter', function runTests(t) {
    t.plan(1);
    t.ok(checkstyleReporter, 'Module exists');
});
