'use strict';
var detectIndent = require('detect-indent');
var extend = require('extend');
var path = require('path');
var fs = require('fs');
var jf = require('jsonfile');
jf.spaces = 4;

function findReferenceFile(rootPath, firstFile, callback) {
    var manifestPath = path.join(rootPath, 'package.json');
    fs.exists(manifestPath, function manifestExistsCallback(exists) {
        if (exists) {
            jf.readFile(manifestPath, function readFileCallback(err, manifest) {
                if (err) {
                    return callback(err);
                }
                var main = path.resolve(rootPath, manifest.main || 'index.js');
                callback(undefined, main);
            });
        } else {
            var indexPath = path.join(rootPath, 'index.js');
            fs.exists(indexPath, function indexExistsCallback(exists) {
                if (exists) {
                    callback(undefined, indexPath);
                } else {
                    callback(undefined, firstFile);
                }
            });
        }
    });
}

function updateJSON(jsonPath, diff, callback) {
    jf.readFile(jsonPath, function readFileCallback(err, content) {
        if (err) {
            return callback(err);
        }
        content = extend(content, diff);
        jf.writeFile(jsonPath, content, callback);
    });
}

function setIndentRule(rootPath, firstFile, callback) {
    function readFileCallback(err, content) {
        if (err) {
            return callback(err);
        }
        var indent = detectIndent(content).indent || '    ';
        var jscsrcPath = path.resolve(__dirname, './rc/.jscsrc');
        var diff = { validateIndentation: indent.length };
        updateJSON(jscsrcPath, diff, callback);
    }

    function findReferenceFileCallback(err, referenceFile) {
        if (err) {
            return callback(err);
        }
        fs.readFile(referenceFile, 'utf8', readFileCallback);
    }

    findReferenceFile(rootPath, firstFile, findReferenceFileCallback);
}

module.exports = setIndentRule;
