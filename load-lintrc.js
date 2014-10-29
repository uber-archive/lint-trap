'use strict';
var path = require('path');
var findParentDir = require('find-parent-dir');
var jf = require('jsonfile');
var async = require('async');
var deepExtend = require('deep-extend');

var memoizedReadJSONFile = async.memoize(jf.readFile);

function loadSeverityConfig(folder, callback) {

    findParentDir(folder, '.lintrc', function findCallback(err, dir) {
        if (err) {
            return callback(err);
        }

        if (!dir) {
            return callback(null, {});
        }

        function readJSONCallback(err, config) {
            if (err) {
                return callback(err);
            }
            var parent = path.dirname(dir);

            // null condition
            if (parent === '.' || parent === '/') {
                return callback(null, config);
            }

            function recurCallback(err, parentConfig) {
                if (err) {
                    return callback(err);
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
