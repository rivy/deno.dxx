// spell-checker:ignore (names) Deno
// spell-checker:ignore (shell) stty tput
// spell-checker:ignore (shell/CMD) CONOUT

export const decoder = new TextDecoder(); // default == 'utf=8'
export const decode = (input?: Uint8Array): string => decoder.decode(input);

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
	options_: Partial<ConsoleSizeOptions> = {},
): Promise<ConsoleSize | undefined> {
	const options = {
		fallbackRIDs: [Deno.stderr.rid],
		consoleFileFallback: true,
		useCache: true,
		...options_,
	};
	if (options.useCache) {
		const memo = consoleSizeCache.get(JSON.stringify({ rid, options }));
		if (memo != undefined) return Promise.resolve(memo);
	}
	// attempt fast API first, with fallback to slower shell scripts
	// * paying for construction and execution only if needed by using `catch()` as fallback and/or `then()` for the function calls
	// ~ 0.5 ms for WinOS or POSIX (for open, un-redirected STDOUT or STDERR, using the fast [Deno] API)
	// ~ 150 ms for WinOS ; ~ 75 ms for POSIX (when requiring use of the shell script fallbacks)
	const promise = consoleSizeViaDenoAPI(rid, options)
		.then((size) => (size != undefined) ? size : Promise.reject(undefined))
		.then((size) => {
			consoleSizeCache.set(JSON.stringify({ rid, options }), size);
			return size;
		})
		.catch((_) =>
			// shell script fallbacks
			// ~ 25 ms for WinOS ; ~ 75 ms for POSIX
			// * Promise constructors are synchronously eager, but `.then(...)/.catch(...)` is guaranteed to execute on the async stack
			// ref: https://medium.com/@mpodlasin/3-most-common-mistakes-in-using-promises-in-javascript-575fc31939b6 @@ <https://archive.is/JmH5N>
			// ref: https://medium.com/@mpodlasin/promises-vs-observables-4c123c51fe13 @@ <https://archive.is/daGxV>
			// ref: https://stackoverflow.com/questions/21260602/how-to-reject-a-promise-from-inside-then-function
			Promise
				.any([
					consoleSizeViaMode().then((size) =>
						(size != undefined) ? size : Promise.reject(undefined)
					),
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
					consoleSizeCache.set(JSON.stringify({ rid, options }), size);
					return size;
				})
				.catch((_) => undefined)
		);

	return promise;
}

//===

export function consoleSizeViaDenoAPI(
	rid: number = Deno.stdout.rid,
	options_: Partial<ConsoleSizeOptions> = {},
): Promise<ConsoleSize | undefined> {
	const options = {
		fallbackRIDs: [Deno.stderr.rid],
		consoleFileFallback: true,
		useCache: true,
		...options_,
	};
	// `Deno.consoleSize()` is unstable API (as of v1.12+) => deno-lint-ignore no-explicit-any
	// deno-lint-ignore no-explicit-any
	const denoConsoleSize = (Deno as any).consoleSize as (rid: number) => ConsoleSize | undefined;
	if (denoConsoleSize == undefined) return Promise.resolve(undefined);

	let size: ConsoleSize | undefined | Promise<ConsoleSize | undefined>;
	try {
		// * `denoConsoleSize()` throws if rid is redirected
		size = denoConsoleSize?.(rid);
	} catch {
		size = undefined;
	}
	let fallbackRID;
	while (size == undefined && (fallbackRID = options.fallbackRIDs.shift()) != undefined) {
		// console.warn(`fallbackRID = ${fallbackRID}; isatty(...) = ${Deno.isatty(fallbackRID)}`);
		try {
			// * `denoConsoleSize()` throws if rid is redirected
			size = denoConsoleSize?.(fallbackRID);
		} catch {
			size = undefined;
		}
	}

	if ((size == undefined) && options.consoleFileFallback) {
		const fallbackFileName = isWinOS ? 'CONOUT$' : '/dev/tty';
		// console.warn({ fallbackFileName });
		// ref: https://unix.stackexchange.com/questions/60641/linux-difference-between-dev-console-dev-tty-and-dev-tty0
		size = Deno.open(fallbackFileName).then((file) =>
			(() => {
				try {
					return denoConsoleSize?.(file.rid);
				} catch (_) {
					// swallow errors
				} finally {
					Deno.close(file.rid);
				}
				return undefined;
			})()
		);
	}

	return Promise.resolve(size);
}

