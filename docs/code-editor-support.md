lint-trap plugin support in code editors
========================================

lint-trap is relatively new, but there already is a lint
plugin available for SublimeLinter3 and a lint plugin is in
the works for Syntastic. A Flycheck lint plugin for emacs
will be developed next. If you work with emacs and
JavaScript [email me][email-aandrade] to let me know so I
can prioritize.

- [SublimeLinter-contrib-lint-trap][sublimeLinter-contrib-lint-trap]


With linting rules moved to an npm module, linters such as
[SublimeLinter][sl] for Sublime Text, [syntastic][syn] for
vim and [flycheck][fc] for emacs, will be unable to to find
the lint-trap linting rules for the project.

In the short term this can be fixed by copying those files
from lint-trap to your project and adding them to your
`.gitignore`. From the root of your project:

    cp ./node_modules/lint-trap/rc/.{jscs,eslint,jshint}rc .
    rc=( .{jscs,eslint,jshint}rc )
    for c in "${rc[@]}"; do echo $c >> .gitignore; done;

Symlinking was preferred here, but SublimeLinter won't load
symlinked linter configuration files.

In the future, we will have lint-trap plugin for lint-trap
so that you don't need to install plugins for all the
linters that lint-trap supports. In the meantime, you should
consult the documentation for the linting engine available
for your code editor to discover how to enable support for
jscs, jshint and eslint.


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
