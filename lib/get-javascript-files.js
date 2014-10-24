'use strict';
var path = require('path');
var createFileStream = require('fstream-ignore');
var fs = require('fs');

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

    fs.stat(folderPath, function statCallback(err, stat) {
        if (err) {
            return callback(err);
        }
        if (stat.isDirectory()) {
            var files = [];

            var fstream = createFileStream({
                path: folderPath,
                ignoreFiles: ignoreFiles
            });

            fstream.on('child', function onChild(c) {
                var f = c.path.substr(c.root.path.length + 1);
                if (jsFileRE.test(f) && !dotGitFileRE.test(f)) {
                    files.push(f);
                }
            });

            fstream.on('end', function onEnd() {
                files = files.map(function expandFilePath(f) {
                    return path.resolve(folderPath, f);
                });

                callback(null, files);
            });

            fstream.on('error', callback);
        } else {
            callback(null, folderPath);
        }
    });
}

module.exports = getJavaScriptFiles;
