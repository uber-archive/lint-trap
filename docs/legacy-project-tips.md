Tips for adding lint-trap to legacy projects
============================================

Adding lint-trap to legacy projects can feel distressing
because lint trap will highlight dozens to hundreds of lint
errors where your current code does not conform to the rules
that lint-trap enforces. To make things easier, this guide
provides some tips and tricks for fixing up a project
gradually.


Adding lint-trap to your project
--------------------------------

To add lint-trap to your project:

    $ npm install --save-dev lint-trap

Then add the "lint" property to the "scripts" property in
your package.json.

    "scripts": {
        "lint": "lint-trap"
    }

If you have any references in "scripts" to jshint or any
other linters, like jscs and eslint, remove them. For all
the entries in files like .jshintignore and .eslintignore
and the entries in the `"excludeFiles"` property of your
.jscsrc file. You can also remove all remove all the lint
.rc files like .jscsrc, .jshintrc and .eslintrc.

Don't forgot to update the `"test"` script and any other
`"scripts"` entries that make reference to `npm run lint`.

If your project's continuous integration is managed by
jenkins and hosted on phabricator, you should check out the
./templates/web/content/package.json file in the  `web/web-
templates` repo on Phabricator. It is a solid example of
best practices when setting up a project.


Running lint-trap for the first time
------------------------------------

Once lint-trap is installed and your package.json is set up
properly, you should be able to run lint-trap like so.

    $ npm run lint

If all goes according well, you will probably be greeted by
dozens to hundreds of lint errors depending on the size of
your project. If you encounter any errors, double check that
the `"main"` property in your package.json file is properly
configured. lint-trap relies on the main property to find a
reference file in your project and figure out the default
indentation settings to use.

Fixing all these issues will be daunting if you try to
resolve them all at once and trying to fix them all at once
will make merging and rebasing difficult. To help make the
linting process more manageable, we're going to provide a
some tips of tricks to break things down into bite size
chunks.

Pre-commit hook to lint only changed files
------------------------------------------

Using npm-scripts, some bash-fu and the [husky][husky] 
module, you can have lint-trap only lint changed *.js files
as a pre-commit hook. To do this, first install husky as a
dev dependency:

    $ npm install --save-dev husky

Then add the following to your `package.json` file:

    "scripts": {
        ...
        "lint-changed": "lint-trap `git diff HEAD --name-only --diff-filter=ACMRTU | awk '/\.js$/' | awk  -v path=$(git rev-parse --show-toplevel)/ '{print path$1}'`",
        "precommit": "npm run lint-changed",
        ...
    },

Husky will install git-hooks, including a pre-commit hook
that will run `npm run precommit`, which in turn runs the
`lint-changed` script.

This script works like so:

    # show the files names of staged and unstaged changes
    # not including deleted files.
    git diff HEAD --name-only --diff-filter=ACMRTU

    # pipe that list to an awk filter that reduces that list
    # to javascript files only (*.js)
    | awk '/\.js$/'

    # pipe that list to an awk filter that expands the file
    # names to the full path from the top-level git directory.
    | awk  -v path=$(git rev-parse --show-toplevel)/ '{print path$1}'`


Use a .lintignore file
----------------------

After running lint-trap for the first time and seeing
hundreds of errors, what you should not do is try to fix all
those files at the same time. Instead, create a .lintignore
file at the root of your project and add entires for every
folder in your project. Use comments denoted by lines
starting with `#` to seperate your permanent ignore rules
like `node_modules/` or `coverage` from temporary rules to
make linting more manageable like `lib/` and `test/`.

Now if you run lint-trap again, you should see only the
javascript files in the root of your project get linted
(note: this will break finding your `"main"` file if it is
not at your root).

If you don't have too many files at your root, fixing them
up and committing them should be a manageable task. Start
there.

After making your first commit, your team can basically
adopt one of two basic approaches or a blend of both. The
first and obvious option is to remove or modify rules in the
.lintignore file one at a time until so that the errors from
those additional files show up when you run lint-trap. Fix
them and commit once again. Repeat until most code is
fixedfiles one at a time. The second option is to adopt a
rule with your team that the .lintignore file should be
modifed so that lint-errors for any files touched that are
altered or  staged for commit should be fixed in the same
commit. The reasoning here is that it's much easier to
modify and fix a piece of code with which you've been
editing recently and with which you are currently familiar.


Use a lint plugins for your code editor
---------------------------------------

lint-trap can be use in any code editor. A plugin already
exists for SublimeLinter3 in Sublime Text 3 and a plugin for
syntastic in vim is in progress. Plugins for flycheck in
emacs and for WebStorm are planned.

For more information on existing code editor plugins and
workarounds for code editors for there isn't yet support,
please see out [code editor support][code-editor-tools]
docs. 

Use an .editorconfig file
-------------------------

Consider adding an [editorconfig][editorconfig] file to your
project and setting up your code editor to be
[.editorconfig aware.] This plugin goes a long way in terms
of making your test editor fix up whitespace issues in every
file you open and save.
You won't regret adding such a tool to your project.


[husky]: https://github.com/typicode/husky
[editorconfig]: http://editorconfig.org/
[code editor support]: code-editor-support.md
[sublimeLinter-contrib-lint-trap]: https://github.com/uber/SublimeLinter-contrib-lint-trap
[email-aandrade]: mailto:aandrade@uber.com?subject=lint-trap-emacs-flycheck-support
