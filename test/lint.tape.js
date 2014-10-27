'use strict';
require('array.prototype.find');
var lint = require('../lint-stream')();
var path = require('path');
var getJavaScriptFiles = require('../get-javascript-files');
var fixturesPath = path.join(__dirname, 'fixtures');
var test = require('tape');
var testResults = require(path.join(fixturesPath, 'rules.json'));
var rootDir = path.resolve(__dirname, '..');

test('lint-trap JSON stream results', function testStream(t) {
    t.plan(testResults.length +  1);

    getJavaScriptFiles(fixturesPath, function lintFilesCallback(err, jsfiles) {
        if (err) {
            return t.fail(err);
        }
        var streamMessages = [];
        var uberLintStream = lint(jsfiles);

        uberLintStream.on('data', streamMessages.push.bind(streamMessages));

        uberLintStream.on('error', t.fail.bind(t));

        uberLintStream.on('end', function onEnd() {

            t.equal(streamMessages.length, testResults.length,
                'Correct number of lint messages');

            testResults.forEach(function checkTestResult(expected) {

                var actual = streamMessages.find(function match(message) {
                    return message.file === expected.file;
                });

                t.deepEqual(actual, expected,
                    path.relative(rootDir, expected.file));
            });

        });
    });

});
