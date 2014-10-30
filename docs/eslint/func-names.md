# func-names

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

[Official `func-names` ESLint Rule Documentation][func-names-docs]

[func-names-docs]: https://github.com/eslint/eslint/blob/master/docs/rules/func-names.md
