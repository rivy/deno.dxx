// consolidated deprecated APIs

// ref: [Deno 1.x to 2.x Migration Guide](https://docs.deno.com/runtime/manual/advanced/migrate_deprecations)

// deno-lint-ignore-file no-namespace

// export const Deprecated = {
// 	// $deprecated: true,
// 	// $deprecated_since: '2023-11-22',
// 	// $deprecated_use_instead: 'src/lib/%24deps.cli.ts',
// 	// $deprecated_reason: 'consolidated deprecated APIs',
// 	// $deprecated_remove_after: '2024-11-22',

// 	Deno: { run: Deno.run, RunOptions: Deno.RunOptions },
// };

// const deno = Deno;

// export const isDenoV1 = Deno.version.deno.startsWith('1.');

import * as _DenoV1NS from '../../vendor/@types/lib.deno.ns@v1.46.3.d.ts';

export type DenoV1RID = DenoV1NS.RID;

// type guards

export function isDenoV1(o: unknown): o is typeof DenoV1NS.Deno {
	const v = (o as { version?: { deno?: string } })?.version?.deno;
	return !!v?.startsWith('1.');
}

export function isDenoV1RID(id: unknown): id is DenoV1NS.RID {
	return typeof id === 'number';
}

function hasCloseMethod(x: unknown): x is { close: () => void } {
	return (
		typeof x === 'object' && x != null && 'close' in x && typeof x?.close === 'function'
		// && typeof x.close() === 'undefined'
	);
}

function hasIsTerminalMethod(x: unknown): x is { isTerminal: () => boolean } {
	return (
		typeof x === 'object' &&
		x != null &&
		'isTerminal' in x &&
		typeof x?.isTerminal === 'function' &&
		typeof x.isTerminal() === 'boolean'
	);
}

//

export const DenoV1 = isDenoV1(Deno) ? (Deno as unknown as typeof DenoV1NS.Deno) : undefined;
// export const DenoAsVx = DenoAsV1 ?? globalThis.Deno;

import { readAll } from 'jsr:@std/io/read-all';

export const DenoVx = {
	/** Close the given resource ID (`rid`) which has been previously opened, such
	 * as via opening or creating a file. Closing a file when you are finished
	 * with it is important to avoid leaking resources.
	 *
	 * ```ts
	 * const file = await Deno.open("my_file.txt");
	 * // do work with "file" object
	 * Deno.close(file.rid);
	 * ```
	 *
	 * It is recommended to define the variable with the `using` keyword so the
	 * runtime will automatically close the resource when it goes out of scope.
	 * Doing so negates the need to manually close the resource.
	 *
	 * ```ts
	 * using file = await Deno.open("my_file.txt");
	 * // do work with "file" object
	 * ```
	 *
	 * @category I/O
	 */
	close: (
		id?: globalThis.Deno.FsFile | DenoV1NS.Deno.FsFile | { rid: DenoV1RID } | DenoV1RID,
	): void => {
		if (id == null) return;
		try {
			if (hasCloseMethod(id)) {
				return id.close();
			}
			const rid = typeof id === 'number' ? id : id.rid;
			return DenoV1?.close(rid);
		} catch (_) {
			// ignore errors
		}
	},
	/**
	 *  Check if a given resource id (`rid`) is a TTY (a terminal).
	 *
	 * ```ts
	 * // This example is system and context specific
	 * const nonTTYRid = Deno.openSync("my_file.txt").rid;
	 * const ttyRid = Deno.openSync("/dev/tty6").rid;
	 * console.log(Deno.isatty(nonTTYRid)); // false
	 * console.log(Deno.isatty(ttyRid)); // true
	 * ```
	 *
	 * @category I/O
	 */
	isatty: (
		id?:
			| globalThis.Deno.FsFile
			| DenoV1NS.Deno.FsFile
			| { isTerminal: () => boolean }
			| { rid: DenoV1RID }
			| DenoV1RID,
	): boolean => {
		if (id == null) return false;
		if (hasIsTerminalMethod(id)) {
			return id.isTerminal();
		}
		const rid = typeof id === 'number' ? id : id.rid;
		return DenoV1?.isatty(rid) ?? false;
	},
	readAll: DenoV1?.readAll ?? readAll,
};

// FixME: [2024-09-25; rivy] -- import { Deno as denoV1 } from 'https://github.com/denoland/deno/blob/e27a19c02c537626d7874f7521f4e39d6dfad0af/cli/tsc/dts/lib.deno.unstable.d.ts';
// import * as denoV1T from 'https://cdn.jsdelivr.net/gh/denoland/deno@e27a19c02c537626d7874f7521f4e39d6dfad0af/cli/tsc/dts/lib.deno.unstable.d.ts';
// import _denoV1 = denoV1T.Deno;
// import * as BracesT from 'https://cdn.jsdelivr.net/gh/DefinitelyTyped/DefinitelyTyped@7121cbff79/types/braces/index.d.ts';

import type { Reader as DenoReader } from 'jsr:@std/io/types';
import type { Writer as DenoWriter } from 'jsr:@std/io/types';
import type { WriterSync as DenoWriterSync } from 'jsr:@std/io/types';

export namespace Deprecated {
	export namespace Deno {
		// deprecated since: ...
		// use instead: ...
		// remove with: Deno v2.0.0

		// @ts-ignore -- `rid` properties are "soft-removed" in Deno v2
		export const stderr = { rid: globalThis.Deno.stderr.rid };
		// @ts-ignore -- `rid` properties are "soft-removed" in Deno v2
		export const stdin = { rid: globalThis.Deno.stdin.rid };
		// @ts-ignore -- `rid` properties are "soft-removed" in Deno v2
		export const stdout = { rid: globalThis.Deno.stdout.rid };

		// @ts-ignore -- `run` is "soft-removed" in Deno v2
		export const run = DenoV1?.run ?? globalThis.Deno.run;
		export type RunOptions = DenoV1NS.Deno.RunOptions;
		export type ProcessStatus = DenoV1NS.Deno.ProcessStatus;

		export type Reader = DenoReader;
		export type Writer = DenoWriter;
		export type WriterSync = DenoWriterSync;
	}
}

// export const Adapter = { isTerminal: () => };
