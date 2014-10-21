# JShint guidelines.

## Status quo.

#### `"bitwise": false`

Bitwise operations are valuable sometimes. The hinting rules
    should not ban them as bitwise operators are not a source of
    bugs.

#### `"camelcase": true`

Combining multiple styles together is a source of frustration
    in having to remember what the property names are.

JavaScript does not have a good auto complete so knowing what
    the casing of a property is makes working with JavaScript
    easier.

We should enforce camelcase. For the few use cases where you
    need to access keys on JSON blobs coming from an external
    process that has snake case you can use an exclude statement.

#### `"globalstrict": true`

The way commonJS works is that it wraps your file in a function
    expression. This means that something which looks like a
    global strict statement is actually isolated by a function
    expression.

This means that the globalstrict bug is actually impossible and
    should not be an error.

#### `"curly": false`

For legacy reasons curly is turned off. In theory this would be
    a good addition since it gaurds against bugs but it was
    too "refactor expensive" to turn on.

**We should change** this in the near future to `true`

#### `"eqeqeq": true`

Type coercion is a bad part of JavaScript and leads to real
    production bugs where you accidentally treat numbers and
    strings the same and then accidentally send a string instead
    of a number down a response.

There are no good use cases for `==`.

#### `"forin": true`

Not using `Object.hasOwnProperty` can lead to subtle bugs. It's
    a good practice to make up for javascripts for loop semantics.

However it should be noted that using `Object.keys(o)` is
    preferred instead of the for in loop.

#### `"immed": true`

Having an immediately invoked function expression that is 200
    lines long can be very easily mistaked for a function
    declaration.

Forcing people to wrap it in braces distinquishes it from a
    function declaration and makes reasoning about code easier.

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

#### `"latedef": "nofunc"`

Variables should be declared before they are used. Since
    javascript hoists variables to the top of the function then
    the value is `undefined` if you use them before assignment
    which is always the wrong thing.

We exclude function declarations as those are hoisted with their
    value. i.e. if you use a function declaration before it's
    defined then you will always reference said function.

The function declaration hoisting technique can also be used
    to avoid circular dependencies.

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
