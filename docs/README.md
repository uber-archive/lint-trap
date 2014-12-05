# Rules

lint-trap combines rules from eslint, jscs and jshint. There is significant
overlap between these three linters. When a rule can be implemented in more
than one linter, the preference is to implement it in eslint first and jscs
second. jshint is legacy and implemented solely for consistent indentation
checking until eslint supports proper indentation checking.

## ESLint

* [globals][globals] List of allowed globals and workarounds for common globals we disallow

### errors

* [no-alert][no-alert] - disallow the use of `alert`, `confirm`, and `prompt`
* [no-array-constructor][no-array-constructor] - disallow use of the `Array` constructor
* [no-caller][no-caller] - disallow use of `arguments.caller` or `arguments.callee`
* [no-catch-shadow][no-catch-shadow] - disallow the catch clause parameter name being the same as a variable in the outer scope
* [no-comma-dangle][no-comma-dangle] - disallow trailing commas in object literals
* [no-cond-assign][no-cond-assign] - disallow assignment in conditional expressions
* [no-console][no-console] - disallow use of `console`
* [no-constant-condition][no-constant-condition] - disallow use of constant expressions in conditions
* [no-control-regex][no-control-regex] - disallow control characters in regular expressions
* [no-debugger][no-debugger] - disallow use of `debugger`
* [no-dupe-keys][no-dupe-keys] - disallow duplicate keys when creating object literals
* [no-empty][no-empty] - disallow empty statements
* [no-empty-class][no-empty-class] - disallow the use of empty character classes in regular expressions
* [no-empty-label][no-empty-label] - disallow use of labels for anything other then loops and switches
* [no-eval][no-eval] - disallow use of `eval()`
* [no-ex-assign][no-ex-assign] - disallow assigning to the exception in a `catch` block
* [no-extend-native][no-extend-native] - disallow adding to native types
* [no-extra-bind][no-extra-bind] - disallow unnecessary function binding
* [no-extra-boolean-cast][no-extra-boolean-cast] - disallow double-negation boolean casts in a boolean context
* [no-extra-semi][no-extra-semi] - disallow unnecessary semicolons
* [no-extra-strict][no-extra-strict] - disallow unnecessary use of `"use strict";` when already in strict mode
* [no-fallthrough][no-fallthrough] - disallow fallthrough of `case` statements
* [no-floating-decimal][no-floating-decimal] - disallow the use of leading or trailing decimal points in numeric literals
* [no-func-assign][no-func-assign] - disallow overwriting functions written as function declarations
* [no-implied-eval][no-implied-eval] - disallow use of `eval()`-like methods
* [no-inline-comments][no-inline-comments] - disallow comments inline after code
* [no-inner-declarations][no-inner-declarations] - disallow function or variable declarations in nested blocks
* [no-invalid-regexp][no-invalid-regexp] - disallow invalid regular expression strings in the `RegExp` constructor
* [no-irregular-whitespace][no-irregular-whitespace] - disallow irregular whitespace outside of strings and comments
* [no-iterator][no-iterator] - disallow usage of `__iterator__` property
* [no-label-var][no-label-var] - disallow labels that share a name with a variable
* [no-labels][no-labels] - disallow use of labeled statements
* [no-lone-blocks][no-lone-blocks] - disallow unnecessary nested blocks
* [no-lonely-if][no-lonely-if] - disallow if as the only statement in an else block
* [no-loop-func][no-loop-func] - disallow creation of functions within loops
* [no-mixed-spaces-and-tabs][no-mixed-spaces-and-tabs] - disallow mixed spaces and tabs for indentation
* [no-multi-spaces][no-multi-spaces] - disallow use of multiple spaces
* [no-multi-str][no-multi-str] - disallow use of multiline strings
* [no-multiple-empty-lines][no-multiple-empty-lines] - disallow multiple empty lines
* [no-native-reassign][no-native-reassign] - disallow reassignments of native objects
* [no-negated-in-lhs][no-negated-in-lhs] - disallow negation of the left operand of an `in` expression
* [no-new][no-new] - disallow use of new operator when not part of the assignment or comparison
* [no-new-func][no-new-func] - disallow use of new operator for `Function` object
* [no-new-object][no-new-object] - disallow use of the `Object` constructor
* [no-new-require][no-new-require] - disallow use of new operator with the `require` function
* [no-new-wrappers][no-new-wrappers] - disallows creating new instances of `String`,`Number`, and `Boolean`
* [no-obj-calls][no-obj-calls] - disallow the use of object properties of the global object (`Math` and `JSON`) as functions
* [no-octal][no-octal] - disallow use of octal literals
* [no-octal-escape][no-octal-escape] - disallow use of octal escape sequences in string literals, such as `var foo = "Copyright \251";`
* [no-path-concat][no-path-concat] - disallow string concatenation with `__dirname` and `__filename`
* [no-process-env][no-process-env] - disallow use of `process.env`
* [no-process-exit][no-process-exit] - disallow `process.exit()`
* [no-proto][no-proto] - disallow usage of `__proto__` property
* [no-redeclare][no-redeclare] - disallow declaring the same variable more then once
* [no-regex-spaces][no-regex-spaces] - disallow multiple spaces in a regular expression literal
* [no-return-assign][no-return-assign] - disallow use of assignment in `return` statement
* [no-script-url][no-script-url] - disallow use of javascript: urls.
* [no-self-compare][no-self-compare] - disallow comparisons where both sides are exactly the same
* [no-sequences][no-sequences] - disallow use of comma operator
* [no-shadow][no-shadow] - disallow declaration of variables already declared in the outer scope
* [no-shadow-restricted-names][no-shadow-restricted-names] - disallow shadowing of names such as `arguments`
* [no-space-before-semi][no-space-before-semi] - disallow space before semicolon
* [no-spaced-func][no-spaced-func] - disallow space between function identifier and application
* [no-sparse-arrays][no-sparse-arrays] - disallow sparse arrays
* [no-trailing-spaces][no-trailing-spaces] - disallow trailing whitespace at the end of lines
* [no-undef][no-undef] - disallow use of undeclared variables unless mentioned in a `/*global */` block
* [no-undef-init][no-undef-init] - disallow use of undefined when initializing variables
* [no-underscore-dangle][no-underscore-dangle] - disallow dangling underscores in identifiers
* [no-unreachable][no-unreachable] - disallow unreachable statements after a return, throw, continue, or break statement
* [no-unused-expressions][no-unused-expressions] - disallow usage of expressions in statement position
* [no-unused-vars][no-unused-vars] - disallow declaration of variables that are not used in the code
* [no-use-before-define][no-use-before-define] - disallow use of variables before they are defined
* [no-with][no-with] - disallow use of the `with` statement
* [no-wrap-func][no-wrap-func] - disallow wrapping of non-IIFE statements in parens
* [brace-style][brace-style] - enforce one true brace style
* [camelcase][camelcase] - require camel case names
* [comma-spacing][comma-spacing] - enforce spacing before and after comma
* [comma-style][comma-style] - enforce one true comma style
* [complexity][complexity] - specify the maximum cyclomatic complexity allowed in a program
* [consistent-return][consistent-return] - require `return` statements to either always or never specify values
* [consistent-this][consistent-this] - enforces consistent naming when capturing the current execution context
* [curly][curly] - specify curly brace conventions for all control statements
* [default-case][default-case] - require `default` case in `switch` statements
* [dot-notation][dot-notation] - encourages use of dot notation whenever possible
* [eol-last][eol-last] - enforce newline at the end of file, with no multiple empty lines
* [eqeqeq][eqeqeq] - require the use of `===` and `!==`
* [func-names][func-names] - require function expressions to have a name (off by default)
* [global-strict][global-strict] - require or disallow the `"use strict"` pragma in the global scope
* [guard-for-in][guard-for-in] - make sure `for-in` loops have an `if` statement
* [handle-callback-err][handle-callback-err] - enforces error handling in callbacks
* [key-spacing][key-spacing] - enforces spacing between keys and values in object literal properties
* [max-depth][max-depth] - specify the maximum depth that blocks can be nested
* [max-len][max-len] - specify the maximum length of a line in your program
* [max-nested-callbacks][max-nested-callbacks] - specify the maximum depth callbacks can be nested
* [max-params][max-params] - limits the number of parameters that can be used in the function declaration
* [max-statements][max-statements] - specify the maximum number of statement allowed in a function
* [new-cap][new-cap] - require a capital letter for constructors
* [new-parens][new-parens] - disallow the omission of parentheses when invoking a constructor with no arguments
* [quotes][quotes] - specify whether double or single quotes should be used
* [radix][radix] - require use of the second argument for `parseInt()`
* [semi][semi] - require or disallow use of semicolons instead of ASI
* [space-after-keywords][space-after-keywords] - require a space after certain keywords
* [space-before-blocks][space-before-blocks] - require or disallow space before blocks
* [space-in-parens][space-in-parens] - require or disallow spaces inside parentheses
* [space-infix-ops][space-infix-ops] - require spaces around operators
* [space-return-throw-case][space-return-throw-case] - require a space after `return`, `throw`, and `case`
* [space-unary-ops][space-unary-ops] - Require or disallow spaces before/after unary operators (words on, nonwords off)
* [spaced-line-comment][spaced-line-comment] - require or disallow a space immediately following the `//` in a line comment
* [strict][strict] - require that all functions are run in strict mode
* [use-isnan][use-isnan] - disallow comparisons with the value `NaN`
* [valid-jsdoc][valid-jsdoc] - Ensure JSDoc comments are valid
* [valid-typeof][valid-typeof] - Ensure that the results of typeof are compared against a valid string
* [wrap-iife][wrap-iife] - require immediate function invocation to be wrapped in parentheses
* [yoda][yoda] - require or disallow Yoda conditions

