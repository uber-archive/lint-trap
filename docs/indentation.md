Dynamic Indentation
===================

The decision to dynamically detect and support indentation
on a project by project basis was done after lots of
deliberation on which rules had technical merit (see
[documentation][docs]) and which ones are merely opinions
that are that should be consistently enforced. The choice
between 2-spaces and 4-spaces was the most contentious rule
is one that results in endless bikeshedding discussions
devoid of technical arguments in favor of either preference.

The algorithm used to determine the reference file from
which indentation is detected is as follows:

 - use the file defined in the `main` property of 
   `package.json` in the current working directory.
 - use index.js in the current working directory
 - use the first file resolved when expanding the path
   arguments with which lint-trap was run.

See [set-rules.js][set-rules.js] for the implementation.

[set-rules.js]: https://github.com/uber/lint-trap/blob/master/set-rules.js
