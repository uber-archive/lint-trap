'use strict';
var path = require('path');
var findParentDir = require('find-parent-dir');
var fs = require('fs');
var DeepMerge = require("deep-merge");
var extend = require('xtend');
var jf = require('jsonfile');

var merge = DeepMerge(function mergeStrategy(target, source, key) {
    return [].concat(target, source)
});

function loadSeverityConfig(folder, callback) {

    findParentDir(folder, '.lintrc', function findCallback(err, dir) {
        if (err) {
            return callback(err);
        }

        if (!dir) {
            return callback(null, {});
        }

        jf.readFile(path.join(dir, '.lintrc'), function(err, config) {
            var parent = path.dirname(dir);

            // null condition
            if (parent === '.' || parent === '/') {
                return callback(null, config);
            }

            // recurse
            loadSeverityConfig(parent, function(err, parentConfig) {
                if (err) {
                    return callback(err);
                }

                callback(null, merge(parentConfig, config));
            });
        });
    });
}

module.exports = loadSeverityConfig;
