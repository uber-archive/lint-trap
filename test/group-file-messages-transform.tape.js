'use strict';
var test = require('tape');
var groupFileMessagesTransform = require('../group-file-messages-transform');

test('Group File Messages Transform', function runTests(t) {
    t.plan(1);
    t.ok(groupFileMessagesTransform, 'Module exists');
});
