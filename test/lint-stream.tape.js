'use strict';
var lint = require('../lib/lint-stream')();
var path = require('path');
var console = require('console');
var getJavaScriptFiles = require('../lib/get-javascript-files');
var fixturesPath = path.join(__dirname, 'fixtures');
var test = require('tape');
var testResults = require(path.join(fixturesPath, 'results.json'));
require('array.prototype.find');
var rootDir = path.resolve(__dirname, '..');

test('Correct JSON Results', function(t) {
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

                var actual = streamMessages.find(function (message) {
                    return message.file === expected.file;
                });

                t.deepEqual(actual, expected,
                    path.relative(rootDir, expected.file));
            });

            //console.log(JSON.stringify(streamMessages, null, 4));
        });
    });

});