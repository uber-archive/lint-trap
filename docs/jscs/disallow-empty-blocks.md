# disallowEmptyBlocks

    "disallowEmptyBlocks": true

Missing blocks are either a sign that a developer intended to do something, but
forgot to implement it or its a sign that a developer is not following the
[YAGNI][yagni] rule. The only case where it's appropriate to have an empty
block is `function noop() {};`. Empty blocks are generally bad. Especially if
you have an empty catch block.

[yagni]: http://en.wikipedia.org/wiki/You_aren't_gonna_need_it
