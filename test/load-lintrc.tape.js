'use strict';
var test = require('tape');
var path = require('path');
var loadLintRC = require('../load-lintrc');

var fixturesPath = path.join(__dirname, './fixtures/lintrc');

test('no .lintrc files in parent folders', function tape(t) {
    t.plan(2);
    loadLintRC(path.dirname(fixturesPath), function(err, lintrc) {
        t.error(err, 'No error if no lintrc found');

        // If the following test fails, then you need to make sure there isn't
        // a lintrc in any of the parent directories that will modify the
        // results of subsequent tests.
        t.deepEqual(lintrc, {}, 'lintrc is an empty object.');
    });
});

test('single .lintrc loads correctly', function tape(t) {
    t.plan(2);

    var expectedLintRC = {
        eslint: {
            rules: {
                'func-names': 1
            }
        }
    };

    loadLintRC(fixturesPath, function(err, lintrc) {
        t.error(err, 'No error');
        t.deepEqual(lintrc, expectedLintRC, 'Correct .lintrc configuration');
    });
});

test('nested .lintrc files load correctly', function tape(t) {
    t.plan(2);

    var expectedLintRC = {
        eslint: {
            rules: {
                'func-names': 1,
                'no-underscore-dangle': 1
            }
        }
    };

    loadLintRC(path.join(fixturesPath, './subfolder'), function(err, lintrc) {
        t.error(err, 'No error');
        t.deepEqual(lintrc, expectedLintRC, 'Correct .lintrc configuration');
    });
});
