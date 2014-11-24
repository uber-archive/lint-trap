'use strict';
var test = require('tape');
var lintTrap = require('../lint-trap');

test('Lint Trap', function runTests(t) {
    t.plan(1);
    t.ok(lintTrap, 'Module exists');
});
