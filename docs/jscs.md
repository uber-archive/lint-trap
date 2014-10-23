# JSCS guidelines

## Status quo.

#### `"validateIndentation": 4`

Indentation is currently set to four. I don't know what the
    original reason was.

**We should re-evaluate** this in the near future. I would
    recommend that we change to 8 spaces. 8 spaces forces you to
    allocated and abuse closures willy nilly. It also forces
    you to break nested functions out into function declarations.

Making it harder to write messy code raises the average code
    quality. Making it harder to write closures removes memory
    leaks from real production code.

#### `"maximumLineLength": 80`

We should have a line limit for consistency. I recommend 80 as
    it's the most common and standard limit.

It's also incredibly useful for being able to view multiple
    buffers side by side in either your editor or terminal.

Writing code within 80 characters is not hard. People have
    been doing it effectively for decades.

Research also suggest that the optimum line length for reading
    text is between 50 and 60 characters.

#### `"requireSpaceAfterKeywords"`

We should have consistency in spacing. The following keywords
    should be followed by a space.

`["if", "else", "for", "while", "do", "switch",
    "return", "try", "catch"]`

#### `"disallowSpacesInFunctionExpression"`

We should have consistent spacing in function definitions.

#### `"disallowTrailingComma": true`

Trailing commas break in JSON, they also break in older
    browsers.

We should not use them to make authoring JS & JSON consistent.

#### `"requireBlocksOnNewline": true`

If your going to use a block then use a new line. putting a
    block in a single line encourages terse and unreadable code.

#### `"requireCurlyBraces"`

We should encourage using curly braces as it avoids the 
    multiple statements bug and also discourages long terse lines

#### `"disallowMultipleVarDecl": true`

Var statements should be one per line. This makes them
    easier to move around and refactor without messing around
    with commas and semicolons.

#### `"disallowEmptyBlocks": true`

Empty blocks are generally bad. Especially if you have an
    empty catch block.

#### `"disallowSpaceAfterObjectKeys": true`

Object literals should be consistent in terms of whitespace.

#### `"disallowKeywords"`

`"with"` is banned in strict mode and thus banned in JSCS.

`["try", "catch", "finally"]` are also banned. In JavaScript
    one should not use try catch for control flow.

If you are using something like `JSON.parse` that throws you
    should instead `safe-json-parse`
    ( https://www.npmjs.org/package/safe-json-parse ).

#### `"disallowMultipleLineBreaks": true`

new lines should be consistent.

#### `"validateQuoteMarks"`

We should have consistent quote marks. Mixing the two causes
    overhead and confusion.

#### `"disallowMixedSpacesAndTabs"`

People that mix spaces and tabs are evil.

#### `"disallowKeywordsOnNewLine"`

Our if statements should be consistent.

Favour:

```js
if (foo) {
    x
} else {
    y
}
```

Do not use:

```js
if (foo) {
    x
}
else {
    y
}
```

#### `"requireDotNotation"`

property access should be consistent.
