'use strict';
var test = require('tape');
var attenuateSeverity = require('../attenuate-severity');

test('attenuate severity in single file with single lintrc', function tape(t) {
    t.plan(2);

    var lintrc = {
        eslint: {
            'func-names': false
        }
    };

    var messageA = {
        type: 'error',
        linter: 'eslint',
        rule: 'func-names',
        severity: 'error'
    };

    attenuateSeverity(messageA, lintrc);
    t.equal(messageA.type, 'warning', 'Downgraded severity to warning');

    var messageB = {
        type: 'error',
        linter: 'eslint',
        rule: 'not-func-names',
        severity: 'error'
    };

    attenuateSeverity(messageB, lintrc);
    t.equal(messageB.type, 'error', 'Did not downgrade severity to warning');
});
