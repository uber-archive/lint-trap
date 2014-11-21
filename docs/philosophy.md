Philosophy
==========

[A group of people often becomes its own worst enemy][group-
enemy]. Every engineer that joins a company brings with them
their own opinion of how code in some programming language
should be written. Some languages are far more syntactically
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
unfamiliar to everyone.

[group-enemy]: http://www.shirky.com/writings/herecomeseverybody/group_enemy.html
