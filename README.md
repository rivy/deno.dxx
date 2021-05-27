<!-- spell-checker:ignore (names) Deno Gitter (utils) dprint -->

# 🦕 Enhanced Deno commands

## `dxf`, `dxi`, `dxr`, and `dxx`

Fixes...

- ref: [🙏🏻[feat/req] supply $0/%0 to shimmed scripts (cross-platform)](https://github.com/denoland/deno/issues/9874)
- ref: [🙏🏻[feat/req] suppress annoying "Terminate batch job (Y/N)?" for shimmed deno scripts (Windows)](https://github.com/denoland/deno/issues/9873)
- ref: [🐛(or feat request?) CLI apps need original command line (Windows)](https://github.com/denoland/deno/issues/9871)

### formatter (`dxf`)

automatically runs `dprint fmt` if `dprint` is available and a config is found in the main repo directory o/w runs `deno fmt`

### installer (`dxi`)

- installs command scripts with an enhanced shim

  - command line expansion enhancement (when using the 'xProcess' library)
    - enables automated, bash-like command line expansion (including full brace and advanced glob expansion) for Windows platforms; pass-through for non-Windows platforms
    - enables scripts to more accurately determine the their invocation text which allows scripts to show accurate help and examples
  - blocks the annoying "Terminate batch job (Y/N)?" console question when using CTRL-C to interrupt the script
    - the visible "^C^C" can likely be removed as well with signal handling (see feat/req @ <https://github.com/denoland/deno/issues/9995>)

- WIP
  - can enhance current shims

### runner (`dxr`)

- runs scripts with the same command line expansion enhancements as `dxi`

- WIP
  - automatically run dexter / XTR files
  - automatically set requested permissions
    - warn when setting without a CLI specification
  - can run distant scripts from the command line
    - like `dpx` but also searches within additional directories ('src', ...)
    - can also install the remote script with an '--install' flag

### integrator (`dxx`)

- WIP

## dexter / xtr

- WIP
