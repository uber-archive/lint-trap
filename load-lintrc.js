'use strict';
var path = require('path');
var findParentDir = require('find-parent-dir');
var jf = require('jsonfile');
var async = require('async');
var deepExtend = require('deep-extend');

var memoizedReadJSONFile = async.memoize(jf.readFile);

function loadSeverityConfig(folder, callback) {

    findParentDir(folder, '.lintrc', function findCallback(findErr, dir) {
        if (findErr) {
            return callback(findErr);
        }

        if (!dir) {
            return callback(null, {});
        }

        function readJSONCallback(jsonErr, config) {
            if (jsonErr) {
                return callback(jsonErr);
            }
            var parent = path.dirname(dir);

            // null condition
            if (parent === '.' || parent === '/') {
                return callback(null, config);
            }

            function recurCallback(recurErr, parentConfig) {
                if (recurErr) {
                    return callback(recurErr);
                }

                callback(null, deepExtend(parentConfig, config));
            }

            // recurse
            loadSeverityConfig(parent, recurCallback);
        }

        memoizedReadJSONFile(path.join(dir, '.lintrc'), readJSONCallback);
    });
}

module.exports = async.memoize(loadSeverityConfig);
