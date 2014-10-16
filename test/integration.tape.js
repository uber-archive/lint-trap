'use strict';

//var test = require('tape');
var exec = require('child_process').exec;
var execFile = require('child_process').execFile;
var async = require('async');
var path = require('path');
var fs = require('fs');
var jsonfile = require('jsonfile');
var createFileStream = require('fstream-ignore');

var linterNames = ['jscs', 'jshint', 'eslint'];
var linterConfigurationFiles = ['.jscsrc', 'jshintrc', '.eslintrc'];
var linterIgnoreFiles = ['.jshintignore', '.eslintignore'];

function removeDependenciesFromManifest(manifest) {
    linterNames.forEach(function removeDependencies(ln) {
        if (manifest.dependencies[ln]) {
            delete manifest.dependencies[ln];
        }

        if (manifest.devDependencies[ln]) {
            delete manifest.devDependencies[ln];
        }
    });
    return manifest;
}

function deleteFile(folderPath, filename, done) {
    var filenamePath = path.join(folderPath, filename);
    fs.unlink(filenamePath, done);
}

function deleteLinterConfigurationFiles(repoPath, cb) {
    async.each(linterConfigurationFiles, deleteFile.bind(null, repoPath), cb);
}

function deleteLinterIgnoreFiles(repoPath, cb) {
    async.each(linterIgnoreFiles, deleteFile.bind(null, repoPath), cb);
}

/**
 * Take a repo and remove all the linting features:
 *  - remove jshint, eslint and jscs from the package.json
 *  - remove the config files for the above linters
 *
 * @param  {[type]}   repoPath
 * @param  {Function} cb
 * @return {[type]}
 */
function cleanRepo(repoPath, cb) {
    console.log('Cleaning fixture at', repoPath, '...');
    var packagePath = path.join(repoPath, 'package.json');

    jsonfile.readFile(packagePath, function cleanFile(err, manifest) {
        if (err) {
            return cb(err);
        }
        //removeDependenciesFromManifest(manifest);
        //deleteLinterConfigurationFiles(repoPath);
        //deleteLinterIgnoreFiles(repoPath);
        cb();
    });
}

// function removeLintersFromManifestScripts (packageJSON) {
//   if (packageJSON.scripts) {
//     Object.keys(packageJSON.scripts).forEach(function (scriptName) {

//       if (packageJSON.scripts[scriptName].indexOf())
//     });

//     if ()
//   }
// }

function makeFixture(f, cb) {
    console.log('Cloning fixture', f, '...');

    var folderName = path.basename(f);
    var repoPath = path.join(__dirname, 'fixtures', folderName);
    fs.exists(repoPath, function(exists) {
        if (exists) {
            cb(null, repoPath);
        } else {
            var cmd = ['git clone', f, repoPath].join(' ');

            exec(cmd, function handleCommandOutput(err, stdout, stderr) {
                if (err) {
                    console.log('Cloning failed\n', stderr);
                    return cb(err);
                }
                console.log('Cloned fixture', f);
                cleanRepo(repoPath, function(err){
                    cb(err, repoPath);
                });
            });
        }
    });


}

function makeFixtures(fixtures, cb) {
    async.map(fixtures, makeFixture, cb);
}

function lintFixture(fixturePath, cb) {
    var binPath = path.join(__dirname, '..', 'bin', 'uber-lint');

    var jsfiles = [];

    var fstream = createFileStream({
        path: fixturePath,
        ignoreFiles: [ '.gitignore', '.jshintignore', '.eslintignore', '.jscsignore' ]
    });

    fstream.on('child', function(c) {
        jsfiles.push(c.path.substr(c.root.path.length + 1));
    });

    fstream.on('end', function() {
        jsfiles = jsfiles.filter(function(f) {
            return /\.js$/.test(f) && !/^\.git/.test(f);
        });

        execFile(binPath, jsfiles, { cwd: fixturePath }, function handleCommandOutput(err, stdout, stderr) {
            if (err) {
                console.log('Linting failed\n', stderr);
                return cb(err);
            }
            console.log(stdout);
        });
    });
}

function main(cb) {
    var fixtures = [
        'git@github.com:uber/sirvice.git'
    ];

    makeFixtures(fixtures, function lintFixtures(err, fixturePaths) {
        if (err) {
            return cb(err);
        }
        console.log('Finished making fixtures');
        console.log('Linting fixtures ...');
        async.eachSeries(fixturePaths, lintFixture, cb);
    });
}

main(function foo(err) {
    if (err) {
        console.log('foo', err);
        return process.exit(1);
    }
    console.log('FINISHED');
    process.exit(0);
});
