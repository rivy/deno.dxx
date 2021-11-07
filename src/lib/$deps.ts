export * as Colors from 'https://deno.land/std@0.113.0/fmt/colors.ts';
export * as Path from 'https://deno.land/std@0.113.0/path/mod.ts';

// * import needed stable portions of `std/fs`
import { exists, existsSync } from 'https://deno.land/std@0.113.0/fs/exists.ts';
import { expandGlob, expandGlobSync } from 'https://deno.land/std@0.113.0/fs/expand_glob.ts';
export const FS = { exists, existsSync, expandGlob, expandGlobSync };

export * as Lodash from 'https://cdn.skypack.dev/pin/lodash@v4.17.20-4NISnx5Etf8JOo22u9rw/lodash.js';
export { default as OSPaths } from 'https://deno.land/x/os_paths@v6.9.0/src/mod.deno.ts';
export * as TTY from 'https://deno.land/x/tty@0.1.4/mod.ts';
export { default as XdgAppPaths } from 'https://deno.land/x/xdg_app_paths@v7.0.0/src/mod.deno.ts';
export { default as Yargs } from 'https://deno.land/x/yargs@v17.0.1-deno/deno.ts';

// assert functions (with assertion signatures) always require explicit type annotation
// * ref: <https://github.com/microsoft/TypeScript/issues/36931> , <https://github.com/microsoft/TypeScript/issues/36067>
// eg...
//  import * as Asserts from 'https://deno.land/std@0.113.0/testing/asserts.ts';
//  export const assert: typeof Asserts.assert = Asserts.assert;
//  export const assertEquals: typeof Asserts.assertEquals = Asserts.assertEquals;
//  export const equal: typeof Asserts.equal = Asserts.equal;
// or use more direct exports...
//  export { assert, assertEquals, equal } from 'https://deno.land/std@0.113.0/testing/asserts.ts';
export * as Asserts from 'https://deno.land/std@0.113.0/testing/asserts.ts';
export { assert, assertEquals, equal } from 'https://deno.land/std@0.113.0/testing/asserts.ts';

export { fetch } from 'https://deno.land/x/file_fetch@0.2.0/mod.ts';

//=== aliases (* in-transition)

export * as $colors from 'https://deno.land/std@0.113.0/fmt/colors.ts';
export * as $path from 'https://deno.land/std@0.113.0/path/mod.ts';

export const $fs = { exists, existsSync, expandGlob, expandGlobSync };

export * as $lodash from 'https://cdn.skypack.dev/pin/lodash@v4.17.20-4NISnx5Etf8JOo22u9rw/lodash.js';
export { default as $osPaths } from 'https://deno.land/x/os_paths@v6.9.0/src/mod.deno.ts';
export * as $tty from 'https://deno.land/x/tty@0.1.4/mod.ts';
export { default as $xdgAppPaths } from 'https://deno.land/x/xdg_app_paths@v7.0.0/src/mod.deno.ts';
export { default as $yargs } from 'https://deno.land/x/yargs@v17.0.1-deno/deno.ts';

//=== types

export type { Arguments as YargsArguments } from 'https://deno.land/x/yargs@v17.0.1-deno/deno-types.ts';
