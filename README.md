<!-- spell-checker:ignore (names) Deno Gitter (utils) dprint -->

# 🦕 Enhanced Deno commands

## `dxf`, `dxi`, `dxr`, and `dxx`

### formatter (`dxf`)

automatically runs `dprint fmt` if `dprint` is available and a config is found in the main repo directory o/w runs `deno fmt`

### installer (`dxi`)

- shim supplies original name and argument string to the script
  - allows bash-like argument parsing for Windows scripts
  - allows construction of help text with the actual execution command name instead of a stand-in => exact/true instructions
- blocks the annoying "Terminate batch job (Y/N)?" console question when using CTRL-C to interrupt the script
  - the visible "^C^C" can likely be removed as well with signal handling
    - see feat/req @ <https://github.com/denoland/deno/issues/9995>
- ref: [🙏🏻[feat/req] supply $0/%0 to shimmed scripts (cross-platform)](https://github.com/denoland/deno/issues/9874)
- ref: [🙏🏻[feat/req] suppress annoying "Terminate batch job (Y/N)?" for shimmed deno scripts (Windows)](https://github.com/denoland/deno/issues/9873)
- ref: [🐛(or feat request?) CLI apps need original command line (Windows)](https://github.com/denoland/deno/issues/9871)
- can enhance current shims

### runner (`dxr`)

- automatically run dexter / XTR files
- automatically set requested permissions
  - warn when setting without a CLI specification
- can run distant scripts from the command line
  - like `dpx` but also searches within additional directories ('src', ...)
  - can also install the remote script with an '--install' flag

### integrator (`dxx`)

## dexter / xtr
