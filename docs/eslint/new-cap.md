# new-cap

    "new-cap": [2, { newIsCap: true, capIsNew: false }]

All functions called with `new` must begin with a capital
letter, but all functions that begin with a capital letter
is need not be a constructor.

Since our [global-strict][global-strict] rule requires that
all files use strict mode via a singular `'use strict'` at
the top of each file, forgetting to call a constructor with
`new` will correctly lead to trying to assign a property to
`this`, i.e. `undefined` which is a thrown exception.

We should also discourage that people use `new` as part of
their public interface, having to remember whether to call a
module with `new` or not is frustrating in the same sense
that having to remember whether a property is camelCase or
snake_case.

The `Error` function is one example of a function that need
not be called with `new`.

[Official `new-cap` ESLint Rule Documentation][new-cap-docs]

[new-cap-docs]: https://github.com/eslint/eslint/blob/master/docs/rules/new-cap.md
[global-strict]: global-strict.md
