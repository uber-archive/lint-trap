# JShint guidelines.

JSHint is deprecated and will be removed entirely once
ESLint or jscs  properly checks indentation for a whole
project.

#### `"globalstrict": true`

ESLint already takes care of this linting issue, but we need
to keep this in the JSHint file to override the JSHint
defaults.

#### `"indent": 4`

Indentation validation is handled by jscs. For whatever
reason, JSHint does not properly validate indentation.

#### `"globals": { ... }`

We manually whitelist/blacklist the set of globals as the
ones build into JSHint are either wrong or too aggressive.
The only allowed globals are: `__dirname`, `__filename`,
`require` and `module`.

#### `"undef": true`

This rule should be disabled. Unfortunately, there is a bug
in JSHint that does not allow this to be turned off.
