'use strict';
var makeErrorStream = require('./make-error-stream');
var groupFileMessagesTransform = require('../../group-file-messages-transform');
var es = require('event-stream');

function makeFileErrorStream() {
    var linters = ['eslint', 'jshint', 'jscs'];
    var errorStreams = linters.map(makeErrorStream);
    var mergedStream = es.merge.apply(es, errorStreams);

    return mergedStream
        .pipe(groupFileMessagesTransform(linters));
}

module.exports = makeFileErrorStream;
