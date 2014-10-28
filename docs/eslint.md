# ESLint guidelines.

## Status quo.

### Environments

    "env": {
        "browser": false,
        "node": false,
        "amd": false,
        "mocha": false,
        "jasmine": false
    }

None of the environment meta variables are used because we proscribe our own
style, which applies to both server side and browser side code. The most
important issue to be aware of here is how we handle globals explained below.


### Globals

    "globals": {
        "__dirname": true,
        "__filename": true,
        "require": true,
        "module": true
    },


This is the minimum set of globals required both in the browser and in NodeJS.
Restricting globals to this set has numerous benefits:
 - It trains developers to never rely on global scope
 - It reduces the length of the scope chain that needs to be traversed since
   pointers to a global object are encountered sooner in the chain.
 - Allows globals to be mocked in testing environments.

Please see the section titled "Globals" in the [README][readme] for further
information.


## Rules

    "no-alert": 2

The `alert` function blocks JavaScript execution. Also, modal dialogs where the
user can only ever press OK to acknowledge them is a huge UI anti-pattern.

    "no-array-constructor": 2

[Official ESLint Explanation][no-array-constructor]

    "no-bitwise": 0

    "no-caller": 2

    "no-catch-shadow": 2

    "no-comma-dangle": 2

    "no-cond-assign": 2

    "no-console": 2

    "no-constant-condition": 2

    "no-control-regex": 2

    "no-debugger": 2

    "no-delete-var": 2

    "no-div-regex": 0

    "no-dupe-keys": 2

    "no-else-return": 0

    "no-empty": 2

    "no-empty-class": 2

    "no-empty-label": 2

    "no-eq-null": 0

    "no-eval": 2

    "no-ex-assign": 2

    "no-extend-native": 2

    "no-extra-bind": 2

    "no-extra-boolean-cast": 2

    "no-extra-parens": 0

    "no-extra-semi": 2

    "no-extra-strict": 2

    "no-fallthrough": 2

    "no-floating-decimal": 0

    "no-func-assign": 2

    "no-implied-eval": 2

    "no-inner-declarations": [2, "functions"]

    "no-invalid-regexp": 2

    "no-iterator": 2

    "no-label-var": 2

    "no-labels": 2

    "no-lone-blocks": 2

    "no-lonely-if": 0

    "no-loop-func": 2

    "no-mixed-requires": [0, false]

    "no-mixed-spaces-and-tabs": [2, false]

    // "no-multi-spaces": 2

    "no-multi-str": 2

    "no-multiple-empty-lines": [0, {"max": 2}]

    "no-native-reassign": 2

    "no-negated-in-lhs": 2

    "no-nested-ternary": 0

    "no-new": 2

    "no-new-func": 2

    "no-new-object": 2

    "no-new-require": 0

    "no-new-wrappers": 2

    "no-obj-calls": 2

    "no-octal": 2

    "no-octal-escape": 2

    "no-path-concat": 0

    "no-plusplus": 0

    "no-process-env": 0

    "no-process-exit": 2

    "no-proto": 2

    "no-redeclare": 2

    "no-regex-spaces": 2

    "no-reserved-keys": 0

    "no-restricted-modules": 0

    "no-return-assign": 2

    "no-script-url": 2

    "no-self-compare": 0

    "no-sequences": 2

    "no-shadow": 2

    "no-shadow-restricted-names": 2

    "no-space-before-semi": 2

    "no-spaced-func": 2

    "no-sparse-arrays": 2

    "no-sync": 0

    "no-ternary": 0

    "no-trailing-spaces": 2

    "no-undef": 2

    "no-undef-init": 2

    "no-undefined": 0

    "no-underscore-dangle": 2

    "no-unreachable": 2

    "no-unused-expressions": 2

    "no-unused-vars": [2, {"vars": "all", "args": "none"}]

    "no-use-before-define": [2, "nofunc"]

    "no-void": 0

    "no-warning-comments": [0, { "terms": ["todo", "fixme", "xxx"], "location": "start" }]

    "no-with": 2

    "no-wrap-func": 2

    "block-scoped-var": 0

    "brace-style": [0, "1tbs"]

    "camelcase": 2

    "comma-style": 0

    "complexity": [0, 11]

    "consistent-return": 2

    "consistent-this": [0, "that"]

    "curly": [2, "all"]

    "default-case": 0

    "dot-notation": 2

    "eol-last": 2

    "eqeqeq": 2

    "func-names": 2