### warnings

### disabled

* [env][env] - all env presets are disabled
* [no-bitwise][no-bitwise] - disallow use of bitwise operators
* [no-div-regex][no-div-regex] - disallow division operators explicitly at beginning of regular expression
* [no-else-return][no-else-return] - disallow `else` after a `return` in an `if`
* [no-eq-null][no-eq-null] - disallow comparisons to null without a type-checking operator
* [no-extra-parens][no-extra-parens] - disallow unnecessary parentheses
* [no-mixed-requires][no-mixed-requires] - disallow mixing regular variable and require declarations
* [no-nested-ternary][no-nested-ternary] - disallow nested ternary expressions
* [no-plusplus][no-plusplus] - disallow use of unary operators, `++` and `--`
* [no-reserved-keys][no-reserved-keys] - disallow reserved words being used as object literal keys
* [no-restricted-modules][no-restricted-modules] - restrict usage of specified node modules
* [no-sync][no-sync] - disallow use of synchronous methods
* [no-ternary][no-ternary] - disallow the use of ternary operators
* [no-undefined][no-undefined] - disallow use of `undefined` variable
* [no-void][no-void] - disallow use of `void` operator
* [no-warning-comments][no-warning-comments] - disallow usage of configurable warning terms in comments - e.g. `TODO` or `FIXME`
* [block-scoped-var][block-scoped-var] - treat `var` statements as if they were block scoped

