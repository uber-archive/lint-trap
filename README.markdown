lint-trap
=========

This module contains standardized linting rules to be used across all projects
at Uber that contain JavaScript.


Usage
-----

    npm install --save-dev lint-trap
    ./node_modules/.bin/lint-trap <list of file or folder paths>

It is recommended that you add lint-trap to the `scripts` property of your
project's `package.json` manifest file, like so:

    {
        ...
        "scripts": {
            ...
            "lint": "lint-trap",
            ...
        },
        ...
    }

... and then you can invoke it by executing `npm run lint`.


Overriding Rules
----------------

Since lint-trap is meant to enforce good coding style and consistency across
many projects from the same organization, there is no equivalent to `.jscsrc`,
`.jshintrc` and `.eslintrc` files, where you can configure rules, nor
are there any plans to support this feature at this time. 

If there are rules that you feel you absolutely must override, you can do so
within any files producing the error. If you find yourself ignoring or
modifying a specific rule on a file by file basis very frequently, please check
the [rules documentation][docs] to understand the technical reasons for why
that rule has been encluded and enforced. If you disagree with the
justifications outlined in the docs, [check the issues][issues] to see whether
or not someone has already filed an issue raising the same concerns as you. If
you still think your exception has merit, and no one has yes raised that issue,
please [file a new issue][file-an-issue]. 

If you want to override the rules for a specific linter, see the documentation
for the linter producing the error or warning thrown.

 - [Configuring ESLint][configuring-eslint]
 - [Configuring JSHint][configuring-jshint]
 - [Configuring JSCS][configuring-jscs]


Indentation
-----------

lint-trap dynamically detects whether it should enforce a 2-space or 4-space
softtab indent rule. It does this by inspecting a reference file to detect the
indentation used in that reference file, and then enforces the detected
indentation on all the files it is linting.

The decision to dynamically detect and support indentation on a project by
project basis was done after lots of deliberation on which rules had technical
merit (see [documentation][docs]) and which ones are merely opinions that
are that should be consistently enforced. The choice between 2-spaces and
4-spaces was the most contentious rule is one that results in endless
bikeshedding discussions devoid of technical arguments in favor of either
preference.

The algorithm used to determine the reference file from which indentation is
detected is as follows:

 - use the file defined in the `main` property of `package.json` in the current
   working directory.
 - use index.js in the current working directory
 - use the first file resolved when expanding the path arguments with which
   lint-trap was run.

See [set-indent-rule.js][set-indent-rule.js] for the implementation.


Globals
-------

The only whitelisted globals are `__dirname`, `__filename`, `module` and
`require`.

`exports` is not whitelisted. You should instead always access `exports` via a
property on `module`. e.g. `module.exports = someObject;`

For other globals such as `process`, `global`, `window`, `document`, you should
include the following two modules in your project:
 - https://github.com/Raynos/global
 - https://github.com/defunctzombie/node-process


[configuring-eslint]: http://eslint.org/docs/configuring/
[configuring-jshint]: http://www.jshint.com/docs/
[configuring-jscs]: https://github.com/jscs-dev/node-jscs#error-suppression
[issues]: https://github.com/uber/lint-trap/issues
[file-an-issue]: https://github.com/uber/lint-trap/issues/new
[docs]: https://github.com/uber/lint-trap/tree/master/docs
[wadlers-law]: http://www.haskell.org/haskellwiki/Wadler's_Law
[set-indent-rule.js]: https://github.com/uber/lint-trap/blob/master/set-indent-rule.js
