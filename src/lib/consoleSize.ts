// spell-checker:ignore (names) Deno
// spell-checker:ignore (shell) stty tput
// spell-checker:ignore (shell/CMD) CONOUT

import { decode } from './$shared.ts';

const isWinOS = Deno.build.os === 'windows';

export type ConsoleSize = { columns: number; rows: number };
export type ConsoleSizeOptions = {
	fallbackRIDs: number[];
	consoleFileFallback: boolean;
	useCache: boolean;
};
export type ConsoleSizeMemoKey = string;

const consoleSizeCache = new Map<ConsoleSizeMemoKey, ConsoleSize>();

export function consoleSize(
	rid: number = Deno.stdout.rid,
	options: Partial<ConsoleSizeOptions> = {},
): Promise<ConsoleSize | undefined> {
	const options_ = {
		fallbackRIDs: [Deno.stderr.rid],
		consoleFileFallback: true,
		useCache: true,
		...options,
	};
	if (options.useCache) {
		const memo = consoleSizeCache.get(JSON.stringify({ rid, options_ }));
		if (memo != undefined) return Promise.resolve(memo);
	}
	// attempt fast API first, with fallback to slower shell scripts
	// * paying for construction and execution only if needed by using `catch()` as fallback and/or `then()` for the function calls
	// ~ 5 ms for WinOS ; ~ 0.5 ms for POSIX (for open, un-redirected STDOUT or STDERR)
	// ~ 150 ms for WinOS ; ~ 75 ms for POSIX (when requiring use of the consoleFileFallback)
	const promise = consoleSizeViaDenoAPI(rid, options_)
		.then((size) => (size != undefined) ? size : Promise.reject(undefined))
		.then((size) => {
			consoleSizeCache.set(JSON.stringify({ rid, options_ }), size);
			return size;
		})
		.catch((_) =>
			// shell script fallbacks
			// ~ 150 ms for WinOS ; ~ 75 ms for POSIX
			// * Promise constructors are synchronously eager, but `.then(...)/.catch(...)` is guaranteed to execute on the async stack
			// ref: https://medium.com/@mpodlasin/3-most-common-mistakes-in-using-promises-in-javascript-575fc31939b6 @@ <https://archive.is/JmH5N>
			// ref: https://medium.com/@mpodlasin/promises-vs-observables-4c123c51fe13 @@ <https://archive.is/daGxV>
			// ref: https://stackoverflow.com/questions/21260602/how-to-reject-a-promise-from-inside-then-function
			Promise
				.any([
					consoleSizeViaPowerShell().then((size) =>
						(size != undefined) ? size : Promise.reject(undefined)
					),
					consoleSizeViaSTTY().then((size) =>
						(size != undefined) ? size : Promise.reject(undefined)
					),
					consoleSizeViaTPUT().then((size) =>
						(size != undefined) ? size : Promise.reject(undefined)
					),
				])
				.then((size) => {
					consoleSizeCache.set(JSON.stringify({ rid, options_ }), size);
					return size;
				})
				.catch((_) => undefined)
		);

	return promise;
}

//===

export function consoleSizeViaDenoAPI(
	rid: number = Deno.stdout.rid,
	options: Partial<ConsoleSizeOptions> = {},
): Promise<ConsoleSize | undefined> {
	const options_ = {
		fallbackRIDs: [Deno.stderr.rid],
		consoleFileFallback: true,
		useCache: true,
		...options,
	};
	// `Deno.consoleSize()` is unstable API (as of v1.12+) => deno-lint-ignore no-explicit-any
	// deno-lint-ignore no-explicit-any
	const denoConsoleSize = (Deno as any).consoleSize as (rid: number) => ConsoleSize | undefined;
	if (denoConsoleSize == undefined) return Promise.resolve(undefined);

	let size: ConsoleSize | undefined;
	try {
		// * `denoConsoleSize()` throws if rid is redirected
		size = denoConsoleSize?.(rid);
	} catch {
		size = undefined;
	}
	let fallbackRID;
	while (size == undefined && (fallbackRID = options_.fallbackRIDs.shift()) != undefined) {
		// console.warn('fallback to ...', fallbackRID)
		try {
			// * `denoConsoleSize()` throws if rid is redirected
			size = denoConsoleSize?.(fallbackRID);
		} catch {
			size = undefined;
		}
	}

	if ((size == undefined) && options.consoleFileFallback) {
		// ref: https://unix.stackexchange.com/questions/60641/linux-difference-between-dev-console-dev-tty-and-dev-tty0
		Deno
			.open(isWinOS ? 'CONOUT$' : '/dev/tty')
			.then((file) => {
				try {
					size = denoConsoleSize?.(file.rid);
				} finally {
					file.close();
				}
			})
			.catch((_) => size = undefined);
	}

	return Promise.resolve(size);
}

