var lint = require('./lint-stream')();
var commondir = require('commondir');
var console = require('console');
var printFileErrorTable = require('./stylish-stream-reporter');

function onError(err) {
    console.error(JSON.stringify(err, null, 2));
}

// function onRoot(root, count) {
//     if (!count) {
//         console.log('no matches found:', root);
//     }
//     console.log('count', count);
// }

// function onEnd() {
//     console.log('uberLintStream end');
// }

function run(jsfiles) {

    var dir = commondir(jsfiles);
    var uberLintStream = lint(jsfiles);
    uberLintStream.on('data', printFileErrorTable.bind(null, dir));
    //uberLintStream.on('root', onRoot);
    uberLintStream.on('error', onError);
    //uberLintStream.on('end', onEnd);
}

module.exports = run;
