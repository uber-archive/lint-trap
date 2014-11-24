'use strict';
var through = require('through2');
var loadLintRC = require('./load-lintrc');
var attenuateSeverity = require('./attenuate-severity');

function makeSeverityTransform() {

    function transform(message, enc, callback) {

        loadLintRC(message.file, function loadLintRCCallback(err, lintrc) {
            if (err) {
                return callback(err);
            }
            attenuateSeverity(message, lintrc);
            this.push(message);
            callback();
        }.bind(this));
    }
    return through.obj(transform);
}

module.exports = makeSeverityTransform;
