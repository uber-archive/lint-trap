#!/usr/bin/env node
'use strict';
var execFile = require('child_process').execFile;
var which = require('npm-which');
var argv = require('minimist')(process.argv.slice(2));
var async = require('async');
var path = require('path');

// console.dir(argv);

// console.log(which.sync('jshint'));
// console.log(which.sync('eslint'));
// console.log(which.sync('jscs'));

var linterConfigs = {
    jscs: {
        config: {
            flag: '--config',
            value: path.resolve(__dirname, '../lib/rc/.jscsrc')
        }
    },
    jshint: {
        config: {
            flag: '--config',
            value: path.resolve(__dirname, '../lib/rc/.jshintrc')
        }
    },
    eslint: {
        config: {
            flag: '--config',
            value: path.resolve(__dirname, '../lib/rc/.eslintrc')
        }
    }
};

async.eachSeries(['jscs', 'jshint', 'eslint'], function (linterName, done) {
    which(linterName, function (err, binPath) {

        var args = [
            linterConfigs[linterName].config.flag,
            linterConfigs[linterName].config.value,
        ];

        if (linterName === 'jscs') {
            args.push('--reporter');
            args.push(path.resolve(__dirname, '../lib/reporters/jscs.js'));
        }

        args = args.concat(argv._);

        var opts = {};

        execFile(binPath, args, opts, function (err, stdout, stderr) {
            //if (err) { return done(err); }

            //console.log(linterName);
            if (stdout.length > 0 && stdout !== 'No code style errors found.\n') {
                console.log(stdout);
            }
            if (stderr.length > 0) {
                console.log(stderr);
            }

            done();
        });
    });
}, function (err) {
    if (err) { return console.log(err); }
    process.exit(0);
});
