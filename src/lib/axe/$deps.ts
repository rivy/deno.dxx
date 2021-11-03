// spell-checker:ignore (names) Deno

export * as $colors from 'https://deno.land/std@0.112.0/fmt/colors.ts';

// // * import needed stable portions of `std/fs`
// import { exists, existsSync } from 'https://deno.land/std@0.106.0/fs/exists.ts';
// import { expandGlob, expandGlobSync } from 'https://deno.land/std@0.106.0/fs/expand_glob.ts';
// import { walk, walkSync } from 'https://deno.land/std@0.106.0/fs/walk.ts';
// export const FS = { exists, existsSync, expandGlob, expandGlobSync, walk, walkSync };

// export * as Lodash from 'https://cdn.skypack.dev/pin/lodash@v4.17.20-4NISnx5Etf8JOo22u9rw/lodash.js';
// export { default as OSPaths } from 'https://deno.land/x/os_paths@v6.9.0/src/mod.deno.ts';
// export * as TTY from 'https://deno.land/x/tty@0.1.4/mod.ts';
// export { default as Yargs } from 'https://deno.land/x/yargs@v17.0.1-deno/deno.ts';

import { Queue } from 'https://deno.land/x/queue@1.2.0/mod.ts';
export class PQueue extends Queue {
	add: typeof this.push = (fn, ...args) => this.push(fn, ...args);
	onIdle = () => this.push(() => {});
	pause: typeof this.stop = () => this.stop();
}
// export PQueue from 'https://deno.land/x/p_queue@1.0.1/mod.ts'; // larger module (with Event support)

//===

// spell-checker:ignore (names) DeepMerge
// spell-checker:ignore (people) * balupton

// import deepMerge from 'https://cdn.esm.sh/v54/deepmerge@4.2.2/es2021/deepmerge.js';
export { default as deepMerge } from 'https://cdn.esm.sh/v54/deepmerge@4.2.2/es2021/deepmerge.js';

export { format } from 'https://cdn.jsdelivr.net/gh/rivy/deno.dxx@c72e3cfef1/tests/$shared.ts';
export * as $symbols from '../xWait/log_symbols.ts';

export * as $levels from 'https://cdn.esm.sh/rfc-log-levels@3.17.0';
export { default as rfcGetLogLevel } from 'https://cdn.esm.sh/rfc-log-levels@3.17.0';
export { default as getCurrentLine } from 'https://esm.sh/get-current-line@6.6.0';

export type { LevelInfo, LevelsMap as LevelMap } from 'https://cdn.esm.sh/rfc-log-levels@3.17.0';
export type { DeepReadonly } from 'https://cdn.esm.sh/ts-essentials@9.0.0';
export type { Location, Offset } from 'https://esm.sh/get-current-line@6.6.0';

//=== * shared

// export { decode, encode } from 'https://deno.land/std@0.85.0/encoding/utf8.ts'; // 'utf8.ts' was removed via commit 5bc18f5d86
export const decoder = new TextDecoder();
export const decode = (input?: Uint8Array): string => decoder.decode(input);
export const encoder = new TextEncoder();
export const encode = (input?: string): Uint8Array => encoder.encode(input);

export const inspect = Deno.inspect;
