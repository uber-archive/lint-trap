'use strict';
require('array.prototype.find');
var path = require('path');
var jf = require('jsonfile');
var dotty = require('dotty');
var findParentDir = require('find-parent-dir');
var editorConfigParse = require('editorconfig/lib/ini').parse;

jf.spaces = 4;

function updateJSON(jsonPath, diffs) {
    // Synchronous method to be safe since multiple rules might touch the
    // same file.
    var content = jf.readFileSync(jsonPath);
    Object.keys(diffs).forEach(function applyDiff(diffKey) {
        var value = diffs[diffKey];
        dotty.put(content, diffKey, value);
    });
    jf.writeFileSync(jsonPath, content);
}

function setIndentRule(rootPath, callback) {
    findParentDir(rootPath, '.editorconfig', onEditorConfigDir);

    function onEditorConfigDir(err, editorConfigDir) {
        if (err) {
            return callback(err);
        }
        var editorConfigPath = path.join(editorConfigDir, '.editorconfig');
        editorConfigParse(editorConfigPath, onEditorConfigParse);
    }

    function onEditorConfigParse(parseErr, parsed) {
        if (parseErr) {
            return callback(parseErr);
        }
        var jsRules = parsed.find(function getJsRuleSet(ruleset) {
            return ruleset[0] === '*.js';
        })[1];

        if (!jsRules) {
            var noJsRuleError = new Error('No [*.js] ruleset in .editorconfig');
            return callback(noJsRuleError);
        }

        var jscsrcPath = path.resolve(__dirname, './rc/.jscsrc');
        var indent = parseInt(jsRules.indent_size, 10);
        var diff = {validateIndentation: indent};
        updateJSON(jscsrcPath, diff);
        callback();
    }
}

function setLineLengthRule(lineLength, callback) {

    var jscsrcPath = path.resolve(__dirname, './rc/.jscsrc');

    var jscsdiff = {
        'maximumLineLength.value': lineLength
    };

    updateJSON(jscsrcPath, jscsdiff);
    updateEslint();

    function updateEslint() {
        var eslintrcPath = path.resolve(__dirname, './rc/.eslintrc');
        var eslintdiff = {
            'rules.max-len': [2, lineLength, 4]
        };
        updateJSON(eslintrcPath, eslintdiff);
        callback();
    }
}

function setRules(dir, lineLength, callback) {

    setIndentRule(dir, function setIndentRuleCallback(indentErr) {
        if (indentErr) {
            return callback(indentErr);
        }

        setLineLengthRule(lineLength, function setLineLengthRuleCallback(err) {
            if (err) {
                return callback(err);
            }
            callback();
        });
    });
}

module.exports = setRules;
