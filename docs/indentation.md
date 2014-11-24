Dynamic Indentation
===================

lint-trap dynamically detects the indentation used in your
project so you don't have to configure indentation settings
manually. 

The decision to dynamically detect and support indentation
on a project by project basis was done after lots of
deliberation on which rules had technical merit (see
[documentation][docs]) and which ones are merely opinions
that are that should be consistently enforced. The choice
between 2-spaces and 4-spaces was the most contentious rule
and is one that results in endless bikeshedding discussions
devoid of arguments with technical merit in favor of either
preference.

The algorithm used to determine the reference file from
which indentation is detected is as follows:

 - use the file defined in the `main` property of 
   `package.json` in the current working directory.
 - use index.js in the current working directory
 - use the first file resolved when expanding the path
   arguments with which lint-trap was run.

If your `"main"` property in package.json is not properly
configured, lint-trap is likely to error out. The algos
for determining indentation of a project is still a bit
flaky. This algorithm should become more stable over time
and may even support support using settings defined in a
.editorconfig
See [set-rules.js][set-rules.js] for the implementation.

[set-rules.js]: https://github.com/uber/lint-trap/blob/master/set-rules.js
