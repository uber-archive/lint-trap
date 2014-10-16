uber-lint
=========

This module contains standardized linting rules to be used across all projects
at Uber that contain JavaScript.

Usage
-----

    npm install --save-dev uber-lint
    ./node_modules/.bin/uber-lint setup
    npm run lint

TODO
----

 - bin/
   - map command line flags for each linter
   - standardize all linting output
 - lib/
   - make separate rulesets for node env and browser env
 - test/
   - clone sirvice, bedrock and playdoh as fixtures (use commit hash)
   - purge linter configuration and ignore files from repo
   - purge linter scripts from package.json
   - purge `jshintConfig` property from package.json if exists

 - When installed:
   - check if uber-lint has been installed in a project
     - check if parent folder is `node_modules/`
     - if so, check if parent of `node_modules/`
       - a package.json and uber-lint is in the dev deps
       - if so:
         - add .jshintrc, .eslintrc and .jscsrc to .gitignore
         - symlink those files to the ones in node_modules/uber-lint/lib/
           - if project contains nodejs and browser javasript, symlink the 
             correct jshintrc in the correct folders

 - Consolidate ignore files.

 - Support text editor linters by symlinking from project's root folder to 
 linter configuration files in `./node_modules/uber-lint/`

linters need to be run once per directory with unique rc files

The only way to overwrite uber jshint, jscs and eslint rules is per file. If you
want to overwrite it per project, file a github issue in this repo since this 
might be a use case or linting rule we should consider for inclusion in this 
project.

JSON reporter
TAP reporter


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
