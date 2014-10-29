'use strict';
var test = require('tape');
var errorsToFilesTransformStream = require('../error-to-file-transform');

test('Error Messages to File Messages Transform Stream', function runTests(t) {
    t.plan(1);
    t.ok(errorsToFilesTransformStream, 'Transform Function exists');
});
