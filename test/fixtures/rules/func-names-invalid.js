'use strict';

// should produce eslint `func-name` error
var foo = function () {};

// should produce jscs whitespace errors
var bar = function baz () {};

module.exports = {
    foo: foo,
    bar: bar
};
