// spell-checker:ignore (fns) isatty
// spell-checker:ignore (Deno) rid rid's
// spell-checker:ignore (names) Deno
// spell-checker:ignore (shell) stty tput
// spell-checker:ignore (shell/CMD) CONIN CONOUT
// spell-checker:ignore (Typescript) ts-nocheck nocheck usize
// spell-checker:ignore (WinAPI) CSTR CWSTR DWORD LPCSTR LPCWSTR MBCS WCHAR

// ToDO: add tests to run all functions in console and check that all return the same values or are undefined

// * NOTE: any defined results will be accurate (non-default)
// * MacOS, if STDIN/STDERR/STDOUT are all redirected to non-consoles, `--allow-run` is needed to produce any defined results
// * POSIX, if STDIN/STDERR/STDOUT are all redirected to non-consoles, `--allow-run` is needed to produce any defined results
// * WinOS, if STDERR/STDOUT are all redirected, `--allow-run` is needed to produce any defined results

// note: to eval all fns, try...
// * POSIX * `deno run -A ./tests/helpers/consoleSize.display-results.ts </dev/null 2>&1 | cat`
// * WinOS * `deno run -A ./tests/helpers/consoleSize.display-results.ts <NUL 2>&1 | find /v ""`

//===

import { Deprecated } from './$deprecated.ts';

//===

// import type * as DenoUnstable from '../../vendor/deno-unstable.lib.d.ts'; // import Deno UNSTABLE types (fails b/c of duplicate included types)

// import { assert as _assert } from 'https://deno.land/std@0.178.0/testing/asserts.ts';

import { consoleSizeViaFFI } from './consoleSizeViaFFI.ts';
export { consoleSizeViaFFI };

//===

const decoder = new TextDecoder(); // default == 'utf-8'
const decode = (input?: Uint8Array): string => decoder.decode(input);

const isMacOS = Deno.build.os === 'darwin';
const isWinOS = Deno.build.os === 'windows';

const atImportAllowRead =
	((await Deno.permissions?.query({ name: 'read' }))?.state ?? 'granted') === 'granted';
const atImportAllowRun =
	((await Deno.permissions?.query({ name: 'run' }))?.state ?? 'granted') === 'granted';

type ConsoleSizeMemoKey = string;
const consoleSizeCache = new Map<ConsoleSizeMemoKey, ConsoleSize | undefined>();

//===

// export async function havePermit(name: Deno.PermissionName) {
// 	const names = [name];
// 	const permits = (await Promise.all(names.map((name) => Deno.permissions?.query({ name })))).map((
// 		e,
// 	) => e ?? { state: 'granted', onchange: null });
// 	const allGranted = !(permits.find((permit) => permit.state !== 'granted'));
// 	return allGranted;
// }

// export async function haveAllPermits(names: Deno.PermissionName[]) {
// 	const permits = (await Promise.all(names.map((name) => Deno.permissions?.query({ name })))).map((
// 		e,
// 	) => e ?? { state: 'granted', onchange: null });
// 	const allGranted = !(permits.find((permit) => permit.state !== 'granted'));
// 	return allGranted;
// }

//===

// export type ConsoleSize = { columns: number; rows: number };
export type ConsoleSize = ReturnType<typeof Deno.consoleSize>;

/** Options for ConsoleSize functions ...
 * * `consoleFileFallback` ~ fallback to use of a "console" file if `rid` and fallback(s) fail ; default = true
 * * `fallbackRIDs` ~ list of fallback resource IDs if initial `rid` fails ; default = `Deno.stderr.rid`
 * * `useCache` ~ cache/memoize prior values ; default = true
 */
export type ConsoleSizeOptions = {
	consoleFileFallback: boolean;
	fallbackRIDs: number[];
	useCache: boolean;
};

//===

/** Get the size of the console used by `rid` as columns/rows.
 * * _`no-throw`_ function (returns `undefined` upon any error [or missing `Deno.consoleSize()`])
 *
 * ```ts
 * const { columns, rows } = denoConsoleSizeNT(Deno.stdout.rid);
 * ```
 *
 * @param rid ~ resource ID
 * @tags no-throw
 */
