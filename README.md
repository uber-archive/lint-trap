lint-trap
=========

This module contains standardized linting rules to be used
across all projects at Uber that contain JavaScript.


Usage
-----

    npm install --save-dev lint-trap
    ./node_modules/.bin/lint-trap <list of file or folder paths>

It is recommended that you add lint-trap to the `scripts`
property of your project's `package.json` manifest file,
like so:

    "scripts": {
        "lint": "lint-trap",
    }

... and then you can invoke it by executing `npm run lint`.


Tips and Tricks for Legacy Projects
-----------------------------------

Using lint-trap to get a legacy project with many thousands
of lines of code in line with the standards enforced by
lint-trap can be a daunting task. To make the process as
painless as possible, [this guide][legacy-tips] will give
you practical advice on tackling all your lint errors and
warnings in bite-size chunks.


Linting Support in Text Editors
-------------------------------

lint-trap is very new so support for text editor plugin is
still immature. Plugin support already exists for
SublimeText 3 and Syntastic (vim). Plugin support for
flycheck in emacs is planned.

For more information and workarounds if your editor is not
yet supported, see the documentation on
[code editor support][code-editor-support].


Attenuating Rules
-----------------

Since lint-trap is meant to enforce good coding style and
consistency across many projects from the same organization,
you cannot turn rules off completely. However, when using
lint-trap in legacy projects without any linter or with
different linting rules, it is useful to be able to
downgrade the warning severity from `error` to `warning` so
you can pay down linting technical debt over several
commits. Because of this, lint-trap supports adding a
`.lintrc` file to your project.

For more information on configuring a .lintrc file or
command-line options, see the [configuration
docs][configuration].

If you're using lint-trap in a legacy project, you should
also check out the [legacy project tips][legacy-tips].


Indentation
-----------

lint-trap dynamically detects whether it should enforce a
2-space or 4-space softtab indent rule. It does this by
inspecting a reference file to detect the indentation used
in that reference file, and then enforces the detected
indentation on all the files it is linting.

For more information, see the documentation on
[indentation][indentation]


Warnings vs. Errors
-------------------

Almost all lint-trap rules produce errors. If you see an
error, you should fix it. However, a few rules, notably
`max-statements` and `complexity` produce warnings. The
reason these rules produce warnings is because their goal is
to highlight code where there might be too much going on
within a single block of code.

Long, complex code blocks are likely to be less readable and
therefore less maintainable. When you see a warning, you
should investigate the code in question and deliberately
determine if the code should be refactored or if the code is
okay as is. There exist cases where lint-trap will return a
warning, but where the code is acceptable as is. For
example, you might find that in some tests you have many
assertions and you go beyond the maximum number of
statements allowed. In this situation you might determine
that many assertions are not only acceptable but necessary
without reducing readability and comprehension. If you
encounter code that should be considered acceptable, you can
add an inline linter directive to tell lint-trap to ignore
that code for that particular warning.

Since all the lint rules that produce warnings are currently
handled by eslint all you need to do is add the following
two lines around your code, where `lint-rule-id` is the
string eslint uses to identify a particular rule such as
`max-statements`:

    /*eslint-disable lint-rule-id*/
    /* the code producing the warning here */
    /*eslint-enable lint-rule-id*/


Contributing
------------

Contributions to lint-trap are welcome, but since lint-trap
is effectively a module that encapsulates a set of opinions
and throws errors and warnings at you when you violate those
opinions, there is a lot of room to debate over
[what color to paint our bikeshed][bikeshed].

Before you begin filing an issue to argue why you think your
color of paint is superior, it's worth knowing how the
current set of rules were determined. Javascript enginerrs
from several teams with different needs (both front-end
engineers and back-end NodeJS engineers) were the first to
go through all the rules, try them out and debate the merit
of each. This group is consists of developers that
collectively have seen tons of code and tons of bugs in
production systems at scale that arose from poor choice of
coding style and conventions.

The rules and the reasoning behind each should all be
documented or will be over time. Before we bikeshed over a
rule, please check the rules [documentation][docs]. If a
rule hasn't been documented or hasn't yet been documented
adequately, open an issue asking for clarification and
better  documentation *first*. If a rule has been documented
and you still disagree, there is one task you must perform
before you are allowed to bikeshed. You must first read Clay
Shirky's essay
[A Group is its Own Worst Enemy][group-enemy].
At the end of the day, we all love bikeshedding, but
we would like to keep it to a minimum, so we can all get
work done.


Why lint-trap
-------------

If there are all these other linters out there like JSHint,
ESLint and jscs, why does lint-trap exist?

Uber like many large companies using JavaScript has a
**LOT** of projects all with their own set of .rc files
(pronounced __dot·arc__) for each linter. These
configuration files are almost always copypasta-ed from a a
previous project and they all evolve and mutate over time as
each developer gets their hands on a project and make their
own changes. This means that over time, every project ends
up with its own style adding unnecessary friction to
collaboration and working across many projects.

lint-trap aims to be a zero-configuration linter as much as
possible, and requires no configuration in brand new
projects. The few configuration options it offers exist
solely to help legacy projects reach 100% linting
conformance piecemeal.

For more information on why we think lint-trap is valuable
see the documentation describing the
[philosopy behind lint-trap][philosophy]


Using lint-trap in non-Uber projects
------------------------------------

lint-trap currently includes hard-coded lint rules in use at
Uber. If you work at Uber and work with JavaScript, you
should have lint-trap in your project. If you don't work at
Uber, you're welcome to use lint-trap in your project as is.

If you want lint-trap to support a different rules for your
organization, we first ask that you try out the rules with
which lint-trap already comes. The rules have been discussed
at length by many engineers and are well thought out for any
environment where lots of devs need to work together and
need to feel at home in each others' code. Spend some time
with the existing rules and reading the explanation for
their existance in the docs and we're pretty sure you'll
find them to be a pretty good balance for large engineering
organizations.

If, after trying out our lint-rules for some time, you feel
that you still need to support different rules, please
comment on [this issue][orgrules-issue]. We will be glad to
work with you to add support for this lint-trap.


License
-------

The MIT License (MIT)

Copyright (c) 2014 Uber Technologies, Inc.

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the
Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute,
sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall
be included in all copies or substantial portions of the
Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY
KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


[legacy-tips]: https://github.com/uber/lint-trap/blob/master/docs/legacy-project-tips.md
[indentation]: https://github.com/uber/lint-trap/blob/master/docs/indentation.md
[code-editor-support]: https://github.com/uber/lint-trap/blob/master/docs/code-editor-support.md
[configuration]: https://github.com/uber/lint-trap/blob/master/docs/configuration.md
[philosophy]: https://github.com/uber/lint-trap/blob/master/docs/philosophy.md

[orgrules-issue]: https://github.com/uber/lint-trap/issues/54

[file-an-issue]: https://github.com/uber/lint-trap/issues/new
[docs]: https://github.com/uber/lint-trap/tree/master/docs
[wadlers-law]: http://www.haskell.org/haskellwiki/Wadler's_Law
[bikeshed]: http://red.bikeshed.com/
[group-enemy]: http://www.shirky.com/writings/herecomeseverybody/group_enemy.html
