'use strict';
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
            // If no editorconfig found, swallow the error and default to 4.
            return callback();
        }
        var editorConfigPath = path.join(editorConfigDir, '.editorconfig');
        editorConfigParse(editorConfigPath, onEditorConfigParse);
    }

    function onEditorConfigParse(parseErr, parsed) {
        if (parseErr) {
            // If we can't parse .editorconfig, throw an error since there may
            // be a *.js indent rule we want to respect.
            return callback(parseErr);
        }
        var rules = getRuleset(parsed, '*.js') || getRuleset(parsed, '*');

        if (!rules || rules[0].indent_size) {
            // There is no ruleset that applies to *.js files or there is no
            // indent_size defined, don't change indent rule.
            return callback();
        }

        var jscsrcPath = path.resolve(__dirname, './rc/.jscsrc');
        var indent = parseInt(rules[0].indent_size, 10);
        var diff = {validateIndentation: indent};
        updateJSON(jscsrcPath, diff);
        callback();
    }

    function getRuleset(parsed, id) {
        return parsed.filter(function getJsRuleSet(ruleset) {
            return ruleset[0] === id;
        })[0];
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
