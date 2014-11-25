# global-strict

    "global-strict": [2, "always"]

The way commonJS works is that it wraps your file in a
function expression. This means that something which looks
like a global strict statement is actually isolated by a
function expression.

This means that the globalstrict bug is actually impossible
and should not be an error.

Strict mode also causes modifications to objects frozen with
`Object.freeze` to throw TypeErrors, which is desirable.

If you need a quick and easy way to add `'use strict'` to
every JavaScript file in your project, you can use the
execute the following shell script at the root of your
project:

    git ls-files | grep \.js$ |
    while read f; do
        if (head -n3 "$f" | grep -Fv 'use strict' > /dev/null); then
            echo "$f"
            if (head -n1 "$f" | grep -Fv '#!/' > /dev/null); then
                sed -i '' -e '1 i\
                    '\''use strict'\'';
                ' "$f"
            else
                sed -i '' -e '2 i\
                    '\''use strict'\'';
                ' "$f"
            fi
        fi
    done

Just save that in a file, `chmod +x` it, and then execute
it. I recommend you double check that everything worked
correctly with `git diff` before you lint again and commit
your changes.

[Official `global-strict` ESLint Rule Documentation][global-strict-docs]

[global-strict-docs]: https://github.com/eslint/eslint/blob/master/docs/rules/global-strict.md
