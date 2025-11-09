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

function hasIsTerminalMethod(id: unknown): id is { isTerminal: () => boolean } {
	return (
		typeof id === 'object' &&
		id != null &&
		'isTerminal' in id &&
		typeof id?.isTerminal === 'function' &&
		typeof id.isTerminal() === 'boolean'
	);
}

//

export const DenoV1 = isDenoV1(Deno) ? (Deno as unknown as typeof DenoV1NS.Deno) : undefined;
// export const DenoAsVx = DenoAsV1 ?? globalThis.Deno;

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
	close: (file: DenoV1NS.Deno.FsFile | globalThis.Deno.FsFile): void => {
		if (file instanceof DenoV1NS.Deno.FsFile) {
			return DenoV1?.close(file.rid);
		}
		return file.close();
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
		id:
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
};

export namespace Deprecated {
	export namespace Deno {
		// deprecated since: ...
		// use instead: ...
		// remove with: Deno v2.0.0
		export const stderr = { rid: globalThis.Deno.stderr.rid };
		export const stdin = { rid: globalThis.Deno.stdin.rid };
		export const stdout = { rid: globalThis.Deno.stdout.rid };

		export const run = DenoV1?.run ?? globalThis.Deno.run;
	}
}

// export const Adapter = { isTerminal: () => };
