# JShint guidelines.

JSHint is deprecated and will be removed entirely once ESLint or jscs 
properly checks indentation for a whole project.

#### `"globalstrict": true`

ESLint already takes care of this linting issue, but we need to keep
this in the JSHint file to override the JSHint defaults.







#### `"indent": 4`

Indentation is set at 4 spaces by default. I don't know what
    the original reason was.

**We should re-evaluate** this in the near future. I would
    recommend that we change to 8 spaces. 8 spaces forces you to
    allocated and abuse closures willy nilly. It also forces
    you to break nested functions out into function declarations.

Making it harder to write messy code raises the average code
    quality. Making it harder to write closures removes memory
    leaks from real production code.


#### `"newcap": false`

This rule is too aggressive. Code should be using strict mode
    so forgetting to call a constructor with `new` will correctly
    lead to trying to assign a property to `this`, i.e. `undefined`
    which is a thrown exception.

We should also discourage that people use `new` as part of their
    public interface, having to remember whether to call a
    module with `new` or not is frustrating in the same sense
    that having to remember whether a property is camelCase or
    snake_case.

#### `"noarg": true`

This is general performance hygiene. These features are banned
    in strict mode as well.

#### `"nonew": true`

If you find yourself calling a constructor without using the
    result then that's a bad constructor.

A constructor function just allocates an object with a fixed
    set of fields, if it has a side effect then something went
    terribly wrong.

#### `"plusplus": false`

Banning `++` and `--` is a stylistic thing that has little value.
    It makes writing plain for loops far more tedious.

#### `"quotmark": false`

quotmark is set to false for legacy reasons.

**We should change** this to single quotes consistently. Mixing
    both styles in the single file is just unneeded confusion.

#### `"regexp": false`

I don't think this is a valid JSHint option. This must be here
    for legacy reasons.

The property was probably removed from recent JSHint versions.

#### `"undef": true`

This one is really important. If your using an undefined
    variable then that is a typo and a bug. Having the hinter
    catch that reduces bugs significantly.

Using global variables that are not defined in the file is also
    an anti-pattern. You have `require` and you can
    `require('global')` if you need access to the global scope.

Being explicit is always better.

#### `"unused": "vars"`

Checking for unused variables is very useful when it comes to
    refactoring.

This allows you to remove dead code.

Note that `unused` is set to `"vars"` only. Unused parameters
    are useful to define if you pass a callback or listener
    to another module and only use one out of N arguments.

An `unused` function parameter is not actually a bug and nor
    is it something that needs to be cleaned up.

#### `"strict": false`

Strict mode is set to false for legacy reasons.

**We should change** strict mode to true as it gets rid of a lot
    of bugs. Especially being able to use `Object.freeze`.

#### `"trailing": true`

Trailing is set for legacy reasons. This property was removed
    in a recent version of JSHint

#### `"noempty": true`

Warning about empty blocks helps with code refactors and dead
    code removal.

It also helps you to catch empty catch blocks as those should
    be banned.

#### `"maxdepth": 4`

maxdepth is set to force you to not indent forever. Deeply
    indented code is generally a smell of bad code.

You should break code out into helper functions.

#### `"maxparams": 4`

A function with 6 parameters does far too much. We should force
    people to carefully design their functions and switch to
    using an options object, ala named parameters if they
    have too many positional parameters.

#### `"globals": { ... }`

We manually whitelist the set of globals as the ones build into
    JSHint are either wrong or too aggressive.

**We should change** the list of globals to just be:

```json
{
    "__dirname": false,
    "__filename": false,
    "require": false,
    "module": false
}
```

If you want any other globals you can require them. i.e.

 - `require('timers').setTimeout`
 - `require('buffer').Buffer`
 - `require('process')`
 - `require('global')`
 - `require('console')`

## Additions

Below is a list of options not currently set that should
    probably be set.

#### `"freeze": true`

Setting to true bans native prototype mutation. Native prototype
    mutation is a terrible idea and breaks the npm modularity
    system by running into name collisions.

#### `"maxcomplexity": 10`

We should set a default on cyclomatic complexity. Cyclomatic
    complexity is not something that should be enforce perse but
    it's a great guideline to prompt the application developer
    to either break his code into smaller functions or add an
    exclusion comment.

#### `"maxlen": 80`

We should have a line limit for consistency. I recommend 80 as
    it's the most common and standard limit.

It's also incredibly useful for being able to view multiple
    buffers side by side in either your editor or terminal.
