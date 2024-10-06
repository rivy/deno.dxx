// @ts-nocheck ~ suppress static error checking for missing `--unstable` or early Deno versions
// * [2023-05-07; rivy] ~ for Deno v1.31.0+, @ts-nocheck may be disabled for error checking

// spell-checker:ignore (deno) dlopen
// spell-checker:ignore (shell/CMD) CONOUT
// spell-checker:ignore (Typescript) ts-nocheck nocheck usize
// spell-checker:ignore (WinAPI) CSTR CWSTR DWORD LPCSTR LPCWSTR MBCS WCHAR

// * reference 'deno.unstable' to include "unstable" types for `deno check ...` and `deno run --check ...`
// ref: [Deno ~ TS configuration](https://deno.land/manual@v1.31.2/advanced/typescript/configuration) @@ <https://archive.is/SdtbZ>
// ref: [TypeScript ~ triple slash directives](https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html) @@ <https://archive.is/26tvA>
/// <reference lib="deno.unstable" />
// * alternatively, use `// @ts-nocheck Bypass static errors for missing --unstable.` at the top of the file to disable static checks.

// NOTE: requires Deno >= v1.31.0; for use of `UnsafePointer.value()`

//===

export type ConsoleSize = ReturnType<typeof Deno.consoleSize>;

//===

const isWinOS = Deno.build.os === 'windows';

const atImportAllowFFI =
	((await Deno.permissions?.query({ name: 'ffi' }))?.state ?? 'granted') === 'granted';

//=== utils

import { stringToCWSTR, ToUint32 } from './utils.ts';

