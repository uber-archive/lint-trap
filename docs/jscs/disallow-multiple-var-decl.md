# disallowMultipleVarDecl

    "disallowMultipleVarDecl": true

Var statements should be one per line. This rule enforces consistency and
eliminates a source of runtime bugs when a comma-separated variable declaration
list is modified, resulting in a missing comma or extraneous comma. This makes
variable declarations easier to move around and refactor without messing around
with commas and semicolons.
