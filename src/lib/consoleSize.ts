// spell-checker:ignore (names) Deno
// spell-checker:ignore (shell) stty tput
// spell-checker:ignore (shell/CMD) CONOUT

//===

// import '../../vendor/deno-unstable.lib.d.ts'; // import Deno UNSTABLE types

// import { assert as _assert } from 'https://deno.land/std@0.178.0/testing/asserts.ts';

//=== utils
// import { stringToCString, stringToCWString, ToUint32 } from './util.ts';

export function stringToCString(s: string) {
	const length = s.length;
	const buffer = new ArrayBuffer(length + 1);
	const u8 = new Uint8Array(buffer);
	for (let i = 0; i <= length; i++) {
		u8[i] = s.charCodeAt(i);
	}
	u8[length] = 0;
	return u8;
}

export function stringToCWString(s: string) {
	const length = s.length;
	const buffer = new ArrayBuffer((length + 1) * 2);
	const u16 = new Uint16Array(buffer);
	for (let i = 0; i <= length; i++) {
		u16[i] = s.charCodeAt(i);
	}
	u16[length] = 0;
	return u16;
}

function modulo(a: number, b: number) {
	return a - Math.floor(a / b) * b;
}
function ToInteger(x: number) {
	// ToDO: research and add rounding options
	x = Number(x);
	return x < 0 ? Math.ceil(x) : Math.floor(x);
}

const pow2To32 = Math.pow(2, 32);

export function ToUint32(x: number) {
	return modulo(ToInteger(x), pow2To32);
}

export function sizeOfNativeType(type: Deno.NativeType) {
	// spell-checker:ignore () isize
	// ref: <https://github.com/DjDeveloperr/deno/blob/4c0a50ec1e123c39f3f51e66025d83fd8cb6a2c1/ext/ffi/00_ffi.js#L258>
	switch (type) {
		case 'bool':
		case 'u8':
		case 'i8':
			return 1;
		case 'u16':
		case 'i16':
			return 2;
		case 'u32':
		case 'i32':
		case 'f32':
			return 4;
		case 'u64':
		case 'i64':
		case 'f64':
		case 'pointer':
		case 'buffer':
		case 'function':
		case 'usize':
		case 'isize':
			return 8;
		default:
			throw new TypeError(`Unsupported type: ${type}`);
	}
}

//===

const decoder = new TextDecoder(); // default == 'utf-8'
const decode = (input?: Uint8Array): string => decoder.decode(input);

const isWinOS = Deno.build.os === 'windows';

const atImportAllowFFI =
	((await Deno.permissions?.query({ name: 'ffi' }))?.state ?? 'granted') === 'granted';
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

