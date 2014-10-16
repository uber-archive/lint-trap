lint-trap
=========

This module contains standardized linting rules to be used across all projects
at Uber that contain JavaScript.

Usage
-----

    npm install --save-dev lint-trap
    ./node_modules/.bin/lint-trap .

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
