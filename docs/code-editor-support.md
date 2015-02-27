lint-trap plugin support in code editors
========================================

lint-trap is relatively new, but there already is a lint
plugin available for SublimeLinter3 and a lint plugin is in
the works for Syntastic. A Flycheck lint plugin for emacs
will be developed next. If you work with emacs and
JavaScript [email me][email-aandrade] to let me know so I
can prioritize.

## SublimeText - SublimeLinter3

- [SublimeLinter-contrib-lint-trap][sublimeLinter-contrib-lint-trap]

The SublimeLinter plugin is not published yet in the
PackageControl channel for SublimeLinter. In the meantime,
you can install it by git cloning it to the Plugins folder:

```
cd ~/Library/Application\ Support/Sublime\ Text\ 3/Packages/
git clone git@github.com:uber/SublimeLinter-contrib-lint-trap.git
```

## vim - syntastic

There is a plugin for syntastic, but it is not yet in syntastic. To use it:
- copy [`linttrap.vim`][linttrap.vim] to the `syntax\_checkers/javascript/`
  folder within the syntastic plugin folder
  - if you're using pathogen, this should be
    `~/.vim/bundle/syntastic/syntax\_checkers/javascript/`
- enable the linttrap checker by adding this line to your vimrc: `let g:syntastic\_javascript\_checkers = ["linttrap"]`
- make sure you have lint trap installed globally: `npm i -g lint-trap`
## Other Editors

With linting rules moved to an npm module, other linters
such as [flycheck][fc] for emacs, will be unable to to find
the lint-trap linting rules for the project.

In the short term this can be fixed by copying those files
from lint-trap to your project and adding them to your
`.gitignore`. From the root of your project:

    cp ./node_modules/lint-trap/rc/.{jscs,eslint,jshint}rc .
    rc=( .{jscs,eslint,jshint}rc )
    for c in "${rc[@]}"; do echo $c >> .gitignore; done;

Symlinking was preferred here, but SublimeLinter won't load
symlinked linter configuration files.

In the future, we will have lint-trap plugin for all the
linting engines so that you don't need to install plugins
for all the three linters that lint-trap supports. In the
meantime, you should consult the documentation for the
linting engine available for your code editor to discover
how to enable support for jscs, jshint and eslint.


[sublimeLinter-contrib-lint-trap]: https://github.com/uber/SublimeLinter-contrib-lint-trap
[linttrap.vim]: https://github.com/uber/lint-trap/blob/master/extras/linttrap.vim

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
