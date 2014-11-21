'use strict';
var test = require('tape');
var errorMeter = require('../error-meter');

test('Error Meter Spy Stream', function runTests(t) {
    t.plan(1);
    t.ok(errorMeter, 'Module exists');
});
