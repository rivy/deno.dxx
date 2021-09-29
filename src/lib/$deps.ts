export * as Colors from 'https://deno.land/std@0.106.0/fmt/colors.ts';
export * as Path from 'https://deno.land/std@0.106.0/path/mod.ts';
export { assert } from 'https://deno.land/std@0.106.0/testing/asserts.ts';

// * import needed stable portions of `std/fs`
import { exists, existsSync } from 'https://deno.land/std@0.106.0/fs/exists.ts';
import { expandGlob, expandGlobSync } from 'https://deno.land/std@0.106.0/fs/expand_glob.ts';
import { walk, walkSync } from 'https://deno.land/std@0.106.0/fs/walk.ts';
export const fs = { exists, existsSync, expandGlob, expandGlobSync, walk, walkSync };

// export { decode, encode } from 'https://deno.land/std@0.85.0/encoding/utf8.ts'; // 'utf8.ts' was removed via commit 5bc18f5d86
export const decode = new TextDecoder().decode;
export const encode = new TextEncoder().encode;

export * as Lodash from 'https://cdn.skypack.dev/pin/lodash@v4.17.20-4NISnx5Etf8JOo22u9rw/lodash.js';
export { fetch } from 'https://deno.land/x/file_fetch@0.2.0/mod.ts';
export { default as OSPaths } from 'https://deno.land/x/os_paths@v6.9.0/src/mod.deno.ts';
export * as tty from 'https://deno.land/x/tty@0.1.4/mod.ts';
export { default as Yargs } from 'https://deno.land/x/yargs@v17.0.1-deno/deno.ts';
