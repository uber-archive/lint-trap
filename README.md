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


Linting Support in Text Editors
-------------------------------

With linting rules moved to an npm module, linters such as [SublimeLinter][sl]
for Sublime Text, [syntastic][syn] for vim and [flycheck][fc] for emacs, will
be unable to to find the lint-trap linting rules for the project.

In the short term this can be fixed by copying those files from lint-trap to
your project and adding them to your `.gitignore`. From the root of your
project:

    cp ./node_modules/lint-trap/lib/rc/.{jscs,eslint,jshint}rc .
    rc=( .{jscs,eslint,jshint}rc )
    for c in "${rc[@]}"; do echo $c >> .gitignore; done;

Symlinking was preferred here, but SublimeLinter won't load symlinked linter
configuration files.

In the future, we will have lint-trap plugin for lint-trap so that you don't
need to install plugins for all the linters that lint-trap supports. In the
meantime, you should consult the documentation for the linting engine available
for your code editor to discover how to enable support for jscs, jshint and
eslint.


Overriding Rules
----------------

Since lint-trap is meant to enforce good coding style and consistency across
many projects from the same organization, you cannot turn rules off completely.
However, when lint-trap to legacy projects without any linting or with
different linting rules, it is useful to be able to downgrade the warning
severity from `error` to `warning` so you can pay down linting technical debt
over several commits. Because of this, lint-trap supports adding a `.lintrc`
file to your project.

The `.lintrc` file is a JSON file with a key for each linter with rules for
which you wish to attenuate the lint message severity. 

For example, after adding lint-trap to a project, you should try to satisfy all
the linting rules that are quick and easy to fix. Some linting violations
might be so common that you want to deal with them in a later commit. One
common lint-rule that is likely to affect many lines of code is eslint's
[`func-names`][func-names] rule. If you want to attenuate this rule, simply add
a `.lintrc` file to the root of your project:

    {
        "eslint": {
            "func-names": false
        }
    }

`.lintrc` files can be added to subfolders and you can turn rules back to error
level by setting the value for that rule to true. While `.lintrc` files can be
put in subfolders, you really shouldn't have any projects that are so large
that you need to use this feature.

Rules cannot be turned off entirely in `.lintrc`, only attenuated. If there are
rules that you feel you absolutely must override, you can do so within the
files producing the error. If you find yourself ignoring or modifying a
specific rule on a file by file basis very frequently, please check the
[rules documentation][docs] to understand the technical reasons for why that
rule has been encluded and enforced. If you disagree with the justifications
outlined in the docs, [check the issues][issues] to see whether or not someone
has already filed an issue raising the same concerns as you. If you still think
your exception has merit, and no one has yes raised that issue, please see the
Contributing section at the end of this README.

If you want to override the rules for a specific linter inline, refer to the
documentation for the linter producing the error or warning thrown.

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


Contributing
------------

Contributions to lint-trap are welcome, but since lint-trap is effectively a
module that encapsulates a set of opinions and throws errors and warnings at
you when you violate those opinions, there is a lot of room to debate over
[what color to paint our bikeshed][bikeshed].

Before you begin filing an issue to argue why you think your color of paint is
superior, it's worth knowing how the current set of rules were determined. The
engineers on web core, realtime developer productivity and dispatch/realtime
teams were the first to go through all the rules and debate the merit of each.
This group is consists of developers that collectively have seen tons of code
and tons of bugs in production systems that arose from poor choice of coding 
style and conventions.

The rules and the reasoning behind each should all be documented or will be
over time. Before we bikeshed over a rule, please check the rules
[documentation][docs]. If a rule hasn't been documented or hasn't yet been
documented adequately, open an issue asking for clarification and better 
documentation *first*. If a rule has been documented and you still disagree,
there is one task you must perform before you are allowed to bikeshed. You must
first read Clay Shirky's essay [A Group is its Own Worst Enemy][group-enemy].
At the end of the day, we all love bikeshedding, but we would like to keep it
to a minimum, so we can all get work done.


[sl]: http://sublimelinter.readthedocs.org/
[syn]: https://github.com/scrooloose/syntastic
[fc]: http://flycheck.readthedocs.org/

[sl-jshint]: https://github.com/SublimeLinter/SublimeLinter-jshint
[sl-jscs]: https://github.com/SublimeLinter/SublimeLinter-jscs/
[sl-eslint]: https://github.com/roadhump/SublimeLinter-eslint

[syn-jshint]: https://github.com/scrooloose/syntastic/wiki/JavaScript%3A---jshint
[syn-jscs]: https://github.com/scrooloose/syntastic/wiki/JavaScript%3A---jscs
[syn-eslint]: https://github.com/scrooloose/syntastic/wiki/JavaScript%3A---eslint

[fs-javascript]: http://flycheck.readthedocs.org/en/latest/guide/languages.html#javascript

[configuring-eslint]: http://eslint.org/docs/configuring/
[configuring-jshint]: http://www.jshint.com/docs/
[configuring-jscs]: https://github.com/jscs-dev/node-jscs#error-suppression
[issues]: https://github.com/uber/lint-trap/issues
[file-an-issue]: https://github.com/uber/lint-trap/issues/new
[docs]: https://github.com/uber/lint-trap/tree/master/docs
[wadlers-law]: http://www.haskell.org/haskellwiki/Wadler's_Law
[set-indent-rule.js]: https://github.com/uber/lint-trap/blob/master/set-indent-rule.js
[bikeshed]: http://red.bikeshed.com/
[group-enemy]: http://www.shirky.com/writings/herecomeseverybody/group_enemy.html

[func-names]: https://github.com/eslint/eslint/blob/master/docs/rules/func-names.md