export function consoleSizeViaPowerShell(): Promise<ConsoleSize | undefined> {
	const output = (() => {
		try {
			const process = Deno.run({
				cmd: [
					'powershell',
					'-nonInteractive',
					'-noProfile',
					'-executionPolicy',
					'unrestricted',
					'-command',
					'$Host.UI.RawUI.WindowSize.Width;$Host.UI.RawUI.WindowSize.Height',
				],
				stdin: 'null',
				stderr: 'null',
				stdout: 'piped',
			});
			return (process.output()).then((out) => decode(out)).finally(() => process.close());
		} catch (_) {
			return Promise.resolve(undefined);
		}
	})();

	const promise = output.then((text) => text?.split(/\s+/).filter((s) => s.length > 0) ?? []).then((
		values,
	) =>
		values.length > 0
			? { columns: Number(values.shift()), rows: Number(values.shift()) }
			: undefined
	);
	return promise;
}

export function consoleSizeViaSTTY(): Promise<ConsoleSize | undefined> {
	// * note: `stty size` depends on a TTY connected to STDIN; ie, `stty size </dev/null` will fail
	// * note: On Windows, `stty size` causes odd end of line word wrap abnormalities for lines containing ANSI escapes => avoid
	if (isWinOS) return Promise.resolve(undefined);
	const output = (() => {
		try {
			const process = Deno.run({
				cmd: ['stty', 'size', 'sane'],
				stdin: 'inherit',
				stderr: 'null',
				stdout: 'piped',
			});
			return (process.output()).then((out) => decode(out)).finally(() => process.close());
		} catch (_) {
			return Promise.resolve(undefined);
		}
	})();

	const promise = output
		.then((text) => text?.split(/\s+/).filter((s) => s.length > 0).reverse() ?? [])
		.then((values) =>
			values.length > 0
				? { columns: Number(values.shift()), rows: Number(values.shift()) }
				: undefined
		);
	return promise;
}

export function consoleSizeViaTPUT(): Promise<ConsoleSize | undefined> {
	// * note: `tput` is resilient to STDIN, STDOUT, and STDERR redirects, but requires two system shell calls
	const colsOutput = (() => {
		try {
			const process = Deno.run({
				cmd: ['tput', 'cols'],
				stdin: 'null',
				stderr: 'null',
				stdout: 'piped',
			});
			return (process.output()).then((out) => decode(out)).finally(() => process.close());
		} catch (_) {
			return Promise.resolve(undefined);
		}
	})();
	const linesOutput = (() => {
		try {
			const process = Deno.run({
				cmd: ['tput', 'lines'],
				stdin: 'null',
				stderr: 'null',
				stdout: 'piped',
			});
			return (process.output()).then((out) => decode(out)).finally(() => process.close());
		} catch (_) {
			return Promise.resolve(undefined);
		}
	})();

	const promise = Promise
		.all([colsOutput, linesOutput])
		.then(([colsText, linesText]) => [colsText ?? '', linesText ?? ''])
		.then(([cols, lines]) =>
			(cols.length > 0 && lines.length > 0)
				? { columns: Number(cols), rows: Number(lines) }
				: undefined
		);
	return promise;
}

// const consoleSizes = {
// 	consoleSizeViaDeno: await consoleSizeViaDeno(),
// 	consoleSizeViaPowerShell: await consoleSizeViaPowerShell(),
// 	consoleSizeViaSTTY: await consoleSizeViaSTTY(),
// 	consoleSizeViaTPUT: await consoleSizeViaTPUT(),
// };
