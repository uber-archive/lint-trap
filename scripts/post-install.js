'use strict';
var path = require('path');
var fs = require('fs');
var jsonfile = require('jsonfile');
var async = require('async');
var debug = require('debug')('post-install');

// Path to lint-trap
var rootPath = path.resolve(__dirname, '..');

// Linters to look for and remove
var linterNames = ['jscs', 'jshint', 'eslint'];

// Linter configuration files to remove
var linterConfigurationFiles = ['.jscsrc', '.jshintrc', '.eslintrc'];

// Linter ignore files to consolidate
// var linterIgnoreFiles = ['.jshintignore', '.eslintignore'];

/**
 * Removes linters from package.json
 *
 * @param  {Object} manifest package.json loaded as a JSON object
 * @return {Object}          modified package.json JSON object
 */
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
    var filePath = path.join(folderPath, filename);
    debug('deleting %s', filePath);
    fs.exists(filePath, function existsCallback(exists) {
        if (exists) {
            fs.unlink(filePath, done);
        } else {
            done();
        }
    });
}

function deleteLinterConfigurationFiles(repoPath, cb) {
    async.each(linterConfigurationFiles, deleteFile.bind(null, repoPath), cb);
}

function symlinkLinterConfigurationFiles(modulePath, cb) {
    var lintTrapRCFilesPath = path.resolve(rootPath, './rc/');

    async.each(linterConfigurationFiles, function symlinkFile(filename, done) {
        var target = path.resolve(lintTrapRCFilesPath, filename);
        var linkName = path.resolve(modulePath, filename);
        debug('symlink created: %s ==> %s', linkName, target);
        fs.symlink(target, linkName, done);
    }, cb);
}

// function deleteLinterIgnoreFiles(repoPath, cb) {
//     async.each(linterIgnoreFiles, deleteFile.bind(null, repoPath), cb);
// }

// function removeLintersFromManifestScripts (packageJSON) {
//   if (packageJSON.scripts) {
//     Object.keys(packageJSON.scripts).forEach(function (scriptName) {
//     });
//   }
// }

/**
 * Take a repo and remove all the linting features:
 *  - remove jshint, eslint and jscs from the package.json
 *  - remove the config files for the above linters
 *
 * @param  {String}    modulePath  file path to the repo to which lint-trap was
 *                                 installed
 * @param  {Function}  callback    callback function
 */
function cleanRepo(modulePath, callback) {
    var manifestPath = path.join(modulePath, 'package.json');

    fs.exists(manifestPath, function existsCallback(exists) {
        if (exists) {
            jsonfile.readFile(manifestPath, function cleanFile(err, manifest) {
                if (err) {
                    return callback(err);
                }
                manifest = removeDependenciesFromManifest(manifest);
                // deleteLinterConfigurationFiles(modulePath);
                // deleteLinterIgnoreFiles(modulePath);

                fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2),
                    'utf8', callback);
            });
        }
    });
}

function finished(err) {
    if (err) {
        return debug(err);
    }
    debug('finished');
}

function deleteFilesCallback(err, parentModulePath) {
    if (err) {
        return debug(err);
    }
    debug('deleted linter .rc files in %s', parentModulePath);
    symlinkLinterConfigurationFiles(parentModulePath, finished);
}

function cleanRepoCallback(err, parentModulePath) {
    if (err) {
        return debug(err);
    }
    debug('Cleaned manifest in %s', parentModulePath);
    var cb = deleteFilesCallback.bind(null, parentModulePath);
    deleteLinterConfigurationFiles(parentModulePath, cb);
}

function main() {
    // Path to which lint-trap is installed
    var parentPath = path.dirname(rootPath);
    if (path.basename(parentPath) === 'node_modules') {
        var parentModulePath = path.dirname(parentPath);
        var cb = cleanRepoCallback.bind(null, parentModulePath);
        cleanRepo(parentModulePath, cb);
    } else {
        symlinkLinterConfigurationFiles(rootPath, finished);
    }
}

main();
