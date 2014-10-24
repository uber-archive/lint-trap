'use strict';
var through = require('through');

/**
 * Through stream that takes messages with all the errors on a per linter and
 * per file basis and when if receives all the file error messages from all
 * linters, it emits a consolidated file error message.
 *
 * e.g. given 3 linters X, Y and Z and 3 files A, B and C, this takes the
 * following 9 input messages:
 *   XA, XB, XC, YA, YB, YC, ZA, ZB, ZC
 *
 * ... and returns a stream that emits the following 3 messages:
 *   A[XYZ], B[XYZ], C[XYZ]
 *
 * @param  {[type]} linters [description]
 * @return {[type]}         [description]
 */
function clusterFileMessages(linters) {
    /*jshint validthis:true */

    var fileMessages = {};

    function write(message) {

        function acc(memo, fileMessage) {
            return memo.concat(fileMessage.errors);
        }

        if (fileMessages[message.file]) {
            fileMessages[message.file].push(message);

            if (fileMessages[message.file].length === linters.length) {

                var allFileErrors = fileMessages[message.file].reduce(acc, []);

                this.queue({
                    type: 'file',
                    file: message.file,
                    errors: allFileErrors
                });

                delete fileMessages[message.file];
            }
        } else {
            fileMessages[message.file] = [message];
        }
    }

    function end() {
        this.queue(null);
    }

    return through(write, end);
}

module.exports = clusterFileMessages;