This rules requires you to name every function. The purpose of forcing you to
always name every function is two-fold. First, this produces much more readable
stack traces, since anonymous function calls require you to go to the source
code and figure out what a function is trying to do. Naming the function makes
it clear what it is trying to do. Second, naming your functions, makes it easy
to pull out the function from where is is being called, thereby keeping
indentation levels and line lengths low.

One thing to keep in mind with this rule is that named function expressions are
not hoisted into the current scope. For example, in the following line of code
only `foo` will be available in the top-level scope, and `bar` will only be
available within its own scope. 

    var foo = function bar() {};

Furthermore, when you write inline functions (which are oftern anonymous
functions), those functions are function expressions, not function
declarations. What this means is that in a test file, it is perfectly
acceptable to do the following since the function expressions with name `t`
do not collide in the same scope as the token `test`:

    var test = require('tape');

    test('foo', function t() { /* test foo */ });
    test('bar', function t() { /* test bar */ });
    test('baz', function t() { /* test baz */ });

If appropriate, you can also name those function expressions more explicitly,
like `tFoo`, `tBar` and `tBaz`, but this is not necessary.

In the case of anonymous callback functions used for the sole purpose of
handling the first error argument, before calling another function with the
remaining arguments, you can name it something like `handleError` or you can
even use a helper function like the following to wrap the error if you find
yourself writing lots of `handleError` callback functions in the same file:

    function wrapError(callbackFn, nextFn) {
        return function handleError(err) {
            if (err) {
                return callbackFn(err);
            }
            var args = arguments.slice(1);
            args.push(callbackFn);
            nextFn.apply(null, args);
        }
    }

Overall, this rule that requires that all functions be named may same tedious
at first, but it almost invariably forces you to refactor a lot of your code
for the better, since it prevents you from abusing lambdas. If you encounter
a use case where you think it is particularly challenging to satisfy this rule,
feel free to open up an issue, and we'll help you figure out how refactor your
code.


    "func-style": [0, "declaration"]

    "global-strict": [2, "always"]

    "guard-for-in": 0

    "handle-callback-err": 0

    // "key-spacing": [2, { "beforeColon": false, "afterColon": true }]

    "max-depth": [0, 4]

    "max-len": [0, 80, 4]

    "max-nested-callbacks": [0, 2]

    "max-params": [0, 3]

    "max-statements": [0, 10]

    "new-cap": [2, { newIsCap: true, capIsNew: false }]

    "new-parens": 2

    "one-var": 0

    "padded-blocks": 0

    "quote-props": 0

    "quotes": [2, "single"]

    "radix": 0

    "semi": 2

    "sort-vars": 0

    "space-after-keywords": [0, "always"]

    "space-before-blocks": [0, "always"]

    "space-in-brackets": [0, "never"]

    "space-in-parens": [0, "never"]

    "space-infix-ops": 2

    "space-return-throw-case": 2

    "space-unary-word-ops": 0

    "spaced-line-comment": [0, "always"]

    "strict": 2

    "use-isnan": 2

    "valid-jsdoc": 0

    "valid-typeof": 2

    "vars-on-top": 0

    "wrap-iife": 0

    "wrap-regex": 0

    "yoda": [2, "never"]


[readme]: https://github.com/uber/lint-trap/blob/master/README.markdown
[no-array-constructor]: https://github.com/eslint/eslint/blob/master/docs/rules/no-array-constructor.md
