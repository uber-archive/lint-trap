# no-extend-native

    "no-extend-native": 2

Extending native prototype or mutating them in any way is banned. Native
prototype mutation is a terrible idea and breaks the npm modularity system
by running into name collisions.

If there are certain ES6 features you want polyfilled such as
[`Array.prototype.find()`][array-prototype-find], you should use
correctly written polyfills such as those written by
[Paul Miller][paulmillr]. 

Below is a list of well-written polyfills. Feel free to add to this list,
but please only add polyfills, whose code you have actually investigated
so we can guarantee quality/correctness here.

* [Array.prototype.find() Polyfill][array-prototype-find-polyfill]
* [Array.prototype.findIndex() Polyfill][array-prototype-find-index-polyfill]

[Official `no-extend-native` ESLint Rule Documentation][no-extend-native-docs]

[no-extend-native-docs]: https://github.com/eslint/eslint/blob/master/docs/rules/no-extend-native.md
[paulmillr]: https://github.com/paulmillr
[array-prototype-find-polyfill]: https://github.com/paulmillr/Array.prototype.find
[array-prototype-find-index-polyfill]: https://github.com/paulmillr/Array.prototype.findIndex
