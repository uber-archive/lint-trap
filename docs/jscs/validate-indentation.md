# validateIndentation

    "validateIndentation": 4

While the default value is 4, this rule is dynamically generated based on the
indentation style already used in a project.

**We may want to re-evaluate** this in the near future. Raynos recommends that
we change to 8 spaces. 8 spaces forces you to allocated and abuse closures
willy nilly. It also forces you to break nested functions out into function
declarations.

Making it harder to write messy code raises the average code quality. Making it
harder to write closures removes memory leaks from real production code.