function denoConsoleSizeNT(rid?: number) {
	// no-throw `Deno.consoleSize(..)`
	// [2020-07] `Deno.consoleSize()` is unstable API (as of v1.2+) => deno-lint-ignore no-explicit-any
	// [2022-11] `Deno.consoleSize()` (now stabilized in v1.27.0+) ignores rid (only testing stdin, stdout, and stderr rid's)
	const fn = Deno.consoleSize as (rid?: number) => ConsoleSize | undefined;
	try {
		// * `Deno.consoleSize()` throws if rid is non-TTY (including redirected streams)
		return fn?.(rid);
	} catch {
		return undefined;
	}
}

/** Open a file specified by `path`, using `options`.
 * * _`no-throw`_ function (returns `undefined` upon any error)
 * @returns an instance of `Deno.FsFile`
 */
function denoOpenSyncNT(path: string | URL, options?: Deno.OpenOptions) {
	// no-throw `Deno.openSync(..)`
	try {
		return Deno.openSync(path, options);
	} catch {
		return undefined;
	}
}

//===

/** Get the size of the console used by `rid` as columns/rows, using `options`.
 * * _async_
 *
 * ```ts
 * const { columns, rows } = await consoleSize(Deno.stdout.rid, {...});
 * ```
 *
 * @param rid ~ resource ID
 */
export const consoleSize = consoleSizeAsync; // default to fully functional `consoleSizeAsync()`

//=== * sync

// * `consoleSizeSync()` requires the Deno `--unstable` flag to succeed; b/c `Deno.consoleSize()` is unstable API (as of Deno v1.19.0, 2022-02-17)

// consoleSizeSync(rid, options)
/** Get the size of the console used by `rid` as columns/rows, using `options`.
 * * _unstable_ ~ requires the Deno `--unstable` flag for successful resolution (b/c the used `Deno.consoleSize()` function is unstable API [as of Deno v1.19.0, 2022-02-17])
 * * results are cached; cached entries will be ignored/skipped when using the `{ useCache: false }` option
 *
 * ```ts
 * const { columns, rows } = consoleSizeSync(Deno.stdout.rid, {...});
 * ```
 *
 * @param rid ~ resource ID
 * @tags unstable
 */
export function consoleSizeSync(
	rid: number = Deprecated.Deno.stdout.rid,
	options_: Partial<ConsoleSizeOptions> = {},
): ConsoleSize | undefined {
	// ~ 0.75ms for WinOS
	const options = {
		fallbackRIDs: [Deprecated.Deno.stderr.rid],
		consoleFileFallback: true,
		useCache: true,
		...options_,
	};
	if (options.useCache) {
		const memo = consoleSizeCache.get(JSON.stringify({ rid, options }));
		if (memo != null) return memo;
	}
	const size = consoleSizeViaDenoAPI(rid, options) ?? consoleSizeViaFFI();
	consoleSizeCache.set(JSON.stringify({ rid, options }), size);
	return size;
}

// consoleSizeViaDenoAPI(rid, options)
/** Get the size of the console used by `rid` as columns/rows, using `options`, via the Deno API.
 * * _unstable_ ~ requires the Deno `--unstable` flag for successful resolution (b/c the used `Deno.consoleSize()` function is unstable API [as of Deno v1.19.0, 2022-02-17])
 *
 * ```ts
 * const { columns, rows } = consoleSizeViaDenoAPI(Deno.stdout.rid, {...});
 * ```
 *
 * @param rid ~ resource ID
 * @tags unstable
 */
export function consoleSizeViaDenoAPI(
	rid: number = Deprecated.Deno.stdout.rid,
	options_: Partial<Omit<ConsoleSizeOptions, 'useCache'>> = {},
): ConsoleSize | undefined {
	const options = {
		fallbackRIDs: [Deprecated.Deno.stderr.rid],
		consoleFileFallback: true,
		...options_,
	};
	if (denoConsoleSizeNT == null) return undefined;

	let size = denoConsoleSizeNT(rid);

	let fallbackRID;
	while (size == null && (fallbackRID = options.fallbackRIDs.shift()) != null) {
		// console.warn(`fallbackRID = ${fallbackRID}; isatty(...) = ${Deno.isatty(fallbackRID)}`);
		size = denoConsoleSizeNT(fallbackRID);
	}

	if ((size == null) && atImportAllowRead && options.consoleFileFallback) {
		// fallback to size determination from special "console" files
		// ref: https://unix.stackexchange.com/questions/60641/linux-difference-between-dev-console-dev-tty-and-dev-tty0
		const fallbackFileName = isWinOS ? 'CONOUT$' : '/dev/tty';
		const file = denoOpenSyncNT(fallbackFileName);
		// console.warn(`fallbackFileName = ${fallbackFileName}; isatty(...) = ${file && Deno.isatty(file.rid)}`);
		size = file && denoConsoleSizeNT(file.rid);
		// note: Deno.FsFile added (with close()) in Deno v1.19.0
		file && Deprecated.Deno.close(file.rid);
	}

	return size;
}

