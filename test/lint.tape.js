'use strict';
var lintTrap = require('../lib/');
var path = require('path');
var console = require('console');
var getJavaScriptFiles = require('../lib/get-javascript-files');
var fixturesPath = path.join(__dirname, 'fixtures');

getJavaScriptFiles(fixturesPath, function lintFilesCallback(err, jsfiles) {
    if (err) {
        return console.error(err);
    }
    lintTrap(jsfiles);
});