* [func-style][func-style] - enforces use of function declarations or expressions
* [one-var][one-var] - allow just one var statement per function
* [operator-assignment][operator-assignment] - require assignment operator shorthand where possible or prohibit it entirely
* [padded-blocks][padded-blocks] - enforce padding within blocks
* [quote-props][quote-props] - require quotes around object literal property names
* [sort-vars][sort-vars] - sort variables within the same declaration block
* [space-in-brackets][space-in-brackets] - require or disallow spaces inside brackets
* [vars-on-top][vars-on-top] - requires to declare all vars on top of their containing scope
* [wrap-regex][wrap-regex] - require regex literals to be wrapped in parentheses


## jscs

* [validateIndentation][jscs-validate-indentation]
* [maximumLineLength][jscs-maximum-line-lenth]
* [requireSpaceAfterKeywords][jscs-require-space-after-keywords]
* [disallowSpacesInFunctionDeclaration][jscs-spaces-in-functions]
* [disallowSpacesInNamedFunctionExpression][jscs-spaces-in-functions]
* [requireSpacesInFunctionDeclaration][jscs-spaces-in-functions]
* [requireSpacesInNamedFunctionExpression][jscs-spaces-in-functions]
* [requireSpacesInConditionalExpression][jscs-require-spaces-in-conditional-expression]
* [disallowTrailingComma][jscs-disallow-trailing-comma]
* [requireBlocksOnNewline][jscs-require-blocks-on-newline]
* [requireCurlyBraces][jscs-require-curly-braces]
* [disallowMultipleVarDecl][jscs-disallow-multiple-var-decl]
* [disallowEmptyBlocks][jscs-disallow-empty-blocks]
* [disallowSpaceAfterObjectKeys][jscs-disallow-space-after-object-keys]
* [requireCommaBeforeLineBreak][jscs-require-comma-before-line-break]
* [requireSpaceBeforeBinaryOperators][jscs-require-spaces-before-after-binary-operators]
* [disallowSpaceAfterPrefixUnaryOperators][jscs-disallow-space-after-prefix-unary-operators]
* [disallowKeywords][jscs-disallow-keywords]
* [disallowMultipleLineBreaks][jscs-disallow-multiple-line-breaks]
* [validateLineBreaks][jscs-validate-line-breaks]
* [validateQuoteMarks][jscs-validate-quote-marks]
* [disallowMixedSpacesAndTabs][jscs-disallow-mixed-spaces-and-tabs]
* [disallowTrailingWhitespace][jscs-disallow-trailing-white-space]
* [disallowKeywordsOnNewLine][jscs-disallow-keywords-on-new-line]
* [requireLineFeedAtFileEnd][jscs-require-line-feed-at-file-end]
* [requireDotNotation][jscs-require-dot-notation]

