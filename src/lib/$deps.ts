//==== modules

export * as $colors from 'https://deno.land/std@0.117.0/fmt/colors.ts';
export * as $path from 'https://deno.land/std@0.117.0/path/mod.ts';
export {
	readableStreamFromReader,
	readAll,
	readerFromStreamReader,
} from 'https://deno.land/std@0.128.0/streams/conversion.ts';
export { mergeReadableStreams } from 'https://deno.land/std@0.128.0/streams/merge.ts';

// * import needed stable portions of `std/fs`
import { exists, existsSync } from 'https://deno.land/std@0.117.0/fs/exists.ts';
import { expandGlob, expandGlobSync } from 'https://deno.land/std@0.117.0/fs/expand_glob.ts';
export const $fs = { exists, existsSync, expandGlob, expandGlobSync };

export * as $lodash from 'https://cdn.skypack.dev/pin/lodash@v4.17.20-4NISnx5Etf8JOo22u9rw/lodash.js';
export * as $cliffyTable from 'https://deno.land/x/cliffy@v0.20.1/table/mod.ts';
export { default as $osPaths } from 'https://deno.land/x/os_paths@v6.9.0/src/mod.deno.ts';
export * as $semver from 'https://deno.land/x/semver@v1.4.0/mod.ts';
export * as $tty from 'https://deno.land/x/tty@0.1.4/mod.ts';
export { default as $xdgAppPaths } from 'https://deno.land/x/xdg_app_paths@v7.0.0/src/mod.deno.ts';

// export { default as $yargs } from 'https://deno.land/x/yargs@v17.3.0-deno/deno.ts';

//=== features (functions, objects, and/or values)

// assert functions (with assertion signatures) always require explicit type annotation
// * ref: <https://github.com/microsoft/TypeScript/issues/36931> , <https://github.com/microsoft/TypeScript/issues/36067>
// eg...
//  import * as $asserts from 'https://deno.land/std@0.117.0/testing/asserts.ts';
//  export const assert: typeof $asserts.assert = $asserts.assert;
//  export const assertEquals: typeof $asserts.assertEquals = $asserts.assertEquals;
//  export const equal: typeof $asserts.equal = $asserts.equal;
// or use more direct exports...
//  export { assert, assertEquals, equal } from 'https://deno.land/std@0.117.0/testing/asserts.ts';
export { assert, assertEquals, equal } from 'https://deno.land/std@0.117.0/testing/asserts.ts';

//=== types

// export type { Arguments as YargsArguments } from 'https://deno.land/x/yargs@v17.3.0-deno/deno-types.ts';
