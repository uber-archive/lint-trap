'use strict';
var test = require('tape');
var attenuateSeverity = require('../attenuate-severity');

test('attenuate severity in single file with single lintrc', function tape(t) {
    t.plan(1);

    var lintrc = {
        eslint: {
            'func-names': false
        }
    };

    var message = {
        type: 'error',
        linter: 'eslint',
        rule: 'func-names',
        severity: 'error'
    };

    attenuateSeverity(message, lintrc);
    t.equal(message.type, 'warning', 'Downgraded severity to warning');
});
