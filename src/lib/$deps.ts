//==== modules

export * as $colors from 'https://deno.land/std@0.134.0/fmt/colors.ts';
export * as $path from 'https://deno.land/std@0.134.0/path/mod.ts';
export {
	readableStreamFromReader,
	readAll,
	readerFromStreamReader,
	writeAllSync,
} from 'https://deno.land/std@0.134.0/streams/conversion.ts';
export { mergeReadableStreams } from 'https://deno.land/std@0.134.0/streams/merge.ts';

// * import needed stable portions of `std/fs`
import { exists, existsSync } from 'https://deno.land/std@0.134.0/fs/exists.ts';
import { expandGlob, expandGlobSync } from 'https://deno.land/std@0.134.0/fs/expand_glob.ts';
export const $fs = { exists, existsSync, expandGlob, expandGlobSync };

// export { default as $xdgAppPaths } from 'https://cdn.jsdelivr.net/gh/rivy/js.xdg-app-paths@9466e97/src/mod.deno.ts';

export * as $cliffyTable from 'https://deno.land/x/cliffy@v0.23.0/table/mod.ts'; // *pin*; cliffy@v0.23.0 == last version to use std@0.134.0 (or lower)
export { default as $osPaths } from 'https://deno.land/x/os_paths@v7.3.0/src/mod.deno.ts';
export * as $semver from 'https://deno.land/x/semver@v1.4.0/mod.ts';
export * as $tty from 'https://deno.land/x/tty@0.1.4/mod.ts';
export { default as $xdgAppPaths } from 'https://deno.land/x/xdg_app_paths@v8.2.0/src/mod.deno.ts';

// export * as $lodash from 'https://cdn.skypack.dev/pin/lodash@v4.17.20-4NISnx5Etf8JOo22u9rw/lodash.js';
// export * as $lodash from 'https://cdn.skypack.dev/lodash@4.17.20';
// * revise URL to use 'esm.sh' instead of 'cdn.skypack.dev' for compatibility with Deno-2.0 "import" permission defaults
// export { default as $lodash } from 'https://esm.sh/lodash@4.17.20';
// export { _ as $lodash } from 'https://esm.sh/lodash@4.17.20';
// export * as $lodash from 'https://deno.land/x/lodash@4.17.19/dist/lodash.js';
export { default as $lodash } from 'npm:lodash@4.17.20'; // requires deno-v1.25.0+; recommend deno-v1.30.0+ for better results

// export { default as $yargs } from 'https://deno.land/x/yargs@v17.3.0-deno/deno.ts';

//=== features (functions, objects, and/or values)

// assert functions (with assertion signatures) always require explicit type annotation
// * ref: <https://github.com/microsoft/TypeScript/issues/36931> , <https://github.com/microsoft/TypeScript/issues/36067>
// eg...
//  import * as $asserts from 'https://deno.land/std@0.134.0/testing/asserts.ts';
//  export const assert: typeof $asserts.assert = $asserts.assert;
//  export const assertEquals: typeof $asserts.assertEquals = $asserts.assertEquals;
//  export const equal: typeof $asserts.equal = $asserts.equal;
// or use more direct exports...
//  export { assert, assertEquals, equal } from 'https://deno.land/std@0.134.0/testing/asserts.ts';
export { assert, assertEquals, equal } from 'https://deno.land/std@0.134.0/testing/asserts.ts';

//=== types

// export type { Arguments as YargsArguments } from 'https://deno.land/x/yargs@v17.3.0-deno/deno-types.ts';
