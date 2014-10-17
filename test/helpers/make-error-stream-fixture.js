'use strict';
var path = require('path');
var fs = require('fs');
var async = require('async');
var mkdirp = require('mkdirp');

// The following are strings that will produce an error for only
var baseContent = 'alert("foo");';

var disable = {
    jscs: '/* jscs: disable */',
    eslint: '/*eslint-disable */',
    jshint: '// jshint ignore: start'
};

// filename, jscs, jshint, eslint
var data = [
    ['a', 1, 0, 0],
    ['b', 0, 0, 0],
    ['c', 0, 1, 1],
    ['d', 0, 1, 0],
    ['e', 0, 0, 0],
    ['f', 0, 0, 1],
    ['g', 0, 0, 0],
    ['h', 0, 1, 0],
    ['i', 0, 0, 0],
    ['j', 0, 0, 0],
    ['k', 1, 1, 1],
    ['l', 1, 0, 1],
    ['m', 0, 0, 0],
    ['n', 0, 0, 0],
    ['o', 0, 1, 1],
    ['p', 0, 0, 0],
    ['q', 0, 0, 0],
    ['r', 0, 0, 0],
    ['s', 1, 1, 0],
    ['t', 0, 1, 1],
    ['u', 0, 0, 0],
    ['v', 0, 0, 1],
    ['w', 1, 0, 0],
    ['x', 0, 1, 1],
    ['y', 0, 0, 0],
    ['z', 0, 0, 0]
];

function createJavaScriptFixtures(destination, callback) {
    var fixtureFolder = path.resolve(destination, 'files--');
    fs.exists(fixtureFolder, function existsCallback(exists) {
        if (exists) {
            return callback(new Error('destination folder exists'));
        }
        mkdirp(fixtureFolder, function mkdirpCallback(err) {
            if (err) {
                return callback(err);
            }
            async.each(data, function writeFixture(file, done) {
                var filename = file[0] + '.js';
                var filePath = path.resolve(fixtureFolder, filename);
                var fileContent = [
                    file[1] ? '' : disable.jscs,
                    file[2] ? '' : disable.jshint,
                    file[3] ? '' : disable.eslint,
                    baseContent
                ].join('\n');
                fs.writeFile(filePath, fileContent, 'utf8', done);
            }, callback);
        });
    });
}

module.exports = createJavaScriptFixtures;