export type ConsoleSize = { columns: number; rows: number };

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
function denoConsoleSizeNT(rid: number) {
	// no-throw `Deno.consoleSize(..)`
	// `Deno.consoleSize()` is unstable API (as of v1.12+) => deno-lint-ignore no-explicit-any
	// deno-lint-ignore no-explicit-any
	const fn = (Deno as any).consoleSize as (rid: number) => ConsoleSize | undefined;
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
 * * results are cached; cache may be disabled via the `{ useCache: false }` option
 *
 * ```ts
 * const { columns, rows } = consoleSizeSync(Deno.stdout.rid, {...});
 * ```
 *
 * @param rid ~ resource ID
 * @tags unstable
 */
export function consoleSizeSync(
	rid: number = Deno.stdout.rid,
	options_: Partial<ConsoleSizeOptions> = {},
): ConsoleSize | undefined {
	// ~ 0.75ms for WinOS
	const options = {
		fallbackRIDs: [Deno.stderr.rid],
		consoleFileFallback: true,
		useCache: true,
		...options_,
	};
	if (options.useCache) {
		const memo = consoleSizeCache.get(JSON.stringify({ rid, options }));
		if (memo != undefined) return memo;
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
	rid: number = Deno.stdout.rid,
	options_: Partial<Omit<ConsoleSizeOptions, 'useCache'>> = {},
): ConsoleSize | undefined {
	const options = { fallbackRIDs: [Deno.stderr.rid], consoleFileFallback: true, ...options_ };
	if (denoConsoleSizeNT == undefined) return undefined;

	let size = denoConsoleSizeNT(rid);

	let fallbackRID;
	while (size == undefined && (fallbackRID = options.fallbackRIDs.shift()) != undefined) {
		// console.warn(`fallbackRID = ${fallbackRID}; isatty(...) = ${Deno.isatty(fallbackRID)}`);
		size = denoConsoleSizeNT(fallbackRID);
	}

	if ((size == undefined) && atImportAllowRead && options.consoleFileFallback) {
		// fallback to size determination from special "console" files
		// ref: https://unix.stackexchange.com/questions/60641/linux-difference-between-dev-console-dev-tty-and-dev-tty0
		const fallbackFileName = isWinOS ? 'CONOUT$' : '/dev/tty';
		const file = denoOpenSyncNT(fallbackFileName);
		// console.warn(`fallbackFileName = ${fallbackFileName}; isatty(...) = ${file && Deno.isatty(file.rid)}`);
		size = file && denoConsoleSizeNT(file.rid);
		file && Deno.close(file.rid);
	}

	return size;
}

// consoleSizeViaFFI()
/** Get the size of the console as columns/rows, via the FFI.
 * * _unstable_ ~ requires the Deno `--unstable` flag for successful resolution (b/c the used `unstable.UnsafePointer` is unstable API, as of Deno v1.19.0 [2023-01-01; rivy])
 *
 * ```ts
 * const { columns, rows } = consoleSizeViaFFI();
 * ```
 * @tags allow-ffi
 */
export function consoleSizeViaFFI(): ConsoleSize | undefined {
	// ~ 5ms when requiring DLL loading
	if (!isWinOS) return undefined; // WinOS-only FFI implementation
	if (!atImportAllowFFI) return undefined;
	let size: ConsoleSize | undefined = undefined;

	const unstable = (() => {
		const u = {
			dlopen: Deno.dlopen,
			UnsafePointer: Deno.UnsafePointer,
			UnsafePointerView: Deno.UnsafePointerView,
		};
		if ((Object.values(u) as (unknown | undefined)[]).every((e) => e != null)) return u;
		return undefined;
	})();
	// console.warn({ unstable });

	if (unstable != null) {
		const dllKernel = (() => {
			try {
				return unstable.dlopen('kernel32.dll', {
					'GetConsoleScreenBufferInfo':
						/* https://learn.microsoft.com/en-us/windows/console/getconsolescreenbufferinfo */ {
							parameters: ['pointer', 'buffer'],
							result: 'u32', // BOOL
						},
					'CreateFileW':
						/* https://learn.microsoft.com/en-us/windows/win32/api/fileapi/nf-fileapi-createfilew */ {
							parameters: ['pointer', 'u32', 'u32', 'pointer', 'u32', 'u32', 'pointer'],
							result: 'pointer', /* file handle */
						},
					'OpenFile': /* https://learn.microsoft.com/en-us/windows/win32/api/winbase/nf-winbase-openfile */
						{ parameters: ['pointer', 'pointer', 'u32'], result: 'pointer' },
				});
			} catch {
				return undefined;
			}
		})();

		// console.warn('start CreateFile');
		// ref: <https://learn.microsoft.com/en-us/windows/win32/api/fileapi/nf-fileapi-createfilew> @@ <https://archive.is/LbyEf>
		const CF_OPEN_EXISTING = 3;
		// ref: <https://github.com/retep998/winapi-rs/blob/5b1829956ef645f3c2f8236ba18bb198ca4c2468/src/um/winnt.rs#L1682>
		// ...
		// pub const GENERIC_READ: DWORD = 0x80000000;
		// pub const GENERIC_WRITE: DWORD = 0x40000000;
		// ...
		// pub const FILE_SHARE_WRITE: DWORD = 0x00000002;
		//...
		const FILE_SHARE_WRITE = 0x00000002;
		const GENERIC_READ = 0x80000000;
		const GENERIC_WRITE = 0x40000000;
		// ref: [Correct use of `CreateFileW()`](https://stackoverflow.com/questions/49145316/why-no-text-colors-after-using-createfileconout-to-redirect-the-console)
		const h = dllKernel?.symbols.CreateFileW(
			unstable.UnsafePointer.of(stringToCWString('CONOUT$')),
			ToUint32(GENERIC_WRITE | GENERIC_READ), /* dwDesiredAccess */
			ToUint32(FILE_SHARE_WRITE), /* dwShareMode */
			null,
			CF_OPEN_EXISTING,
			0,
			null,
		) as Deno.PointerValue;
		// console.warn('done CreateFile');

		// NOTE: using `OpenFile()` is functionally equivalent to using `CreateFile()` but increases fn execution time from ~ 1.5 ms to ~ 5.25 ms
		// // ref: <https://learn.microsoft.com/en-us/windows/win32/api/winbase/nf-winbase-openfile>
		// // ref: <https://learn.microsoft.com/en-us/windows/win32/api/winbase/ns-winbase-ofstruct>
		// // spell-checker:ignore () OFS_MAXPATHNAME OFSTRUCT
		// const OF_READWRITE = 0x00000002;
		// const OFS_MAXPATHNAME = 128;
		// const OFSTRUCT_SIZE = 1 /* BYTE */ * 2 + 2 /* WORD */ * 3 + OFS_MAXPATHNAME;
		// const ofstruct_buffer = new Uint8Array(OFSTRUCT_SIZE).fill(0);
		// // console.warn('start OpenFile');
		// const h = dllKernel?.symbols.OpenFile(
		// 	unstable.UnsafePointer.of(stringToCString('CONOUT$')),
		// 	unstable.UnsafePointer.of(ofstruct_buffer),
		// 	OF_READWRITE,
		// ) as Deno.PointerValue;
		// _assert(
		// 	ofstruct_buffer[0] <= OFSTRUCT_SIZE,
		// 	`consoleSizeViaFFI(): possible buffer overrun; FFI returned a buffer size (${
		// 		ofstruct_buffer[0]
		// 	}) larger than supplied buffer size (${OFSTRUCT_SIZE})`,
		// );
		// // buffer[buffer.length - 1] = 0; // force `szPathName[]` to end with NUL character
		// // console.warn('done OpenFile', { buffer });

		const FALSE = 0;
		const INVALID_HANDLE = -1;

		// CONSOLE_SCREEN_BUFFER_INFO == {
		// 	dwSize: { X: WORD, Y: WORD },
		// 	dwCursorPosition: { X: WORD, Y: WORD },
		// 	wAttributes: WORD,
		// 	srWindow: { Left: WORD, Top: WORD, Right: WORD, Bottom: WORD },
		// 	dwMaximumWindowSize: { X: WORD, Y: WORD },
		// }
		const dwSize: Deno.NativeType[] = ['u16', 'u16'];
		const dwCursorPosition: Deno.NativeType[] = ['u16', 'u16'];
		const wAttributes: Deno.NativeType[] = ['u16'];
		const srWindow: Deno.NativeType[] = ['u16', 'u16', 'u16', 'u16'];
		const dwMaximumWindowSize: Deno.NativeType[] = ['u16', 'u16'];
		const CONSOLE_SCREEN_BUFFER_INFO: Deno.NativeType[] = [
			...dwSize,
			...dwCursorPosition,
			...wAttributes,
			...srWindow,
			...dwMaximumWindowSize,
		];
		const CONSOLE_SCREEN_BUFFER_INFO_size = CONSOLE_SCREEN_BUFFER_INFO.flat().reduce(
			(sum, type) => sum += sizeOfNativeType(type),
			0,
		);
		const info_buffer = new Uint8Array(CONSOLE_SCREEN_BUFFER_INFO_size).fill(0);
		const handle = (unstable.UnsafePointer.value(h) != INVALID_HANDLE) ? h : null;
		// console.warn({ h, handle });
		const result = handle &&
			(dllKernel?.symbols.GetConsoleScreenBufferInfo(handle, info_buffer) ?? FALSE) != FALSE;
		const ptr = result ? unstable.UnsafePointer.of(info_buffer) : null;
		const ptrView = ptr && new unstable.UnsafePointerView(ptr);
		const info = ptrView &&
			{
				dwSize: { X: ptrView.getInt16(0), Y: ptrView.getInt16(2) },
				dwCursorPosition: { X: ptrView.getInt16(4), Y: ptrView.getInt16(6) },
				wAttributes: ptrView.getUint16(8),
				srWindow: {
					Left: ptrView.getInt16(10),
					Top: ptrView.getInt16(12),
					Right: ptrView.getInt16(14),
					Bottom: ptrView.getInt16(16),
				},
				dwMaximumWindowSize: { X: ptrView.getInt16(18), Y: ptrView.getInt16(20) },
			};
		// console.warn('FFI', { buffer, info });
		if (info != null) size = { columns: info.dwSize.X, rows: info.dwSize.Y };
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
	const promise = Promise
		.resolve(consoleSizeSync(rid, options))
		.then((size) => {
			consoleSizeCache.set(JSON.stringify({ rid, options }), size);
			return size;
		})
		.then((size) => (size != undefined) ? size : Promise.reject(undefined))
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

// consoleSizeViaMode()
/** Get the size of the console as columns/rows, using the `mode` shell command.
 *
 * ```ts
 * const { columns, rows } = await consoleSizeViaMode();
 * ```
 */
export function consoleSizeViaMode(): Promise<ConsoleSize | undefined> {
	// ~ 25 ms (WinOS-only)
	if (!isWinOS) return Promise.resolve(undefined); // no `mode con ...` on non-WinOS platforms
	if (!atImportAllowRun) return Promise.resolve(undefined); // requires 'run' permission; note: avoids any 'run' permission prompts

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

// consoleSizeViaPowerShell()
/** Get the size of the console as columns/rows, using `PowerShell`.
 *
 * ```ts
 * const { columns, rows } = await consoleSizeViaPowerShell();
 * ```
 */
export function consoleSizeViaPowerShell(): Promise<ConsoleSize | undefined> {
	// ~ 150 ms (for WinOS)
	if (!atImportAllowRun) return Promise.resolve(undefined); // requires 'run' permission; note: avoids any 'run' permission prompts
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

// consoleSizeViaSTTY()
/** Get the size of the console as columns/rows, using the `stty` shell command.
 *
 * ```ts
 * const { columns, rows } = await consoleSizeViaSTTY();
 * ```
 */
export function consoleSizeViaSTTY(): Promise<ConsoleSize | undefined> {
	// * note: `stty size` depends on a TTY connected to STDIN; ie, `stty size </dev/null` will fail
	// * note: On Windows, `stty size` causes odd end of line word wrap abnormalities for lines containing ANSI escapes => avoid
	if (isWinOS) return Promise.resolve(undefined);
	if (!atImportAllowRun) return Promise.resolve(undefined); // requires 'run' permission; note: avoids any 'run' permission prompts
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

// consoleSizeViaTPUT()
/** Get the size of the console as columns/rows, using the `tput` shell command.
 *
 * ```ts
 * const { columns, rows } = await consoleSizeViaTPUT();
 * ```
 */
export function consoleSizeViaTPUT(): Promise<ConsoleSize | undefined> {
	// * note: `tput` is resilient to STDIN, STDOUT, and STDERR redirects, but requires two system shell calls
	if (!atImportAllowRun) return Promise.resolve(undefined); // requires 'run' permission; note: avoids any 'run' permission prompts
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
