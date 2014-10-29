# requireDotNotation

    "requireDotNotation": true

Property access should be consistent. All objects should be accessed via dot
notation unless the object key cannot be expressed in dot notation. This makes
code more readable and maximally minifiable. The only legitimate reason to
revisit this rule is to allow us to use Google's Closure Compiler in advanced
compression mode.
