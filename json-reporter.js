'use strict';

function printJSON(fileMessages) {
    fileMessages = fileMessages.filter(removeEmpty);

    function removeEmpty(fileMessage) {
        return fileMessage.errors.length > 0;
    }

    var json = {
        files: fileMessages
    };

    return JSON.stringify(json, null, 4) + '\n';
}

module.exports = printJSON;
