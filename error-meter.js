'use strict';
var spy = require('through2-spy');
var extend = require('xtend');

function only(severity) {
    return function filter(msg) {
        return msg.type === severity;
    };
}

function makeErrorMeter() {

    var metrics = {
        errorCode: 0,
        errorCount: 0,
        warningCount: 0
    };

    var errors = only('error');
    var warnings = only('warning');

    function observer(message) {
        metrics.errorCount += message.errors.filter(errors).length;
        metrics.warningCount += message.errors.filter(warnings).length;
    }

    function getMetrics() {
        if (metrics.errorCount > 0) {
            metrics.errorCode = 1;
        }
        return extend(metrics);
    }

    var s = spy.obj(observer);

    s.on('finish', function onFinish() {
        s.emit('end');
    });

    return {
        meter: s,
        getMetrics: getMetrics
    };
}

module.exports = makeErrorMeter;
