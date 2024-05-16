//== * DEPendencies

// spell-checker:ignore (names) Deno

export * as $colors from 'https://deno.land/std@0.134.0/fmt/colors.ts';

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

import { default as DeepMergeM } from 'https://esm.sh/v135/deepmerge@4.3.1?no-dts'; // '?no-dts' is used to avoid failed attempts by esm.sh to import types for 'deepmerge'
// import type DeepMergeT from '../../../vendor/@types/deepmerge@4.3.1/index.d.ts'; // use locally vendored types
import * as DeepMergeT from 'https://esm.sh/v135/deepmerge@4.3.1/index.d.ts'; // directly use type info file
const deepMerge = DeepMergeM as typeof DeepMergeT;
export { deepMerge };

export * as $symbols from '../xWait/log_symbols.ts';

export { format } from './format.ts';

export { default as getCurrentLine } from 'https://esm.sh/get-current-line@6.6.0';
export { default as rfcGetLogLevel } from 'https://esm.sh/rfc-log-levels@3.17.0';
export * as $levels from 'https://esm.sh/rfc-log-levels@3.17.0';

export type { Location, Offset } from 'https://esm.sh/get-current-line@6.6.0';
export type { LevelInfo, LevelsMap as LevelMap } from 'https://esm.sh/rfc-log-levels@3.17.0';
export type { DeepReadonly } from 'https://esm.sh/ts-essentials@9.4.2';
