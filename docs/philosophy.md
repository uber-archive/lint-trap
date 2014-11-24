Philosophy
==========

[A group eventually becomes its own worst enemy][group-enemy].
Every engineer that joins a company brings with them their
own opinion of how code in some programming language should
be written. Some languages are far more syntactically
flexible that the breadth of opinions can get out of
control. JavaScript is one of those languages. Furthermore,
JavaScript has a lot of semantics and syntax warts that need
to be controlled.

When this linter was first written, Uber had approximately
300 engineers. A year prior there were 60 engineers. It's
impossible to say how many engineers will be at Uber in a
years time, but its safe to say that there will be many more
engineers. The number of opinions grows with each engineer
joining the company and rarely does any engineer joining the
company have enough time to assimiliate the code styling of
the group they are joining. The proliferation of many
different coding styles while lots of code is being written
and committed to production results in code which looks
familiar only to the developer that first wrote it and
unfamiliar to all the others. And as more developers touch a
piece of code, it's likely to morph into something
unfamiliar to everyone. lint-trap solves this problem.

PEP-8 for Python and gofmt for golang make sure that all
idiomatic code written in either of those two languages
looks familiar to anyone fluent in each language,
respectively. lint-trap aims to do the same for all
JavaScript code written at Uber. Making sure all code feels
familiar has many benefits such as making it easily to
jump into an unfamiliar code base to create a hotfix when
you're on call or making sure that the diffs for any commit
is composed largely of changes in logic and code
organization instead of changes in style and whitespace.

[group-enemy]: http://www.shirky.com/writings/herecomeseverybody/group_enemy.html
