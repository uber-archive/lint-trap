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
        }
        ...
    }

... and then you can invoke it by executing `npm run lint`.

TODO
----

- Investigate which (if any) of the command line flags from each linter should
  be available in lint-trap
- Project conversion helpers
  - Find and consolidate all .ignore files as .lintignore
    - jscs is a special case (`excludeFiles` in `.jscsrc`)
  - purge linter configuration and ignore files from repo
  - purge linter scripts from package.json
  - purge `jshintConfig` property from package.json if exists
- post-install script
  - check if lint-trap has been installed in a project by checking if parent 
    folder is `node_modules/`, then checking if parent of `node_modules/` 
    contains lint-trap in the `devDependencies` of the package.json file. 
    - If lint-trap has been installed:
      - add `.jshintrc`, `.eslintrc` and `.jscsrc` to `.gitignore`
      - Support text editor linters by symlinking from project's root folder to 
        linter configuration files in `./node_modules/lint-trap/lib/rc/`
- JSON reporter
- TAP reporter

linters need to be run once per directory with unique rc files

The only way to overwrite uber jshint, jscs and eslint rules is per file. If
you want to overwrite it per project, file a github issue in this repo since
this might be a use case or linting rule we should consider for inclusion in
this project.

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


[docs]: https://github.com/uber/lint-trap/tree/master/docs
[wadlers-law]: http://www.haskell.org/haskellwiki/Wadler's_Law
[set-indent-rule.js]: https://github.com/uber/lint-trap/blob/master/lib/set-indent-rule.js
