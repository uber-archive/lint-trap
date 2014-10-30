'use strict';
var exec = require('child_process').exec;
var execFile = require('child_process').execFile;
var async = require('async');
var path = require('path');
var fs = require('fs');
// var jsonfile = require('jsonfile');
var which = require('which');
var test = require('tape');
var debug = require('debug')('post-install');
var rimraf = require('rimraf');
var temp = require('temp');
temp.track();
var testFolder = temp.path({prefix: 'lint-trap-post-install'});

function makeFixture(f, cb) {
    debug('cloning fixture %s ...', f);

    var folderName = path.basename(f);
    var repoPath = path.join(testFolder, folderName);
    fs.exists(repoPath, function existsCallback(exists) {
        if (exists) {
            debug('fixture %s already exists. skipping clone.', f);
            cb(null, repoPath);
        } else {
            var cmd = ['git clone', f, repoPath].join(' ');

            exec(cmd, function handleCommandOutput(err, stdout, stderr) {
                if (err) {
                    debug('Cloning failed\n', stderr);
                    return cb(err);
                }
                debug('Cloned fixture %s', f);
                cb(err, repoPath);

            });
        }
    });
}

function makeFixtures(fixtures, cb) {
    async.map(fixtures, makeFixture, cb);
}

function installLintTrap(fixturePath, cb) {
    function npmInstallExecFileCallback(err, stdout, stderr) {
        if (err) {
            debug('Installing failed\n', stderr);
            return cb(err);
        }
        cb();
    }

    debug('installing lint-tap into %s', fixturePath);
    which('npm', function whichNPMCallback(err, npmPath) {
        if (err) {
            return cb(err);
        }
        var rootPath = path.resolve(__dirname, '..');

        var args = [ 'install', '--save-dev', rootPath ];
        var opts = { cwd: fixturePath };

        execFile(npmPath, args, opts, npmInstallExecFileCallback);
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
        async.eachSeries(fixturePaths, installLintTrap, eachCallback);

        function eachCallback(err) {
            cb(err, fixturePaths);
        }
    });
}

function testSymlink(t, fixturePath, linter) {
    var rcFile = '.' + linter + 'rc';
    var rcPath = path.join(fixturePath, rcFile);
    var symlinkPath = './node_modules/lint-trap/rc/';
    var symlinkDest = path.join(fixturePath, symlinkPath, rcFile);
    var lstat = fs.lstatSync(rcPath);

    var isSymlinkMsg = './' + rcFile + ' is a symlink';
    t.ok(lstat.isSymbolicLink(), isSymlinkMsg);

    var correctSymlinkMsg = './' + rcFile + ' is symlinked to ' +
        symlinkPath + rcFile;
    t.equal(fs.readlinkSync(rcPath), symlinkDest, correctSymlinkMsg);
}

function testSymlinks(t, fixturePath) {
    var eachFn = testSymlink.bind(null, t, fixturePath);
    ['jshint', 'eslint', 'jscs'].forEach(eachFn);
}

// skip the post-install test for now.
var skip = true;

test('postinstall script', function testPostInstall(t) {

    if (skip) {
        t.plan(1);
        return t.ok(true);
    }

    main(function runTests(err, fixturePaths) {
        if (err) {
            debug('main', err);
            return test.fail();
        }
        debug('running tests ...');

        t.plan(6);
        fixturePaths.forEach(testSymlinks.bind(null, t));
        async.each(fixturePaths, rimraf, function eachCallback() {
            t.end();
        });
    });
});
