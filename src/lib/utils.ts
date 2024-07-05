// spell-checker:ignore (WinAPI) CSTR CWSTR DWORD LPCSTR LPCWSTR MBCS TCHAR WCHAR WideString WSTR

// ref:[JoelOnSoftware ~ Minimum knowledge of Unicode](https://www.joelonsoftware.com/2003/10/08/the-absolute-minimum-every-software-developer-absolutely-positively-must-know-about-unicode-and-character-sets-no-excuses) @@ <https://archive.is/2UVWT>
// ref:[The Tragedy of UCS-2](https://unascribed.com/b/2019-08-02-the-tragedy-of-ucs2.html) @@ <https://archive.is/x4SxI>
// ref:[SO ~ Which Unicode (with history)?](https://stackoverflow.com/questions/3473295/utf-8-or-utf-16-or-utf-32-or-ucs-2) @@ <>
// ref:[UTF-8 Everywhere](https://utf8everywhere.org) @@ <https://archive.is/7b6ga>
// ref:[Unicode in MS Windows](https://en.wikipedia.org/wiki/Unicode_in_Microsoft_Windows) @@ <https://archive.is/Mmf48>
// ref:[JavaScript character encoding](https://mathiasbynens.be/notes/javascript-encoding) @@ <https://archive.is/yNnof>
// ref:[MSDN ~ Unicode and MBCS support](https://learn.microsoft.com/en-us/cpp/atl-mfc-shared/unicode-and-multibyte-character-set-mbcs-support) @@ <https://archive.is/Iy2Js>
// ref:[MSDN ~ string conversions](https://learn.microsoft.com/en-US/sql/relational-databases/collations/collation-and-unicode-support#utf8) @@ <https://archive.is/hZvZx>
// ref:[MSDN ~ LPCSTR](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-dtyp/f8d4fe46-6be8-44c9-8823-615a21d17a61) @@ <https://archive.is/AduZv>)
// ref:[WTF-8 encoding](https://simonsapin.github.io/wtf-8) @@ <https://archive.is/irzit>
// ref:[MSDN ~ String type conversions](https://learn.microsoft.com/en-us/cpp/text/how-to-convert-between-various-string-types) @@ <https://archive.is/lKYhP>
// ref:[rust ~ 'widestring' lib](https://docs.rs/widestring/latest/widestring) @@ <https://archive.is/maIo3>

// CHAR == unsigned 8-bit integer (aka, u8)
// CString == CSTR == [CHAR] == `Uint8Array` == NUL-terminated unsigned 8-bit integer (aka, u8) array buffer
// WCHAR == wchar_t == unsigned 16-bit integer (aka, u16)
// WString == WSTR == [WCHAR] == `Uint16Array` == unsigned 16-bit integer (aka, u16) array buffer
// CWSTR == CWString == NUL-terminated WSTR

// stringToCSTR()
/** Convert `s` to a WinOS-compatible NUL-terminated CSTR buffer, *dropping* any internal NUL characters.
 *
 * NOTE: supports *only* ASCII characters, silently **dropping** non-ASCII-compatible code points without error/panic.
 */
export function stringToCSTR(s: string) {
	// CSTR == NUL-terminated string of 8-bit Windows (ANSI) characters; note: ANSI representation of non-ASCII characters is code-page dependent
	// [2023-01] note: JavaScript `TextEncoder()` now only supports 'utf-8' encoding
	// * alternatively, legacy support for code-page encoding is available via `npm:text-encoding` [code @ <https://github.com/inexorabletash/text-encoding>]
	const MAX_ASCII = 127;
	const NUL = 0;
	const length = s.length; // length in UTF-16 code units
	const buffer = new ArrayBuffer((length + 1) * Uint8Array.BYTES_PER_ELEMENT);
	const u8 = new Uint8Array(buffer);
	let bufferIndex = 0;
	for (let i = 0; i <= length; i++) {
		const charCode = s.charCodeAt(i);
		if (!isNaN(charCode) && charCode <= MAX_ASCII && charCode != NUL) {
			u8[bufferIndex++] = charCode;
		}
	}
	u8[bufferIndex] = 0;
	return u8;
}

// stringToCWSTR()
/** Convert `s` to WinOS-compatible NUL-terminated wide-character string buffer (using UTF-16 encoding), *dropping* any internal NUL characters.
 *
 * Note: assumes/requires WinOS support for UTF-16 (not just UCS-2); ie, requires WinOS >= v5.0/2000.
 */
export function stringToCWSTR(s: string) {
	// CWSTR = a string of 16-bit Unicode characters (aka, wide-characters/WCHAR/wchar_t), which MAY be null-terminated
	// note: WinOS *after* Windows NT uses UTF-16 encoding; WinOS versions *prior* Windows 2000 use UCS-2 (aka UTF-16 w/o surrogate support [ie, BMP-plane-only])
	const NUL = 0;
	const length = s.length; // length in UTF-16 code units
	const buffer = new ArrayBuffer((length + 1) * Uint16Array.BYTES_PER_ELEMENT);
	const u16 = new Uint16Array(buffer);
	let bufferIndex = 0;
	for (let i = 0; i <= length; i++) {
		{
			const charCode = s.charCodeAt(i);
			if (!isNaN(charCode) && charCode != NUL) {
				u16[bufferIndex++] = charCode;
			}
		}
	}
	u16[bufferIndex] = 0;
	return u16;
}

// ref: inspired by [Integers and shift operators in JavaScript](https://2ality.com/2012/02/js-integers.html) @@ <https://archive.is/KdYv7>
// ref: [Wikipedia ~ Two's complement](https://en.wikipedia.org/wiki/Two%27s_complement) @@ <https://archive.is/5ROjc>
// NOTE:
// ```js
// // Range of N Bit 2's Complement => [ -1*(2**(N-1)), (2**(N-1))-1 ]
// let i_SAFE = {max: Number.MAX_SAFE_INTEGER, min: Number.MIN_SAFE_INTEGER };
// let u32 = {max: (2**32)-1, min: 0};
// let i32 = {max: (2**31)-1, min: -1*(2**31) };
// let u64 = {max: (2n**64n)-1n, min: 0n};
// let i64 = {max: (2n**63n)-1n, min: -1n*(2n**63n) };
// console.log({i_SAFE, u32, i32, u64, i64})
// ```

const pow2To32 = Math.pow(2, 32);
/** Returns `a mod b`.
 *
 * @param a ~ a numeric expression
 * @param b ~ a numeric expression
 */
function modulo(a: number, b: number) {
	return a - Math.floor(a / b) * b;
}
/** Convert `x` to an integer by dropping the fractional portion.
 *
 * @param x ~ a numeric expression
 */
function ToInteger(x: number) {
	x = Number(x);
	return x < 0 ? Math.ceil(x) : Math.floor(x);
}
/** Convert `x` to an unsigned 32-bit integer, with modulo wrap-around.
 *
 * @param x ~ a numeric expression
 */
export function ToUint32(x: number) {
	return modulo(ToInteger(x), pow2To32);
}