//=== * async

// * `consoleSizeAsync()` can succeed without the Deno `--unstable` flag (but requires async to enable falling back to shell executable output when `Deno.consoleSize()` is missing/non-functional)

// consoleSizeAsync(rid, options)
/** Get the size of the console used by `rid` as columns/rows, using `options`.
 * * _async_
 * * results are cached; cache may be disabled via the `{ useCache: false }` option
 * * a fast synchronous method (with fallback to multiple racing asynchronous methods) is used for a robust, yet quick, result
 *
 * ```ts
 * const { columns, rows } = await consoleSizeAsync(Deno.stdout.rid, {...});
 * ```
 *
 * @param rid ~ resource ID
 */
export function consoleSizeAsync(
	rid: number = Deprecated.Deno.stdout.rid,
	options_: Partial<ConsoleSizeOptions> = {},
): Promise<ConsoleSize | undefined> {
	const options = {
		fallbackRIDs: [Deprecated.Deno.stderr.rid],
		consoleFileFallback: true,
		useCache: true,
		...options_,
	};
	if (options.useCache) {
		const memo = consoleSizeCache.get(JSON.stringify({ rid, options }));
		if (memo != null) return Promise.resolve(memo);
	}
	// attempt fast API first, with fallback to slower shell scripts
	// * paying for construction and execution only if needed by using `catch()` as fallback and/or `then()` for the function calls
	// ~ 0.5 ms for WinOS or POSIX (for open, un-redirected STDOUT or STDERR, using the fast [Deno] API)
	// ~ 150 ms for WinOS ; ~ 75 ms for POSIX (when requiring use of the shell script fallbacks)
	const promise = Promise
		.resolve(consoleSizeSync(rid, options))
		.then((size) => {
			consoleSizeCache.set(JSON.stringify({ rid, options }), size);
			return size;
		})
		.then((size) => (size != null) ? size : Promise.reject(undefined))
		.catch((_) =>
			// shell script fallbacks
			// ~ 25 ms for WinOS ; ~ 75 ms for POSIX
			// * Promise constructors are synchronously eager, but `.then(...)/.catch(...)` is guaranteed to execute on the async stack
			// ref: https://medium.com/@mpodlasin/3-most-common-mistakes-in-using-promises-in-javascript-575fc31939b6 @@ <https://archive.is/JmH5N>
			// ref: https://medium.com/@mpodlasin/promises-vs-observables-4c123c51fe13 @@ <https://archive.is/daGxV>
			// ref: https://stackoverflow.com/questions/21260602/how-to-reject-a-promise-from-inside-then-function
			Promise
				.any([
					consoleSizeViaMode().then((size) => (size != null) ? size : Promise.reject(undefined)),
					consoleSizeViaPowerShell().then((size) =>
						(size != null) ? size : Promise.reject(undefined)
					),
					consoleSizeViaResize().then((size) => (size != null) ? size : Promise.reject(undefined)),
					consoleSizeViaSTTY().then((size) => (size != null) ? size : Promise.reject(undefined)),
					consoleSizeViaTPUT().then((size) => (size != null) ? size : Promise.reject(undefined)),
					consoleSizeViaXargsSTTY().then((size) =>
						(size != null) ? size : Promise.reject(undefined)
					),
					consoleSizeViaXargsTPUT().then((size) =>
						(size != null) ? size : Promise.reject(undefined)
					),
					consoleSizeViaShXargsTPUT().then((size) =>
						(size != null) ? size : Promise.reject(undefined)
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

// consoleSizeViaMode()
/** Get the size of the console as columns/rows, using the `mode` shell command.
 *
 * ```ts
 * const { columns, rows } = await consoleSizeViaMode();
 * ```
 *
 * @tags winos-only
 */
export function consoleSizeViaMode(): Promise<ConsoleSize | undefined> {
	// ~ 25 ms (WinOS-only)
	if (!isWinOS) return Promise.resolve(undefined); // no `mode con ...` on non-WinOS platforms
	if (!atImportAllowRun) return Promise.resolve(undefined); // requires 'run' permission; note: avoids any 'run' permission prompts

	const output = (() => {
		try {
			const process = Deprecated.Deno.run({
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
				.reverse()
		)
		.then((values) => {
			const [cols, lines] = ((values != null) && (values.length === 2)) ? values : [];
			if ((cols?.length ?? 0) > 0 && (lines?.length ?? 0) > 0) {
				const columns = Number(cols);
				const rows = Number(lines);
				if (columns === 0 || rows === 0) return undefined;
				if (!isNaN(columns) && !isNaN(rows)) {
					return { columns, rows };
				}
			}
			return undefined;
		});
	return promise;
}

// consoleSizeViaPowerShell()
/** Get the size of the console as columns/rows, using `PowerShell`.
 *
 * ```ts
 * const { columns, rows } = await consoleSizeViaPowerShell();
 * ```
 */
export function consoleSizeViaPowerShell(): Promise<ConsoleSize | undefined> {
	// ~ 150 ms (for WinOS)
	// MacOS: fails when STDERR/STDOUT is redirected, falling back to 80x24 (width x height)
	if (isMacOS) return Promise.resolve(undefined);
	if (!atImportAllowRun) return Promise.resolve(undefined); // requires 'run' permission; note: avoids any 'run' permission prompts
	const output = (() => {
		try {
			const process = Deprecated.Deno.run({
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
				stderr: 'piped',
				stdout: 'piped',
			});
			return Promise
				.all([process.status(), process.output(), process.stderrOutput()])
				.then(([status, out, err]) => {
					decode(out);
					console.warn('ViaPowerShell', { status, out: decode(out), err: decode(err) });
					return decode(out);
				})
				.finally(() => process.close());
		} catch (_) {
			return Promise.resolve(undefined);
		}
	})();

	const promise = output.then((text) => text?.split(/\s+/).filter((s) => s.length > 0)).then(
		(values) => {
			const [cols, lines] = ((values != null) && (values.length === 2)) ? values : [];
			if ((cols?.length ?? 0) > 0 && (lines?.length ?? 0) > 0) {
				const columns = Number(cols);
				const rows = Number(lines);
				if (columns === 0 || rows === 0) return undefined;
				if (!isNaN(columns) && !isNaN(rows)) {
					return { columns, rows };
				}
			}
			return undefined;
		},
	);
	return promise;
}

// consoleSizeViaResize()
/** Get the size of the console as columns/rows, using the `resize` shell command.
 *
 * ```ts
 * const { columns, rows } = await consoleSizeViaResize();
 * ```
 *
 * @tags non-winos-only
 */
export function consoleSizeViaResize(): Promise<ConsoleSize | undefined> {
	// * note: `resize` is available from `sudo apt install xterm`
	if (isWinOS) return Promise.resolve(undefined);
	if (!atImportAllowRun) return Promise.resolve(undefined); // requires 'run' permission; note: avoids any 'run' permission prompts
	// * `resize -u` => output consists of shell command text to set COLUMNS and LINES environment variables; will be `bash`-compatible, regardless of the in-use shell
	const output = (() => {
		try {
			const process = Deprecated.Deno.run({
				cmd: ['resize', '-u'],
				stdin: 'null',
				stderr: 'piped',
				stdout: 'piped',
			});
			return Promise
				.all([process.status(), process.output(), process.stderrOutput()])
				.then(([status, out, err]) => {
					decode(out);
					console.warn('ViaResize', { status, out: decode(out), err: decode(err) });
					return decode(out);
				})
				.finally(() => process.close());
		} catch (_) {
			return Promise.resolve(undefined);
		}
	})();

	const promise = output
		/* expected output (from `resize -u`):
		```text
		COLUMNS=123;
		LINES=43;
		export COLUMNS LINES;
		```
		*/
		.then((text) => text?.split(/\r|\r?\n/)?.slice(0, 2)?.map((s) => s.match(/\d+/)?.[0]))
		.then((values) => {
			const [cols, lines] = ((values != null) && (values.length === 2)) ? values : [];
			if ((cols?.length ?? 0) > 0 && (lines?.length ?? 0) > 0) {
				const columns = Number(cols);
				const rows = Number(lines);
				if (columns === 0 || rows === 0) return undefined;
				if (!isNaN(columns) && !isNaN(rows)) {
					return { columns, rows };
				}
			}
			return undefined;
		});
	return promise;
}

// consoleSizeViaSTTY()
/** Get the size of the console as columns/rows, using the `stty` shell command.
 *
 * ```ts
 * const { columns, rows } = await consoleSizeViaSTTY();
 * ```
 *
 * @tags non-winos-only
 */
export function consoleSizeViaSTTY(): Promise<ConsoleSize | undefined> {
	// * note: `stty size` depends on a TTY connected to STDIN; ie, `stty size </dev/null` will fail
	// - ref: <https://stackoverflow.com/questions/23369503/get-size-of-terminal-window-rows-columns> @@ <https://archive.is/nM1ky>
	// - ref: <https://stackoverflow.com/questions/263890/how-do-i-find-the-width-height-of-a-terminal-window> @@ <https://archive.is/n5KoU>
	// - ref: <https://www.gnu.org/software/coreutils/manual/html_node/stty-invocation.html> @@ <https://archive.is/RAZMG>
	// MacOS: `--file=/dev/tty` isn't recognized as a valid option, must use `-f /dev/tty` and use it prior to stty commands
	// WinOS: `stty size` causes odd and persistent end of line word wrap abnormalities for lines containing ANSI escapes => avoid for WinOS
	if (isWinOS) return Promise.resolve(undefined);
	const fileOption = isMacOS ? ['-f', '/dev/tty'] : ['--file=/dev/tty'];
	if (!atImportAllowRun) return Promise.resolve(undefined); // requires 'run' permission; note: avoids any 'run' permission prompts
	const output = (() => {
		try {
			const process = Deprecated.Deno.run({
				cmd: ['stty', ...fileOption, 'size' /* , 'sane' */],
				stdin: 'null',
				stderr: 'piped',
				stdout: 'piped',
			});
			return Promise
				.all([process.status(), process.output(), process.stderrOutput()])
				.then(([status, out, err]) => {
					decode(out);
					console.warn('ViaSTTY', { status, out: decode(out), err: decode(err) });
					return decode(out);
				})
				.finally(() => process.close());
		} catch (_) {
			return Promise.resolve(undefined);
		}
	})();

	const promise = output
		/* expected output (from `stty size`):
		```text
		43 123
		```
		*/
		.then((text) => text?.split(/\s+/).slice(0, 2).reverse())
		.then((values) => {
			const [cols, lines] = ((values != null) && (values.length === 2)) ? values : [];
			if ((cols?.length ?? 0) > 0 && (lines?.length ?? 0) > 0) {
				const columns = Number(cols);
				const rows = Number(lines);
				if (columns === 0 || rows === 0) return undefined;
				if (!isNaN(columns) && !isNaN(rows)) {
					return { columns, rows };
				}
			}
			return undefined;
		});
	return promise;
}

// consoleSizeViaTPUT()
/** Get the size of the console as columns/rows, using the `tput` shell command.
 *
 * ```ts
 * const { columns, rows } = await consoleSizeViaTPUT();
 * ```
 *
 * @tags non-winos-only
 */
export function consoleSizeViaTPUT(): Promise<ConsoleSize | undefined> {
	// * note: `tput` is resilient to STDIN, STDOUT, and STDERR redirects, but requires at least one to be a TTY, and requires two system shell calls
	// ... seems to be false, requiring STDIN to be a TTY (similar to `stty size`) for correct results
	// ... more modern (non-BSD) `tput` versions will output cols and lines in one call and no longer requires two system shell calls
	// MacOS: `tput ...` requires either STDOUT or STDERR to be a TTY for correct results, making suppression of unexpected output impossible
	if (isMacOS) return Promise.resolve(undefined);
	if (isWinOS) return Promise.resolve(undefined);
	if (!atImportAllowRun) return Promise.resolve(undefined); // requires 'run' permission; note: avoids any 'run' permission prompts
	if (!atImportAllowRead) return Promise.resolve(undefined); // requires 'read' permission; note: avoids any 'read' permission prompts
	const devTtyPath = isWinOS ? 'CONIN$' : '/dev/tty';
	// open TTY devices with read and write permissions to avoid mis-categorization of TTYs; ref: [🐛(WinOS) Deno.isatty() sometimes returns incorrect false result for 'CONOUT$'](https://github.com/denoland/deno/issues/18168)
	const devTTY = denoOpenSyncNT(devTtyPath, { read: true /* , write: true */ });
	if (devTTY == null) return Promise.resolve(undefined);
	const colsOutput = (() => {
		try {
			const process = Deprecated.Deno.run({
				cmd: ['tput', 'cols'],
				stdin: devTTY.rid,
				stderr: 'null',
				stdout: 'piped',
			});
			return Promise
				.all([process.status(), process.output()])
				.then(([status, out]) => {
					decode(out);
					console.warn('ViaTPUT (cols)', { status, out: decode(out) });
					return decode(out);
				})
				.finally(() => process.close());
		} catch (_) {
			return Promise.resolve(undefined);
		}
	})();
	const linesOutput = (() => {
		try {
			const process = Deprecated.Deno.run({
				cmd: ['tput', 'lines'],
				stdin: devTTY.rid,
				stderr: 'null',
				stdout: 'piped',
			});
			return Promise
				.all([process.status(), process.output()])
				.then(([status, out]) => {
					decode(out);
					console.warn('ViaTPUT (lines)', { status, out: decode(out) });
					return decode(out);
				})
				.finally(() => process.close());
		} catch (_) {
			return Promise.resolve(undefined);
		}
	})();
	// const bothOutput = (() => {
	// 	try {
	// 		const process = Deprecated.Deno.run({
	// 			cmd: ['tput', 'cols', 'lines'],
	// 			stdin: devTTY.rid,
	// 			stderr: isMacOS ? devTTY.rid : 'null',
	// 			stdout: 'piped',
	// 		});
	// 		return Promise
	// 			.all([process.status(), process.output()])
	// 			.then(([status, out]) => {
	// 				decode(out);
	// 				console.warn('ViaTPUT (cols lines)', { status, out: decode(out) });
	// 				return decode(out);
	// 			})
	// 			.finally(() => process.close());
	// 	} catch (_) {
	// 		return Promise.resolve(undefined);
	// 	}
	// })();

	const promise = Promise
		/* expected output from `tput cols` == `123`, `tput lines` == `43` */
		/* expected output from `tput cols lines` == `123\n43` */
		.all([colsOutput, linesOutput])
		// .then(([colsText, linesText]) => {
		// 	console.warn({ devTtyPath, devIsTTY: Deno.isatty(devTTY.rid), colsText, linesText });
		// 	return [colsText ?? '', linesText ?? ''];
		// })
		// .then(([colsText, linesText]) => [colsText ?? '', linesText ?? ''])
		.then(([cols, lines]) => {
			if ((cols?.length ?? 0) > 0 && (lines?.length ?? 0) > 0) {
				const columns = Number(cols);
				const rows = Number(lines);
				if (columns === 0 || rows === 0) return undefined;
				if (!isNaN(columns) && !isNaN(rows)) {
					return { columns, rows };
				}
			}
			return undefined;
		});
	return promise;
}

// consoleSizeViaXargsSTTY()
/** Get the size of the console as columns/rows, using the `stty` shell command.
 *
 * ```ts
 * const { columns, rows } = await consoleSizeViaSTTY();
 * ```
 *
 * @tags non-winos-only
 */
export function consoleSizeViaXargsSTTY(): Promise<ConsoleSize | undefined> {
	// * note: `stty size` depends on a TTY connected to STDIN; ie, `stty size </dev/null` will fail
	// - ref: <https://stackoverflow.com/questions/23369503/get-size-of-terminal-window-rows-columns> @@ <https://archive.is/nM1ky>
	// - ref: <https://stackoverflow.com/questions/263890/how-do-i-find-the-width-height-of-a-terminal-window> @@ <https://archive.is/n5KoU>
	// - ref: <https://www.gnu.org/software/coreutils/manual/html_node/stty-invocation.html> @@ <https://archive.is/RAZMG>
	// MacOS: BSD `xargs` - will not execute the TARGET at all if STDIN contains no arguments (eg, is '/dev/null') or only ''; only recognizes the short form of the `-o` option
	if (isMacOS) return Promise.resolve(undefined);
	if (isWinOS) return Promise.resolve(undefined);
	if (!atImportAllowRun) return Promise.resolve(undefined); // requires 'run' permission; note: avoids any 'run' permission prompts
	const output = (() => {
		try {
			const process = Deprecated.Deno.run({
				cmd: ['xargs', '-o', 'stty', 'size' /* , 'sane' */],
				stdin: 'null',
				stderr: 'piped',
				stdout: 'piped',
			});
			return Promise
				.all([process.status(), process.output(), process.stderrOutput()])
				.then(([status, out, err]) => {
					decode(out);
					console.warn('ViaXargsSTTY', { status, out: decode(out), err: decode(err) });
					return decode(out);
				})
				.finally(() => process.close());
		} catch (_) {
			return Promise.resolve(undefined);
		}
	})();

	const promise = output
		/* expected output (from `stty size`):
		```text
		43 123
		```
		*/
		.then((text) => text?.split(/\s+/).slice(0, 2).reverse())
		.then((values) => {
			const [cols, lines] = ((values != null) && (values.length === 2)) ? values : [];
			if ((cols?.length ?? 0) > 0 && (lines?.length ?? 0) > 0) {
				const columns = Number(cols);
				const rows = Number(lines);
				if (columns === 0 || rows === 0) return undefined;
				if (!isNaN(columns) && !isNaN(rows)) {
					return { columns, rows };
				}
			}
			return undefined;
		});
	return promise;
}

// consoleSizeViaXargsTPUT()
/** Get the size of the console as columns/rows, using the `tput` shell command.
 *
 * ```ts
 * const { columns, rows } = await consoleSizeViaTPUT();
 * ```
 *
 * @tags non-winos-only
 */
export function consoleSizeViaXargsTPUT(): Promise<ConsoleSize | undefined> {
	// * note: `tput` is resilient to STDIN, STDOUT, and STDERR redirects, but requires at least one to be a TTY, and requires two system shell calls
	// ... seems to be false, requiring STDIN to be a TTY (similar to `stty size`) for correct results
	// ... more modern (non-BSD) `tput` versions will output cols and lines in one call and no longer requires two system shell calls
	// MacOS: BSD `xargs` - will not execute the TARGET at all if STDIN contains no arguments (eg, is '/dev/null') or only ''; only recognizes the short form of the `-o` option
	if (isMacOS) return Promise.resolve(undefined);
	if (isWinOS) return Promise.resolve(undefined);
	if (!atImportAllowRun) return Promise.resolve(undefined); // requires 'run' permission; note: avoids any 'run' permission prompts
	// const devTTY = denoOpenSyncNT(isWinOS ? 'CONIN$' : '/dev/tty');
	// if (devTTY == null) return Promise.resolve(undefined);
	const colsOutput = (() => {
		try {
			const process = Deprecated.Deno.run({
				cmd: ['xargs', '-o', 'tput', 'cols'],
				stdin: 'null',
				stderr: 'piped',
				stdout: 'piped',
			});
			return Promise
				.all([process.status(), process.output(), process.stderrOutput()])
				.then(([status, out, err]) => {
					decode(out);
					console.warn('ViaXargsTPUT (cols)', { status, out: decode(out), err: decode(err) });
					return decode(out);
				})
				.finally(() => process.close());
		} catch (_) {
			return Promise.resolve(undefined);
		}
	})();
	const linesOutput = (() => {
		try {
			const process = Deprecated.Deno.run({
				cmd: ['xargs', '-o', 'tput', 'lines'],
				stdin: 'null',
				stderr: 'piped',
				stdout: 'piped',
			});
			return Promise
				.all([process.status(), process.output(), process.stderrOutput()])
				.then(([status, out, err]) => {
					decode(out);
					console.warn('ViaXargsTPUT (lines)', { status, out: decode(out), err: decode(err) });
					return decode(out);
				})
				.finally(() => process.close());
		} catch (_) {
			return Promise.resolve(undefined);
		}
	})();
	// const bothOutput = (() => {
	// 	try {
	// 		const process = Deprecated.Deno.run({
	// 			cmd: ['xargs', '-o', 'tput', 'cols', 'lines'],
	// 			stdin: 'null',
	// 			stderr: 'piped',
	// 			stdout: 'piped',
	// 		});
	// 		return Promise
	// 			.all([process.status(), process.output(), process.stderrOutput()])
	// 			.then(([status, out, err]) => {
	// 				decode(out);
	// 				console.warn('ViaXargsTPUT (lines)', { status, out: decode(out), err: decode(err) });
	// 				return decode(out);
	// 			})
	// 			.finally(() => process.close());
	// 	} catch (_) {
	// 		return Promise.resolve(undefined);
	// 	}
	// })();

	const promise = Promise
		/* expected output from `tput cols` == `123`, `tput lines` == `43` */
		.all([colsOutput, linesOutput])
		// .then(([colsText, linesText]) => {
		// 	console.warn({ colsText, linesText });
		// 	return [colsText ?? '', linesText ?? ''];
		// })
		// .then(([colsText, linesText]) => [colsText ?? '', linesText ?? ''])
		.then(([cols, lines]) => {
			if ((cols?.length ?? 0) > 0 && (lines?.length ?? 0) > 0) {
				const columns = Number(cols);
				const rows = Number(lines);
				if (columns === 0 || rows === 0) return undefined;
				if (!isNaN(columns) && !isNaN(rows)) {
					return { columns, rows };
				}
			}
			return undefined;
		});
	return promise;
}

// consoleSizeViaXargsTPUT()
/** Get the size of the console as columns/rows, using the `tput` shell command.
 *
 * ```ts
 * const { columns, rows } = await consoleSizeViaTPUT();
 * ```
 *
 * @tags non-winos-only
 */
export function consoleSizeViaShXargsTPUT(): Promise<ConsoleSize | undefined> {
	// * note: `tput` is resilient to STDIN, STDOUT, and STDERR redirects, but requires at least one to be a TTY, and requires two system shell calls
	// ... seems to be false, requiring STDIN to be a TTY (similar to `stty size`) for correct results
	// ... more modern (non-BSD) `tput` versions will output cols and lines in one call and no longer requires two system shell calls
	// MacOS: BSD `xargs` - will not execute the TARGET at all if STDIN contains no arguments (eg, is '/dev/null') or only ''; only recognizes the short form of the `-o` option
	// MacOS: fails when STDERR/STDOUT are redirected, falling back to 80x24 (width x height)
	if (isMacOS) return Promise.resolve(undefined);
	if (isWinOS) return Promise.resolve(undefined);
	if (!atImportAllowRun) return Promise.resolve(undefined); // requires 'run' permission; note: avoids any 'run' permission prompts
	// const devTTY = denoOpenSyncNT(isWinOS ? 'CONIN$' : '/dev/tty');
	// if (devTTY == null) return Promise.resolve(undefined);
	const colsOutput = (() => {
		try {
			const process = Deprecated.Deno.run({
				cmd: ['/usr/bin/env', 'sh', '-c', 'echo "cols" | xargs -o tput'],
				stdin: 'null',
				stderr: 'piped',
				stdout: 'piped',
			});
			return Promise
				.all([process.status(), process.output(), process.stderrOutput()])
				.then(([status, out, err]) => {
					decode(out);
					console.warn('ViaShXargsTPUT (cols)', { status, out: decode(out), err: decode(err) });
					return decode(out);
				})
				.finally(() => process.close());
		} catch (_) {
			return Promise.resolve(undefined);
		}
	})();
	const linesOutput = (() => {
		try {
			const process = Deprecated.Deno.run({
				cmd: ['/usr/bin/env', 'sh', '-c', 'echo "lines" | xargs -o tput'],
				stdin: 'null',
				stderr: 'piped',
				stdout: 'piped',
			});
			return Promise
				.all([process.status(), process.output(), process.stderrOutput()])
				.then(([status, out, err]) => {
					decode(out);
					console.warn('ViaShXargsTPUT (lines)', { status, out: decode(out), err: decode(err) });
					return decode(out);
				})
				.finally(() => process.close());
		} catch (_) {
			return Promise.resolve(undefined);
		}
	})();
	// const bothOutput = (() => {
	// 	try {
	// 		const process = Deprecated.Deno.run({
	// 			cmd: ['/usr/bin/env', 'sh', '-c', 'echo "" | xargs -o tput cols lines'],
	// 			stdin: 'null',
	// 			stderr: 'piped',
	// 			stdout: 'piped',
	// 		});
	// 		return (process.output()).then((out) => decode(out)).finally(() => process.close());
	// 	} catch (_) {
	// 		return Promise.resolve(undefined);
	// 	}
	// })();

	const promise = Promise
		/* expected output from `tput cols` == `123`, `tput lines` == `43` */
		/* expected output from `tput cols lines` == `123\n43` */
		.all([colsOutput, linesOutput])
		// .then(([colsText, linesText]) => {
		// 	console.warn({ colsText, linesText });
		// 	return [colsText ?? '', linesText ?? ''];
		// })
		// .then(([colsText, linesText]) => [colsText ?? '', linesText ?? ''])
		.then(([cols, lines]) => {
			if ((cols?.length ?? 0) > 0 && (lines?.length ?? 0) > 0) {
				const columns = Number(cols);
				const rows = Number(lines);
				if (columns === 0 || rows === 0) return undefined;
				if (!isNaN(columns) && !isNaN(rows)) {
					return { columns, rows };
				}
			}
			return undefined;
		});
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
