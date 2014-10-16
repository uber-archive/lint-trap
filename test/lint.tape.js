var uberLint = require('../lib/');
var path = require('path');
var console = require('console');
var getJavaScriptFiles = require('./helpers/get-javascript-files');
var fixturesPath = path.join(__dirname, 'fixtures');

getJavaScriptFiles(fixturesPath, function lintFilesCallback(err, jsfiles) {
    if (err) {
        return console.error(err);
    }
    uberLint(jsfiles);
});