export function byteSizeOfNativeType(type: Deno.NativeType) {
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

// consoleSizeViaFFI()
/** Get the size of the console as columns/rows, via the FFI.
 * * _unstable_ ~ requires the Deno `--unstable` flag for successful resolution (b/c the used `unstable.UnsafePointer` is unstable API, as of Deno v1.19.0 [2023-01-01; rivy])
 *
 * ```ts
 * const { columns, rows } = consoleSizeViaFFI();
 * ```
 *
 * @tags allow-ffi, unstable, winos-only
 */
export function consoleSizeViaFFI(): ConsoleSize | undefined {
	// ~ 1.5 ms
	if (!isWinOS) return undefined; // WinOS-only FFI implementation
	if (!atImportAllowFFI) return undefined;

	const ttyDevicePath = '//./CONOUT$';

	const unstable = (() => {
		const u = {
			dlopen: Deno.dlopen,
			UnsafePointer: Deno.UnsafePointer,
			// deno-lint-ignore no-explicit-any
			UnsafePointerValue: (Deno.UnsafePointer as any)?.value,
			UnsafePointerView: Deno.UnsafePointerView,
		};
		// console.warn({ u });
		if ((Object.values(u) as (unknown | undefined)[]).every((e) => e != null)) return u;
		return undefined;
	})();
	// console.warn({ unstable });
	if (unstable == null) return undefined;

	let size: ConsoleSize | undefined = undefined;

	const dllKernel = (() => {
		try {
			return unstable.dlopen('kernel32.dll', {
				GetConsoleScreenBufferInfo:
					/* https://learn.microsoft.com/en-us/windows/console/getconsolescreenbufferinfo */ {
						parameters: ['pointer', 'buffer'],
						result: 'u32', // BOOL
					},
				CreateFileW:
					/* https://learn.microsoft.com/en-us/windows/win32/api/fileapi/nf-fileapi-createfilew */ {
						parameters: ['pointer', 'u32', 'u32', 'pointer', 'u32', 'u32', 'pointer'],
						result: 'pointer' /* file handle */,
					},
				OpenFile /* https://learn.microsoft.com/en-us/windows/win32/api/winbase/nf-winbase-openfile */:
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
		unstable.UnsafePointer.of(
			stringToCWSTR(ttyDevicePath),
		) /* lpFileName (a NUL-terminated CWSTR) */,
		ToUint32(GENERIC_WRITE | GENERIC_READ) /* dwDesiredAccess */,
		ToUint32(FILE_SHARE_WRITE) /* dwShareMode */,
		null /* lpSecurityAttributes (optional) */,
		ToUint32(CF_OPEN_EXISTING) /* dwCreationDisposition */,
		0 /* dwFlagsAndAttributes */,
		null /* hTemplateFile (optional) */,
	) as Deno.PointerValue;
	// console.warn('done CreateFile');

	// NOTE: using `OpenFile()` is an alternative and functionally equivalent to using `CreateFile()` but increases fn execution time from ~ 1.5 ms to ~ 5.25 ms
	// // ref: <https://learn.microsoft.com/en-us/windows/win32/api/winbase/nf-winbase-openfile>
	// // ref: <https://learn.microsoft.com/en-us/windows/win32/api/winbase/ns-winbase-ofstruct>
	// // spell-checker:ignore () MAXPATHNAME OFS_MAXPATHNAME OFSTRUCT
	// const OF_READWRITE = 0x00000002;
	// const OFS_MAXPATHNAME = 128;
	// const OFSTRUCT_SIZE = 1 /* BYTE */ * 2 + 2 /* WORD */ * 3 + OFS_MAXPATHNAME;
	// const ofstruct_buffer = new Uint8Array(OFSTRUCT_SIZE);
	// // console.warn('start OpenFile');
	// const h = dllKernel?.symbols.OpenFile(
	// 	unstable.UnsafePointer.of(stringToCString('CONOUT$')), /* lpFileName (a NUL-terminated CSTR) */
	// 	unstable.UnsafePointer.of(ofstruct_buffer), /* lpReOpenBuff */
	// 	ToUint32(OF_READWRITE), /* uStyle */
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

	// ref: <https://learn.microsoft.com/en-us/windows/console/console-screen-buffer-info-str> @@ <https://archive.is/WYQxW>
	// ref: [MSDN ~ SHORT](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-dtyp/47b1e7d6-b5a1-48c3-986e-b5e5eb3f06d2) @@ <https://archive.is/fKKKq>)
	// ref: [MSDN ~ WORD](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-dtyp/f8573df3-a44a-4a50-b070-ac4c3aa78e3c) @@ <https://archive.is/Llj9A>)
	// CONSOLE_SCREEN_BUFFER_INFO == {
	// 	dwSize: { columns: SHORT, rows: SHORT },
	// 	dwCursorPosition: { column: SHORT, row: SHORT },
	// 	wAttributes: WORD,
	// 	srWindow: { Left: SHORT, Top: SHORT, Right: SHORT, Bottom: SHORT },
	// 	dwMaximumWindowSize: { columns: SHORT, rows: SHORT },
	// }
	const dwSize: Deno.NativeType[] = ['i16', 'i16'];
	const dwCursorPosition: Deno.NativeType[] = ['i16', 'i16'];
	const wAttributes: Deno.NativeType[] = ['u16'];
	const srWindow: Deno.NativeType[] = ['i16', 'i16', 'i16', 'i16'];
	const dwMaximumWindowSize: Deno.NativeType[] = ['i16', 'i16'];
	const CONSOLE_SCREEN_BUFFER_INFO: Deno.NativeType[] = [
		...dwSize,
		...dwCursorPosition,
		...wAttributes,
		...srWindow,
		...dwMaximumWindowSize,
	];
	const CONSOLE_SCREEN_BUFFER_INFO_size = CONSOLE_SCREEN_BUFFER_INFO.flat().reduce(
		(sum, type) => (sum += byteSizeOfNativeType(type)),
		0,
	);
	const infoBuffer = new Uint8Array(CONSOLE_SCREEN_BUFFER_INFO_size);
	// @ts-ignore # ignore early Deno version errors for unstable API (`UnsafePointer.value()` only exists in v1.31.0+)
	const handle: Deno.PointerValue | null =
		unstable.UnsafePointer.value(h) != INVALID_HANDLE ? h : null;
	// console.warn({ h, handle });
	const result =
		handle != null &&
		(dllKernel?.symbols.GetConsoleScreenBufferInfo(handle, infoBuffer) ?? FALSE) != FALSE;
	const ptr = result ? unstable.UnsafePointer.of(infoBuffer) : null;
	const ptrView = ptr != null ? new unstable.UnsafePointerView(ptr) : null;
	const info =
		ptrView != null
			? {
					/** Console screen buffer dimensions/size (measured in character cells) */
					dwSize: { columns: ptrView.getInt16(0), rows: ptrView.getInt16(2) },
					/** Cursor position within the console screen buffer */
					dwCursorPosition: { column: ptrView.getInt16(4), row: ptrView.getInt16(6) },
					/** Controls the appearance (foreground + background RGB color and intensities) of text written to the console screen buffer */
					wAttributes: ptrView.getUint16(8),
					/** Coordinates of the console window (aka, the visible portion of the console screen buffer) */
					srWindow: {
						Left: ptrView.getInt16(10),
						Top: ptrView.getInt16(12),
						Right: ptrView.getInt16(14),
						Bottom: ptrView.getInt16(16),
					},
					/** Maximum dimension/size of the console window (aka, maximum visible portion) based on character cell size and screen size */
					dwMaximumWindowSize: { columns: ptrView.getInt16(18), rows: ptrView.getInt16(20) },
				}
			: null;
	// console.warn('FFI', { buffer, info });
	if (info != null) {
		// JS/TS ~ Number can safely contain 53-bit integers (i53) or [-2^53 + 1, 2^53 - 1]
		// srWindow values are all i16 (16-bit signed integers); ref: <https://learn.microsoft.com/en-us/windows/console/console-screen-buffer-info-str> @@ <https://archive.is/WYQxW>
		// over/under-flow is not possible since `i16 +/- i16 + 1` => safely fits within i17
		const columns = info.srWindow.Right - info.srWindow.Left + 1;
		const rows = info.srWindow.Bottom - info.srWindow.Top + 1;
		size = { columns, rows };
	}

	return size;
}