export function consoleSizeViaMode(): Promise<ConsoleSize | undefined> {
	// ~ 25 ms (WinOS-only)
	if (!isWinOS) return Promise.resolve(undefined); // no `mode con ...` on non-WinOS platforms
	const output = (() => {
		try {
			const process = Deno.run({
				cmd: ['cmd', '/d/c', 'mode', 'con', '/status'],
				stdin: 'null',
				stderr: 'null',
				stdout: 'piped',
			});
			return (process.output()).then((out) => decode(out)).finally(() => process.close());
		} catch (_) {
			return Promise.resolve(undefined);
		}
	})();

	// ref: <https://superuser.com/questions/680746/is-it-possible-to-fetch-the-current-cmd-window-size-rows-and-columns-in-window>
	// ```text
	// C:> mode con /status
	//
	// Status for device CON:
	// ----------------------
	//     Lines:          45
	//     Columns:        132
	//     Keyboard rate:  31
	//     Keyboard delay: 0
	//     Code page:      65001
	// ```
	const promise = output
		.then((text) =>
			text
				?.split(/\r?\n/)
				.filter((s) => s.length > 0)
				.slice(2, 4)
				.map((s) => s.match(/(\d+)\s*$/)?.[1])
				.filter((s) => s && (s.length > 0)) ?? []
		)
		.then((values) =>
			values.length > 0 ? { columns: Number(values[1]), rows: Number(values[0]) } : undefined
		);
	return promise;
}

export function consoleSizeViaPowerShell(): Promise<ConsoleSize | undefined> {
	// ~ 150 ms (for WinOS)
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

// export function windowSizeViaWMIC(): Promise<ConsoleSize | undefined> { // * in pixels *
// 	if (!isWinOS) return Promise.resolve(undefined); // no `wmic` on non-WinOS platforms
// 	const output = (() => {
// 		try {
// 			const process = Deno.run({
// 				cmd: [
// 					'wmic',
// 					'path',
// 					'Win32_VideoController',
// 					'get',
// 					'CurrentHorizontalResolution,CurrentVerticalResolution',
// 				],
// 				stdin: 'null',
// 				stderr: 'null',
// 				stdout: 'piped',
// 			});
// 			return (process.output()).then((out) => decode(out)).finally(() => process.close());
// 		} catch (_) {
// 			return Promise.resolve(undefined);
// 		}
// 	})();
// 	// ref: <https://superuser.com/questions/270718/get-display-resolution-from-windows-command-line>
// 	// ```text
// 	// C:> wmic path Win32_VideoController get CurrentHorizontalResolution,CurrentVerticalResolution
// 	// CurrentHorizontalResolution  CurrentVerticalResolution
// 	// 2560                         1440
// 	// ```
// 	const promise = output
// 		.then((text) => {
// 			console.warn({ text, text_split: text?.split(/\r*\n/) });
// 			return text?.split(/\r?\n/)[1].split(/\s+/).filter((s) => s && (s.length > 0)) ?? [];
// 		})
// 		.then((values) =>
// 			values.length > 0
// 				? { columns: Number(values.shift()), rows: Number(values.shift()) }
// 				: undefined
// 		);
// 	return promise;
// }

// const consoleSizes = {
// 	consoleSizeViaDeno: await consoleSizeViaDeno(),
// 	consoleSizeViaPowerShell: await consoleSizeViaPowerShell(),
// 	consoleSizeViaSTTY: await consoleSizeViaSTTY(),
// 	consoleSizeViaTPUT: await consoleSizeViaTPUT(),
// };
