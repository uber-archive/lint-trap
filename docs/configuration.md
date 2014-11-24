Overriding Rules
================

Since lint-trap is meant to enforce good coding style and
consistency across many projects from the same organization,
you cannot turn rules off completely. However, when lint-
trap to legacy projects without any linting or with
different linting rules, it is useful to be able to
downgrade the warning severity from `error` to `warning` so
you can pay down linting technical debt over several
commits. Because of this, lint-trap supports adding a
`.lintrc` file to your project.

The `.lintrc` file is a JSON file with a key for each linter
with rules for which you wish to attenuate the lint message
severity.

For example, after adding lint-trap to a project, you should
try to satisfy all the linting rules that are quick and easy
to fix. Some linting violations might be so common that you
want to deal with them in a later commit. One common lint-
rule that is likely to affect many lines of code is eslint's
[`func-names`][func-names] rule. If you want to attenuate
this rule, simply add a `.lintrc` file to the root of your
project:

    {
        "eslint": {
            "func-names": false
        }
    }

`.lintrc` files can be added to subfolders and you can turn
rules back to error level by setting the value for that rule
to true. While `.lintrc` files can be put in subfolders, you
really shouldn't have any projects that are so large that
you need to use this feature.

Rules cannot be turned off entirely in `.lintrc`, only
attenuated. If there are rules that you feel you absolutely
must override, you can do so within the files producing the
error. If you find yourself ignoring or modifying a specific
rule on a file by file basis very frequently, please check
the [rules documentation][docs] to understand the technical
reasons for why that rule has been encluded and enforced. If
you disagree with the justifications outlined in the docs,
[check the issues][issues] to see whether or not someone has
already filed an issue raising the same concerns as you. If
you still think your exception has merit, and no one has yes
raised that issue, please see the Contributing section at
the end of this README.

If you want to override the rules for a specific linter
inline, refer to the documentation for the linter producing
the error or warning thrown.

 - [Configuring ESLint][configuring-eslint]
 - [Configuring JSHint][configuring-jshint]
 - [Configuring JSCS][configuring-jscs]


[configuring-eslint]: http://eslint.org/docs/configuring/
[configuring-jshint]: http://www.jshint.com/docs/
[configuring-jscs]: https://github.com/jscs-dev/node-jscs#error-suppression
[issues]: https://github.com/uber/lint-trap/issues

[func-names]: https://github.com/eslint/eslint/blob/master/docs/rules/func-names.md
