'use strict';
var path = require('path');
var createFileStream = require('fstream-ignore');

var jsFileRE = /\.js$/;
var ignoreFiles = [
    '.lintignore',
    '.gitignore',
    '.jshintignore',
    '.eslintignore',
    '.jscsignore'
];

var dotGitFileRE = /^\.git/;

function getJavaScriptFiles(folderPath, callback) {

    var files = [];

    var fstream = createFileStream({
        path: folderPath,
        ignoreFiles: ignoreFiles
    });

    fstream.on('child', function(c) {
        files.push(c.path.substr(c.root.path.length + 1));
    });

    fstream.on('end', function() {
        files = files.filter(function(f) {
            return jsFileRE.test(f) && !dotGitFileRE.test(f);
        });

        files = files.map(function(f) {
            return path.resolve(folderPath, f);
        });

        callback(null, files);
    });

    fstream.on('error', callback);
}

module.exports = getJavaScriptFiles;
