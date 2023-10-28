// spell-checker:ignore (fn) dlopen ; (names) Deno ; (types) isize usize wchar
// spell-checker:ignore (WinOS) CSTR CWSTR TCHAR WCHAR WSTR

// WinOS character/string definitions
// CHAR == unsigned 8-bit integer (aka, u8)
// CString == CSTR == [CHAR] == CString == NUL-terminated unsigned 8-bit integer (aka, u8) array buffer
// WCHAR (aka, TCHAR or wchar_t) == unsigned 16-bit integer (aka, u16)
// WString == WSTR == [WCHAR] == `Uint16Array` == unsigned 16-bit integer (aka, u16) array buffer
// CWSTR == CWString == NUL-terminated WSTR

export type CString = Uint8Array;
export type WString = Uint16Array;

//=== util

function WStringToString(arr?: WString) {
	if (arr == null) return undefined;
	let s = '';
	for (const value of arr.values()) {
		s = s + String.fromCharCode(value);
	}
	return s;
}

//===

const isWinOS = Deno.build.os === 'windows';

const unstable = (() => {
	const u = {
		dlopen: Deno.dlopen, // unstable API (as of v1.12+)
		UnsafePointer: Deno.UnsafePointer,
		UnsafePointerView: Deno.UnsafePointerView,
	};
	if ((Object.values(u) as (unknown | undefined)[]).every((e) => e != null)) return u;
	return undefined;
})();

const _fns: /* Record<string, Deno.ForeignFunction> */ Deno.ForeignLibraryInterface = {
	'GetCommandLineA': { parameters: [], result: 'pointer' },
	'GetCommandLineW': { parameters: [], result: 'pointer' },
};
const dll = isWinOS
	? unstable?.dlopen(
		'kernel32.dll',
		/* fns */
		{
			'GetCommandLineA': { parameters: [], result: 'pointer' },
			'GetCommandLineW': { parameters: [], result: 'pointer' },
		},
	)
	: undefined;

//===

export function GetCommandLineA() {
	if (!unstable) return undefined;
	// @ts-ignore # Deno.PointerValue is unstable, available in Deno v1.24.2+
	const ptr = dll?.symbols.GetCommandLineA() as Deno.PointerValue;
	const ptrView = ptr && new unstable.UnsafePointerView(ptr);
	return ptrView?.getCString();
}

function GetCommandLineW(): WString | undefined {
	if (!unstable) return undefined;
	// @ts-ignore # Deno.PointerValue is unstable, available in Deno v1.24.2+
	const ptr = dll?.symbols.GetCommandLineW() as Deno.PointerValue;
	const ptrView = ptr && new unstable.UnsafePointerView(ptr);
	if (ptrView == null) return undefined;
	const Uint16Size = 2;
	let offset = 0;
	let value = ptrView.getUint16(offset);
	while (value != null && value !== 0) {
		// console.debug({ idx, value, c: String.fromCharCode(value) });
		offset = offset + Uint16Size;
		value = ptrView.getUint16(offset);
	}
	const s = new Uint16Array(offset / Uint16Size);
	ptrView.copyInto(s);
	return s;
}

export function GetCommandLine() {
	if (!isWinOS) return undefined; // implemented only for WinOS
	return WStringToString(GetCommandLineW());
}

// console.debug('Deno:', { args: Deno.args, main: Deno.mainModule, exec: Deno.execPath() });
// console.debug(`GetCommandLine() => '${GetCommandLine()}'`);
// console.debug(`GetCommandLineA() => '${GetCommandLineA()}'`);
// console.debug(
// 	`GetCommandLineW() =>`,
// 	GetCommandLineW(),
// 	`=> '${WStringToString(GetCommandLineW())}'`,
// );