## JSHint

JSHint is currently deprecated in favor of ESLint. It is only included in 
lint-trap because eslint does not yet support indentation-checking and 
indentation-checking appears to be less restrictive in jscs than desired. 
Once one of these other tools properly checks indentation, JSHint will be
removed.

There are only a few items set in our `.jshintrc` rules file. These settings
are documented in our [JSHint Documentation][jshint-docs].


[globals]: eslint/globals.md
[env]: eslint/env.md
[no-alert]: eslint/no-alert.md
[no-array-constructor]: https://github.com/eslint/eslint/blob/master/docs/rules/no-array-constructor.md
[no-bitwise]: eslint/no-bitwise.md
[no-caller]: eslint/no-caller.md
[no-catch-shadow]: https://github.com/eslint/eslint/blob/master/docs/rules/no-catch-shadow.md
[no-comma-dangle]: https://github.com/eslint/eslint/blob/master/docs/rules/no-comma-dangle.md
[no-cond-assign]: https://github.com/eslint/eslint/blob/master/docs/rules/no-cond-assign.md
[no-console]: https://github.com/eslint/eslint/blob/master/docs/rules/no-console.md
[no-constant-condition]: https://github.com/eslint/eslint/blob/master/docs/rules/no-constant-condition.md
[no-control-regex]: https://github.com/eslint/eslint/blob/master/docs/rules/no-control-regex.md
[no-debugger]: https://github.com/eslint/eslint/blob/master/docs/rules/no-debugger.md
[no-div-regex]: https://github.com/eslint/eslint/blob/master/docs/rules/no-div-regex.md
[no-dupe-keys]: https://github.com/eslint/eslint/blob/master/docs/rules/no-dupe-keys.md
[no-else-return]: https://github.com/eslint/eslint/blob/master/docs/rules/no-else-return.md
[no-empty]: eslint/no-empty.md
[no-empty-class]: https://github.com/eslint/eslint/blob/master/docs/rules/no-empty-class.md
[no-empty-label]: https://github.com/eslint/eslint/blob/master/docs/rules/no-empty-label.md
[no-eq-null]: https://github.com/eslint/eslint/blob/master/docs/rules/no-eq-null.md
[no-eval]: https://github.com/eslint/eslint/blob/master/docs/rules/no-eval.md
[no-ex-assign]: https://github.com/eslint/eslint/blob/master/docs/rules/no-ex-assign.md
[no-extend-native]: eslint/no-extend-native.md
[no-extra-bind]: https://github.com/eslint/eslint/blob/master/docs/rules/no-extra-bind.md
[no-extra-boolean-cast]: https://github.com/eslint/eslint/blob/master/docs/rules/no-extra-boolean-cast.md
[no-extra-parens]: https://github.com/eslint/eslint/blob/master/docs/rules/no-extra-parens.md
[no-extra-semi]: https://github.com/eslint/eslint/blob/master/docs/rules/no-extra-semi.md
[no-extra-strict]: https://github.com/eslint/eslint/blob/master/docs/rules/no-extra-strict.md
[no-fallthrough]: https://github.com/eslint/eslint/blob/master/docs/rules/no-fallthrough.md
[no-floating-decimal]: https://github.com/eslint/eslint/blob/master/docs/rules/no-floating-decimal.md
[no-func-assign]: https://github.com/eslint/eslint/blob/master/docs/rules/no-func-assign.md
[no-implied-eval]: https://github.com/eslint/eslint/blob/master/docs/rules/no-implied-eval.md
[no-inline-comments]: https://github.com/eslint/eslint/blob/master/docs/rules/no-inline-comments.md
[no-inner-declarations]: https://github.com/eslint/eslint/blob/master/docs/rules/no-inner-declarations.md
[no-invalid-regexp]: https://github.com/eslint/eslint/blob/master/docs/rules/no-invalid-regexp.md
[no-irregular-whitespace]: https://github.com/eslint/eslint/blob/master/docs/rules/no-irregular-whitespace.md
[no-iterator]: https://github.com/eslint/eslint/blob/master/docs/rules/no-iterator.md
[no-label-var]: https://github.com/eslint/eslint/blob/master/docs/rules/no-label-var.md
[no-labels]: https://github.com/eslint/eslint/blob/master/docs/rules/no-labels.md
[no-lone-blocks]: https://github.com/eslint/eslint/blob/master/docs/rules/no-lone-blocks.md
[no-lonely-if]: https://github.com/eslint/eslint/blob/master/docs/rules/no-lonely-if.md
[no-loop-func]: https://github.com/eslint/eslint/blob/master/docs/rules/no-loop-func.md
[no-mixed-requires]: https://github.com/eslint/eslint/blob/master/docs/rules/no-mixed-requires.md
[no-mixed-spaces-and-tabs]: https://github.com/eslint/eslint/blob/master/docs/rules/no-mixed-spaces-and-tabs.md
[no-multi-spaces]: https://github.com/eslint/eslint/blob/master/docs/rules/no-multi-spaces.md
[no-multi-str]: https://github.com/eslint/eslint/blob/master/docs/rules/no-multi-str.md
[no-multiple-empty-lines]: https://github.com/eslint/eslint/blob/master/docs/rules/no-multiple-empty-lines.md
[no-native-reassign]: https://github.com/eslint/eslint/blob/master/docs/rules/no-native-reassign.md
[no-negated-in-lhs]: https://github.com/eslint/eslint/blob/master/docs/rules/no-negated-in-lhs.md
[no-nested-ternary]: https://github.com/eslint/eslint/blob/master/docs/rules/no-nested-ternary.md
[no-new]: eslint/no-new.md
[no-new-func]: https://github.com/eslint/eslint/blob/master/docs/rules/no-new-func.md
[no-new-object]: https://github.com/eslint/eslint/blob/master/docs/rules/no-new-object.md
[no-new-require]: https://github.com/eslint/eslint/blob/master/docs/rules/no-new-require.md
[no-new-wrappers]: https://github.com/eslint/eslint/blob/master/docs/rules/no-new-wrappers.md
[no-obj-calls]: https://github.com/eslint/eslint/blob/master/docs/rules/no-obj-calls.md
[no-octal]: https://github.com/eslint/eslint/blob/master/docs/rules/no-octal.md
[no-octal-escape]: https://github.com/eslint/eslint/blob/master/docs/rules/no-octal-escape.md
[no-path-concat]: https://github.com/eslint/eslint/blob/master/docs/rules/no-path-concat.md
[no-plusplus]: eslint/no-plusplus.md
[no-process-env]: https://github.com/eslint/eslint/blob/master/docs/rules/no-process-env.md
[no-process-exit]: https://github.com/eslint/eslint/blob/master/docs/rules/no-process-exit.md
[no-proto]: https://github.com/eslint/eslint/blob/master/docs/rules/no-proto.md
[no-redeclare]: https://github.com/eslint/eslint/blob/master/docs/rules/no-redeclare.md
[no-regex-spaces]: https://github.com/eslint/eslint/blob/master/docs/rules/no-regex-spaces.md
[no-reserved-keys]: https://github.com/eslint/eslint/blob/master/docs/rules/no-reserved-keys.md
[no-restricted-modules]: https://github.com/eslint/eslint/blob/master/docs/rules/no-restricted-modules.md
[no-return-assign]: https://github.com/eslint/eslint/blob/master/docs/rules/no-return-assign.md
[no-script-url]: https://github.com/eslint/eslint/blob/master/docs/rules/no-script-url.md
[no-self-compare]: https://github.com/eslint/eslint/blob/master/docs/rules/no-self-compare.md
[no-sequences]: https://github.com/eslint/eslint/blob/master/docs/rules/no-sequences.md
[no-shadow]: https://github.com/eslint/eslint/blob/master/docs/rules/no-shadow.md
[no-shadow-restricted-names]: https://github.com/eslint/eslint/blob/master/docs/rules/no-shadow-restricted-names.md
[no-space-before-semi]: https://github.com/eslint/eslint/blob/master/docs/rules/no-space-before-semi.md
[no-spaced-func]: https://github.com/eslint/eslint/blob/master/docs/rules/no-spaced-func.md
[no-sparse-arrays]: https://github.com/eslint/eslint/blob/master/docs/rules/no-sparse-arrays.md
[no-sync]: https://github.com/eslint/eslint/blob/master/docs/rules/no-sync.md
[no-ternary]: https://github.com/eslint/eslint/blob/master/docs/rules/no-ternary.md
[no-trailing-spaces]: https://github.com/eslint/eslint/blob/master/docs/rules/no-trailing-spaces.md
[no-undef]: eslint/no-undef.md
[no-undef-init]: https://github.com/eslint/eslint/blob/master/docs/rules/no-undef-init.md
[no-undefined]: https://github.com/eslint/eslint/blob/master/docs/rules/no-undefined.md
[no-underscore-dangle]: https://github.com/eslint/eslint/blob/master/docs/rules/no-underscore-dangle.md
[no-unreachable]: https://github.com/eslint/eslint/blob/master/docs/rules/no-unreachable.md
[no-unused-expressions]: https://github.com/eslint/eslint/blob/master/docs/rules/no-unused-expressions.md
[no-unused-vars]: eslint/no-unused-vars.md
[no-use-before-define]: eslint/no-use-before-define.md
[no-void]: https://github.com/eslint/eslint/blob/master/docs/rules/no-void.md
[no-warning-comments]: https://github.com/eslint/eslint/blob/master/docs/rules/no-warning-comments.md
[no-with]: https://github.com/eslint/eslint/blob/master/docs/rules/no-with.md
[no-wrap-func]: https://github.com/eslint/eslint/blob/master/docs/rules/no-wrap-func.md
[block-scoped-var]: https://github.com/eslint/eslint/blob/master/docs/rules/block-scoped-var.md
[brace-style]: https://github.com/eslint/eslint/blob/master/docs/rules/brace-style.md
[camelcase]: eslint/camelcase.md
[comma-spacing]: https://github.com/eslint/eslint/blob/master/docs/rules/comma-spacing.md
[comma-style]: https://github.com/eslint/eslint/blob/master/docs/rules/comma-style.md
[complexity]: eslint/complexity.md
[consistent-return]: https://github.com/eslint/eslint/blob/master/docs/rules/consistent-return.md
[consistent-this]: https://github.com/eslint/eslint/blob/master/docs/rules/consistent-this.md
[curly]: https://github.com/eslint/eslint/blob/master/docs/rules/curly.md
[default-case]: https://github.com/eslint/eslint/blob/master/docs/rules/default-case.md
[dot-notation]: https://github.com/eslint/eslint/blob/master/docs/rules/dot-notation.md
[eol-last]: https://github.com/eslint/eslint/blob/master/docs/rules/eol-last.md
[eqeqeq]: eslint/eqeqeq.md
[func-names]: eslint/func-names.md
[func-style]: https://github.com/eslint/eslint/blob/master/docs/rules/func-style.md
[global-strict]: eslint/global-strict.md
[guard-for-in]: eslint/guard-for-in.md
[handle-callback-err]: https://github.com/eslint/eslint/blob/master/docs/rules/handle-callback-err.md
[key-spacing]: https://github.com/eslint/eslint/blob/master/docs/rules/key-spacing.md
[max-depth]: eslint/max-depth.md
[max-len]: https://github.com/eslint/eslint/blob/master/docs/rules/max-len.md
[max-nested-callbacks]: https://github.com/eslint/eslint/blob/master/docs/rules/max-nested-callbacks.md
[max-params]: eslint/max-params.md
[max-statements]: https://github.com/eslint/eslint/blob/master/docs/rules/max-statements.md
[new-cap]: eslint/new-cap.md
[new-parens]: https://github.com/eslint/eslint/blob/master/docs/rules/new-parens.md
[one-var]: https://github.com/eslint/eslint/blob/master/docs/rules/one-var.md
[operator-assignment]: https://github.com/eslint/eslint/blob/master/docs/rules/operator-assignment.md
[padded-blocks]: https://github.com/eslint/eslint/blob/master/docs/rules/padded-blocks.md
[quote-props]: https://github.com/eslint/eslint/blob/master/docs/rules/quote-props.md
[quotes]: https://github.com/eslint/eslint/blob/master/docs/rules/quotes.md
[radix]: https://github.com/eslint/eslint/blob/master/docs/rules/radix.md
[semi]: https://github.com/eslint/eslint/blob/master/docs/rules/semi.md
[sort-vars]: https://github.com/eslint/eslint/blob/master/docs/rules/sort-vars.md
[space-after-keywords]: https://github.com/eslint/eslint/blob/master/docs/rules/space-after-keywords.md
[space-before-blocks]: https://github.com/eslint/eslint/blob/master/docs/rules/space-before-blocks.md
[space-in-brackets]: https://github.com/eslint/eslint/blob/master/docs/rules/space-in-brackets.md
[space-in-parens]: https://github.com/eslint/eslint/blob/master/docs/rules/space-in-parens.md
[space-infix-ops]: https://github.com/eslint/eslint/blob/master/docs/rules/space-infix-ops.md
[space-return-throw-case]: https://github.com/eslint/eslint/blob/master/docs/rules/space-return-throw-case.md
[space-unary-ops]: https://github.com/eslint/eslint/blob/master/docs/rules/space-unary-ops.md
[spaced-line-comment]: https://github.com/eslint/eslint/blob/master/docs/rules/spaced-line-comment.md
[strict]: https://github.com/eslint/eslint/blob/master/docs/rules/strict.md
[use-isnan]: https://github.com/eslint/eslint/blob/master/docs/rules/use-isnan.md
[valid-jsdoc]: https://github.com/eslint/eslint/blob/master/docs/rules/valid-jsdoc.md
[valid-typeof]: https://github.com/eslint/eslint/blob/master/docs/rules/valid-typeof.md
[vars-on-top]: https://github.com/eslint/eslint/blob/master/docs/rules/vars-on-top.md
[wrap-iife]: eslint/wrap-iife.md
[wrap-regex]: https://github.com/eslint/eslint/blob/master/docs/rules/wrap-regex.md
[yoda]: https://github.com/eslint/eslint/blob/master/docs/rules/yoda.md


