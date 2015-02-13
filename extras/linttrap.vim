"============================================================================
"File:        linttrap.vim
"Description: Zero-config JavaScript syntax checker (eslint, jscs, jshint)
"Maintainer:  Andrew de Andrade <andrew at deandrade dot com dot br>
"License:     This program is free software. It comes without any warranty,
"             to the extent permitted by applicable law. You can redistribute
"             it and/or modify it under the terms of the Do What The Fuck You
"             Want To Public License, Version 2, as published by Sam Hocevar.
"             See http://sam.zoy.org/wtfpl/COPYING for more details.
"============================================================================

if exists('g:loaded_syntastic_javascript_linttrap_checker')
    finish
endif
let g:loaded_syntastic_javascript_linttrap_checker = 1

if !exists('g:syntastic_javascript_linttrap_sort')
    let g:syntastic_javascript_linttrap_sort = 1
endif

let s:save_cpo = &cpo
set cpo&vim

function! SyntaxCheckers_javascript_linttrap_IsAvailable() dict
    if !executable(self.getExec())
        return 0
    endif

    let ver = syntastic#util#getVersion(self.getExecEscaped() . ' --version')

    return syntastic#util#versionIsAtLeast(ver, [0, 4, 0])
endfunction

function! SyntaxCheckers_javascript_linttrap_GetLocList() dict

    let makeprg = self.makeprgBuild({ 'args_before': '--reporter=compact' })

    let errorformat =
        \ '%E%f: line %l\, col %c\, Error - %m,' .
        \ '%W%f: line %l\, col %c\, Warning - %m'

    let loclist = SyntasticMake({
        \ 'makeprg': makeprg,
        \ 'errorformat': errorformat,
        \ 'postprocess': ['guards'] })

    for e in loclist
        let e['col'] += 1
    endfor

    return loclist
endfunction

call g:SyntasticRegistry.CreateAndRegisterChecker({
    \ 'filetype': 'javascript',
    \ 'name': 'linttrap',
    \ 'exec': 'lint-trap' })

let &cpo = s:save_cpo
unlet s:save_cpo

" vim: set et sts=4 sw=4:
