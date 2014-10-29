'use strict';

function attenuateSeverity(message, lintrc) {

    var typeRules = lintrc[message.linter];
    if (typeRules) {
        if (typeRules[message.rule] === false) {
            message.type = 'warning';
        }
    }
}

module.exports = attenuateSeverity;