[jscs-validate-indentation]: jscs/validate-indentation.md
[jscs-maximum-line-length]: jscs/maximum-line-length.md
[jscs-require-space-after-keywords]: jscs/require-space-after-keywords.md
[jscs-spaces-in-functions]: jscs/spaces-in-functions.md
[jscs-require-spaces-in-conditional-expression]: jscs/require-spaces-in-conditional-expression.md
[jscs-disallow-trailing-comma]: jscs/disallow-trailing-comma.md
[jscs-require-blocks-on-newline]: jscs/require-blocks-on-newline.md
[jscs-require-curly-braces]: jscs/require-curly-braces.md
[jscs-disallow-multiple-var-decl]: jscs/disallow-multiple-var-decl.md
[jscs-disallow-empty-blocks]: jscs/disallow-empty-blocks.md
[jscs-disallow-space-after-object-keys]: jscs/disallow-space-after-object-keys.md
[jscs-require-comma-before-line-break]: jscs/require-comma-before-line-break.md
[jscs-require-spaces-before-after-binary-operators]: jscs/require-spaces-before-after-binary-operators.md
[jscs-disallow-space-after-prefix-unary-operators]: jscs/disallow-space-after-prefix-unary-operators.md
[jscs-disallow-keywords]: jscs/disallow-keywords.md
[jscs-disallow-multiple-line-breaks]: jscs/disallow-multiple-line-breaks.md
[jscs-validate-line-breaks]: jscs/validate-line-breaks.md
[jscs-validate-quote-marks]: jscs/validate-quote-marks.md
[jscs-disallow-mixed-spaces-and-tabs]: jscs/disallow-mixed-spaces-and-tabs.md
[jscs-disallow-trailing-white-space]: jscs/disallow-trailing-white-space.md
[jscs-disallow-keywords-on-new-line]: jscs/disallow-keywords-on-new-line.md
[jscs-require-line-feed-at-file-end]: jscs/require-line-feed-at-file-end.md
[jscs-require-dot-notation]: jscs/require-dot-notation.md


[jshint-docs]: jshint/jshint.md
